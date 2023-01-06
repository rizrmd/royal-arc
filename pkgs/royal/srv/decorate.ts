import { createReadStream, ReadStream } from 'fs'
import { stat } from 'fs/promises'
import mime from 'mime-types'
import { isValidElement, ReactElement } from 'react'
import { SrvHttpRequest, SrvHttpResponse, statusCode } from './global-ex'
import * as rdom from 'react-dom/server'
import { g } from '../global'
import trim from 'lodash.trim'
import { replaceBodyDev } from '../uws/tools'
import fetch from 'node-fetch-commonjs'

if (!g.isSSR) g.isSSR = true
const dec = new TextDecoder()

export const decorateReqRes = async (
  req: SrvHttpRequest,
  res: SrvHttpResponse
) => {
  if (res && res.aborted) return

  res.sendHeader = (key: string, value: string) => {
    if (!res.aborted) {
      res.writeHeader(key, value)
      res.sentHeader = true
    }
  }
  res.setHeader = res.sendHeader
  res.redirect = (url, code) => {
    res.sendStatus(code || 301)
    res.sendHeader('location', url)
  }

  res.sendSSR = async ({ body, headers, prefix }) => {
    if (g.mode === 'dev') {
      const host = trim(g.vite[res.webName].host, '/')
      const conf = g.config[g.serverName][g.mode]
      const url = new URL(host)
      url.pathname = prefix

      try {
        const fres = await fetch(url.toString())
        await res.sendFetch(fres, {
          body: (resbody) => {
            try {
              let _body: any
              if (fres.headers.get('content-type') === 'text/html') {
                _body =
                  typeof resbody === 'string' ? resbody : dec.decode(resbody)
                _body = replaceBodyDev(
                  _body,
                  conf[res.webName].url,
                  conf.srv.url
                )
              }

              return body(_body)
            } catch (e) {
              console.log(e)
              return
            }
          },
          headers,
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      let found = res.fileCache[prefix]
      if (!found) {
        found = res.fileCache[`/${prefix}`]
      }
      if (found) {
        if (headers) {
          const reshead = await headers({ 'content-type': found.mime })

          if (reshead) {
            for (const [k, v] of Object.entries(reshead)) {
              res.sendHeader(k, v)
            }
          } else {
            res.sendHeader('content-type', found.mime)
          }
        } else {
          res.sendHeader('content-type', found.mime)
        }

        if (body) {
          const resbody = await body(found.src)

          try {
            if (resbody) {
              res.send(resbody)
              return
            }
          } catch (e) {
            console.log(e)
            return
          }
        }

        res.send(found.src)
      }
    }
  }

  res.sendFetch = async (fetchResult, { headers, body }) => {
    return new Promise((resolve) => {
      res.cork(async () => {
        res.sendStatus(fetchResult.status)
        res.sentHeader = true
        res.sentBody = true

        const _heads: Record<string, string> = {}
        fetchResult.headers.forEach((v, k) => {
          if (k === 'content-length') return
          _heads[k] = v
        })

        if (headers) {
          const reshead = await headers(_heads)

          if (reshead) {
            for (const [k, v] of Object.entries(reshead)) {
              res.sendHeader(k, v)
            }
          } else {
            for (const [k, v] of Object.entries(_heads)) {
              res.sendHeader(k, v)
            }
          }
        } else {
          for (const [k, v] of Object.entries(_heads)) {
            res.sendHeader(k, v)
          }
        }

        if (body) {
          const src = await (await fetchResult.blob()).arrayBuffer()
          const resbody = await body(src)

          if (!res.aborted) {
            if (resbody) {
              res.write(resbody)
            } else {
              res.write(src)
            }
          }
        } else {
          const buf = await (await fetchResult.blob()).arrayBuffer()
          if (!res.aborted) res.write(buf)
        }
        if (!res.aborted) res.end()
        resolve()
      })
    })
  }

  res.sendStream = (
    stream: ReadStream,
    totalSize?: number,
    onData?: (chunk: string | Buffer) => void
  ) => {
    return new Promise<void>((resolve, reject) => {
      stream
        .on('data', (chunk) => {
          res.sentBody = true
          if (res.aborted) {
            resolve()
            return
          }
          const ab = toArrayBuffer(chunk as Buffer)
          if (onData) {
            onData(chunk)
          }

          res.sendStreamLastOffset = res.getWriteOffset()
          let [ok, done] = res.tryEnd(ab, totalSize)
          if (done) {
            res.ended = true
            resolve()
          } else if (!ok) {
            stream.pause()
            res.ab = ab
            res.abOffset = res.sendStreamLastOffset
            res.onWritable((offset) => {
              let [ok, done] = res.tryEnd(
                res.ab.slice(offset - res.abOffset),
                totalSize
              )
              if (done) {
                resolve()
              } else if (ok) {
                stream.resume()
              }
              return ok
            })
          }
        })
        .on('error', (e) => {
          reject(e)
        })
    })
  }

  res.sendFile = async (path: string) => {
    const totalSize = (await stat(path)).size
    const readStream = createReadStream(path)

    await res.sendStream(readStream, totalSize)
    res.sentBody = true
  }

  res.sendStatus = (code: number) => {
    if (!res.aborted) {
      const text = statusCode[code] || `Unknown`
      res.writeStatus(`${code} ${text}`)
      res.sentStatus = code
    }
  }

  res.send = (data) => {
    if (!res.aborted) {
      if (typeof data === 'string') {
        res.write(data)
        res.sentBody = data
      } else if (typeof data === 'number') {
        res.write(data + '')
        res.sentBody = data
      } else if (typeof data === 'object' || !data) {
        if (data instanceof Buffer) {
          res.write(data)
          res.sentBody = data
        } else if (isValidElement(data)) {
          try {
            const jsx = rdom.renderToString(data)
            res.write(jsx)
            res.sentBody = jsx
          } catch (e) {
            console.log(e)
          }
        } else {
          res.sentBody = JSON.stringify(data)
          res.writeHeader('content-type', 'application/json')
          res.write(res.sentBody)
        }
      }
    } else {
      console.log('Response aborted, failed to send')
    }
  }

  req.headers = {}
  req.forEach((k, v) => {
    req.headers[k] = v
  })

  res.fileCache = {}
  req.url = req.getUrl()
  req.queryString = req.getQuery()
  return { req, res }
}

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  )
}
