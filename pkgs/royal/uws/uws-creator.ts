import camelCase from 'lodash.camelcase'
import padEnd from 'lodash.padend'
import trim from 'lodash.trim'
import { join } from 'path'
import picocolors from 'picocolors'
import { HttpRequest, HttpResponse, TemplatedApp } from 'uWebSockets.js'
import { SrvHttpResponse } from '../export'
import { g } from '../global'
import { decorateReqRes } from '../srv/decorate'
import { fillCache } from './cache'
import {
  findServer as findSrv,
  serveServer,
  serveServerWS,
} from './serve-server'
import { serveSSR } from './serve-ssr'
import { findWeb, serveVite, serveViteWS } from './serve-vite'
import { generateUpstream, IUpstream, pathMatcher, plog } from './tools'

const dec = new TextDecoder()

export const createUWS = async (
  listen: URL,
  urls: Record<string, URL>,
  index: number
) => {
  const { App, getParts } = await import('uWebSockets.js')
  g.getParts = getParts
  const app = App({})

  const fileCache: Record<string, SrvHttpResponse['fileCache']> = {}

  if (g.mode !== 'dev') {
    for (const k of Object.keys(urls)) {
      if (k.startsWith('web')) {
        fileCache[k] = await fillCache(join(process.cwd(), 'client', k))
      }
    }
  }

  app
    .ws('/*', {
      idleTimeout: 0,
      sendPingsAutomatically: true,
      upgrade: upgradeWS,
      async open(_ws) {
        const matches = pathMatcher(urls, _ws.url || '/')

        const server = findSrv(matches)
        if (server) {
          serveServerWS(_ws)
          return
        }

        const web = findWeb(matches)
        if (web) {
          if (g.mode === 'dev') {
            serveViteWS(web, _ws, listen.port)
          }
        }
      },
      close(ws, code, message) {
        if (g.panelWS) {
          const idx = g.panelWS.findIndex((_ws) => _ws === ws)
          if (idx >= 0) {
            g.panelWS.splice(idx, 1)
          }
        }
      },
      message(_ws, message, isBinary) {
        if (g.serverWS.has(_ws)) {
          const ws = g.serverWS.get(_ws)
          if (ws && ws.connected) {
            if (!isBinary) {
              ws.send(dec.decode(message))
            } else {
              ws.send(message)
            }
          }
        }
      },
    })
    .any('/*', async (_res, _req) => {
      _res.onAborted(() => {
        _res.aborted = true
      })
      const { req, res } = await decorateReqRes(_req as any, _res as any)

      let pathname = req.url
      const q = req.queryString
      if (q) {
        pathname = pathname + '?' + q
      }

      const upstream = generateUpstream(req)
      const matches = pathMatcher(urls, req.url)

      if (pathname.endsWith('/_api_frm')) {
        if (!res.aborted) allowFrameCors(res, upstream)
        return
      }

      const server = findSrv(matches)
      if (server) {
        if (await serveServer(upstream, pathname, res, server)) {
          return
        } else {
          if (matches.length === 1) {
            if (!res.aborted) {
              res.writeStatus('502 Gateway Timeout')
              res.write(`Failed to get port for: ${server} `)
              res.end()
            }
            return
          }
        }
      }

      const web = findWeb(matches)
      if (web) {
        res.fileCache = fileCache[web]
        res.webName = web
        if (g.mode === 'dev') {
          if (
            await serveVite(web, upstream, pathname, res, async (r) => {
              await serveSSR({ webName: web, ovr: r, req, res, g })
            })
          ) {
            return
          }
        } else {
          let cache = fileCache[web][req.url];
          if (!cache) {
            cache = fileCache[web][""];
          }

          if (cache) {
            await serveSSR({
              webName: web,
              g,
              ovr: {
                body: cache.src,
                url: req.url,
                headers: { 'content-type': cache.mime },
                status: 200,
              },
              req,
              res,
            })

            if (!res.sentBody && !res.sentHeader) {
              res.sendHeader('content-type', cache.mime)
              res.send(cache.src)
            }
          }

          if (!res.aborted && !res.ended) {
            res.end()
          }

          return
        }
      }

      if (!res.aborted) {
        res.write('All System Operational')
        res.end()
      }
    })

  return new Promise<TemplatedApp>((resolve) => {
    app.listen('0.0.0.0', parseInt(listen.port), (socket) => {
      const urlent = Object.entries(urls)
      let i = 0
      for (const [name, url] of urlent) {
        let char = i < urlent.length - 1 ? `├─` : `└─`

        if (urlent.length > 1 && i === 0) {
          char = `┌─`
        }

        if (urlent.length === 1 && index > 0) {
          char = `∙─`
        }

        plog(
          ` ${picocolors.cyan(char)} ${padEnd(
            capitalize(camelCase(name).replace(/([A-Z])/g, ' $1')),
            18,
            '.'
          )}: ${url.toString()}`
        )
        i++
      }
      resolve(app)
    })
  })
}

const upgradeWS = (res: HttpResponse, req: HttpRequest, context: any) => {
  try {
    res.upgrade(
      {
        url: req.getUrl(),
      },
      req.getHeader('sec-websocket-key'),
      req.getHeader('sec-websocket-protocol'),
      req.getHeader('sec-websocket-extensions'),
      context
    )
  } catch (e: any) {
    plog('Failed to upgrade ws: ', e.message)
  }
}

const allowFrameCors = (res: SrvHttpResponse, upstream: IUpstream) => {
  if (res.aborted) return
  // TODO: whitelist origin
  const allowUrl = upstream.headers.origin || upstream.headers.referer

  res.writeHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
  res.writeHeader('Access-Control-Allow-Headers', 'content-type rid')
  res.writeHeader('Access-Control-Allow-Credentials', 'true')
  if (allowUrl) {
    res.writeHeader('Access-Control-Allow-Origin', allowUrl)
  }

  res.write(`\
<script>
  window.addEventListener('message', async (e) => {
    const msg = e.data;
    const res = await fetch(msg.input, msg.init)
    parent.postMessage({result: await res.json(), id: msg.id }, '*')
  })
  parent.postMessage('initialized', '*')
</script>`)
  res.end()
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1)
}
