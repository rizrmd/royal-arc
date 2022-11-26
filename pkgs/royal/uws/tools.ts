import { HttpRequest } from 'uWebSockets.js'
import { g } from '../global'

export type IUpstream = {
  method: string
  headers: any
}

export const localHostName = '127.0.0.1'

export const pathMatcher = (urls: Record<string, any>, targetUrl: string) => {
  const matches = Object.entries(urls)
    .map(([serviceName, url]) => {
      if (targetUrl.startsWith(url.pathname)) {
        return serviceName
      }
      return ''
    })
    .filter((e) => !!e)
  return matches
}

export const generateUpstream = (req: HttpRequest) => {
  const upstream = {
    method: req.getMethod(),
    headers: {} as any,
  }
  req.forEach((key, value) => {
    upstream.headers[key] = value
  })
  return upstream
}
export const replaceBodyDev = (
  body: string,
  baseurl: string,
  serverurl: string
) => {
  return body.replace(
    `</body>`,
    `\
<script>
  window.serverurl = "${serverurl}";
  window.baseurl = "${baseurl}";
  window.webPanelDev = window.baseurl;

  const pathname = new URL(window.baseurl).pathname;

  if (location.pathname.length < pathname.length) {
    location.href = pathname;
  }

</script>    
</body>`
  )
}

export const plog = (...args: any[]) => {
  console.log(...args)
} 

export const wlog = (...args: any[]) => {
  g.panelStdOut += args.join(' ')
  process.stdout.write(args.join(' '))

  if (g.panelWS) {
    try {
      for (const ws of g.panelWS) {
        ws.send(
          JSON.stringify({
            type: 'term',
            name: g.serverName,
            text: args.join(' '),
          })
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}
