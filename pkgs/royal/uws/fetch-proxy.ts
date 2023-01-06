import fetch from 'node-fetch-commonjs'
import { Readable } from 'stream'
import { SrvHttpResponse } from '../export'
import { plog } from './tools'
type IUpstream = { method: string; headers: any }

const dec = new TextDecoder('utf-8')
export const fetchProxy = async (
  url: string,
  upstream: IUpstream,
  res: SrvHttpResponse,
  opt?: {
    onRequest?: (
      r: Awaited<ReturnType<typeof sendRequest>>
    ) => boolean | Promise<boolean>
    override?: (
      ovr: Awaited<ReturnType<typeof sendRequest>>,
      res: SrvHttpResponse
    ) => Promise<void>
  }
) => {
  try {
    const r = await sendRequest(url, upstream, res)
    if (r) {
      if (opt && opt.onRequest) {
        if (!(await opt.onRequest(r))) {
          return false
        }
      }

      if (!res.aborted) {
        if (opt && opt.override) {
          await opt.override(r, res)

          if (res.sentHeader || res.sentBody) {
            return true
          }
        }

        res.cork(async () => {
          res.sendStatus(r.status)

          if (r.body) {
            if (!res.sentHeader) {
              for (const [k, v] of Object.entries(r.headers)) {
                res.writeHeader(k, v)
              }
            }
            if (!res.sentBody) {
              res.write(r.body)
            }
          } else {
            for (const [k, v] of Object.entries(r.headers)) {
              res.writeHeader(k, v)
            }
          }
          res.end()
        })
        return true
      }
    }
  } catch (e) {
    plog(e)
  }
  return false
}

export const sendRequest = async (
  url: string,
  upstream: IUpstream,
  res: SrvHttpResponse
): Promise<
  | undefined
  | {
      url: string
      body: ArrayBuffer | string
      headers: Record<string, string>
      status: number
    }
> => {
  try {
    delete upstream.headers.connection // forbidden header in undici
    delete upstream.headers['content-length'] // prevent length mismatch

    const _url = new URL(url)
    if (upstream.headers.referer) {
      upstream.headers.referer = upstream.headers.referer.replace(
        upstream.headers.host,
        _url.host
      )
    }
    let stream: Readable | undefined
    const hasBody = upstream.headers['content-type']
    if (!res.aborted) {
      stream = new Readable()
      stream._read = () => {}
      res.onData((chunk, isLast) => {
        if (stream) {
          stream.push(Buffer.concat([Buffer.from(chunk)]))

          if (isLast) {
            stream.push(null)
          }
        }
      })
    }

    upstream.headers.host = _url.host

    const r = await fetch(_url.toString(), {
      method: upstream.method.toUpperCase() as any,
      headers: upstream.headers,
      body: hasBody && stream ? stream : undefined,
    })

    const body = await (await r.blob()).arrayBuffer()
    const headers: Record<string, string> = {}

    r.headers.forEach((v, k) => {
      if (k === 'content-length') return
      headers[k] = Array.isArray(v) ? v.join(' ') : v + ''
    })
    return { url: _url.toString(), body, headers, status: r.status }
  } catch (e: any) {
    if (e.code !== 'ECONNREFUSED') {
      plog(`Failed to request ${url} \n  ➥  ${e}`)
    }
  }
}
