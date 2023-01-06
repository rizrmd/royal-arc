import { _names } from 'gen'
import { ApiMetaParams } from 'service'
import { route } from '../route'

export const routeAPI = async (serviceName: _names) => {
  try {
    //@ts-ignore
    const apiImports = await import('../../../../gen/api')
    //@ts-ignore
    const _apiMeta = (await import('../../../../gen/api.meta.json')).default

    const apiMeta = _apiMeta[serviceName] as {
      _url: Record<string, string>
      _params: ApiMetaParams
    }
    const api = apiImports[serviceName]

    for (let [apiName, url] of Object.entries(apiMeta._url || {})) {
      if (!api[apiName]) {
        continue
      }

      route(url, async (req, res) => {
        try {
          const im = api[apiName].api.bind({
            req,
            res,
          })
          const params: any = {}

          // parse from query string (?name=...)
          if (req.query) {
            for (const [k, v] of Object.entries(req.query)) {
              if (v) params[k] = v
            }
          }

          // parse from parameterized url (/:name/)
          if (req.params) {
            for (const [k, v] of Object.entries(req.params)) {
              if (v) params[k] = v
            }
          }

          // parse from POST-ed body ({name: "..."})
          if (
            req.body &&
            typeof req.body === 'object' &&
            !Array.isArray(req.body)
          ) {
            for (const [k, v] of Object.entries(req.body)) {
              if (v) params[k] = v
            }
          }

          if (typeof params === 'object') {
            if (Array.isArray(params)) {
              const apires = await (im as any)(...params)
              res.sendStatus(200)
              res.send(apires)
            } else {
              const prm = apiMeta._params[apiName]

              if (prm) {
                const passedParams: any[] = Array.isArray(req.body)
                  ? [...req.body]
                  : []

                for (const [k, paramName] of Object.entries(prm.api)) {
                  if (params[paramName]) passedParams[k] = params[paramName]
                }

                let apires: any
                let reason = ''
                try {
                  apires = await (im as any)(...passedParams)
                } catch (e: any) {
                  reason = e.message
                }

                const sent = res.sentBody
                if (!sent) {
                  if (apires !== undefined) {
                    res.sendStatus(200)
                    res.send(apires)
                  } else {
                    res.sendStatus(500)
                    res.send({ status: 'failed', reason })
                  }
                }
              }
            }
          }
        } catch (e: any) {
          console.log(`Failed to call API ${url}:`, e)

          if (!res.headersSent) {
            res.sendStatus(500)
            res.send({ status: 'failed', reason: e.message })
          }
        }
      })
    }
  } catch (e) {
    if (e.message.includes('Cannot find module')) {
    } else {
      throw e
    }
  }
}
