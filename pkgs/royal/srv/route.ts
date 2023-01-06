import { createRouter } from 'radix3'

import { getParts } from 'uWebSockets.js'
import { decorateReqRes } from './decorate'
import { ex, SrvHttpRequest, SrvHttpResponse } from './global-ex'

type URLArg = string
type RouteHandler = (req: SrvHttpRequest, res: SrvHttpResponse) => Promise<void>

const router = createRouter<{
  handler: RouteHandler
}>({
  strictTrailingSlash: true,
})

export const route = (url: URLArg, handler: RouteHandler) => {
  let _url = url.replace(/\*\*/gi, '*')
  _url = url.replace(/\*/gi, '**')

  router.insert(_url, { handler })
}

export const attachRouter = () => {
  const app = ex.app
  app.any('/*', async (res: SrvHttpResponse, req: SrvHttpRequest) => {
    res.onAborted(() => {
      res.aborted = true
    })

    await decorateReqRes(req, res)

    let found = router.lookup(req.url)
    if (!found || (found && !found.handler)) {
      found = router.lookup(req.url + '/')
    }

    if (found && found.handler) {
      req.params = found.params
      await parseBody(req, res)
      await found.handler(req as any, res as any)
    }

    if (!res.aborted && !res.ended) {
      res.end()
    }
  })
}

function parseBody(req: SrvHttpRequest, res: SrvHttpResponse) {
  return new Promise<void>((resolve) => {
    if (req.getMethod() === 'post') {
      let buffer: Buffer
      res.onData((ab, isLast) => {
        let chunk = Buffer.from(ab)
        if (isLast) {
          const content = buffer ? Buffer.concat([buffer, chunk]) : chunk
          const type = req.headers['content-type']
          if (type) {
            if (type.includes('json')) {
              try {
                req.body = JSON.parse(content.toString('utf-8'))
              } catch (e) {
                console.log(e)
              }
            } else if (type.includes('multipart/form-data')) {
              req.body = getParts(content, type)
            } else {
              req.body = content
            }
          } else {
            req.body = content
          }
          resolve()
        } else {
          if (buffer) {
            buffer = Buffer.concat([buffer, chunk])
          } else {
            buffer = Buffer.concat([chunk])
          }
        }
      })
      return
    }
    resolve()
  })
}
