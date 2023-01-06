import { css } from '@emotion/react'
import React, { Fragment } from 'react'
import { createFrameCors } from './iframe-cors'
import { importPageAndLayout } from './router'
//@ts-ignore
import layout from 'gen/web.layout'

//@ts-ignore
import page from 'gen/web.page'

const w = (typeof isSSR === 'undefined'
  ? window
  : global.window) as unknown as {
  importedLayouts: any
  importedPages: any
  Capacitor: any

  apiHeaders: any
  serverurl: typeof serverurl
  baseurl: typeof baseurl
  basepath: typeof basepath
  pathname: typeof pathname
  webname: string
  css: typeof css
  mode: typeof mode
  Fragment: typeof Fragment
  React: typeof React
  params: typeof params
  isMobile: typeof isMobile
  mobile: typeof mobile
  api: any
  navigate: typeof navigate
  appRoot: typeof appRoot
  preventPopRender: boolean
  frmapi: Record<string, ReturnType<typeof createFrameCors>>

  db: any
  isSSR: boolean
}

export const initEnv = async (webName: string) => {
  w.importedLayouts = (layout as any)[webName]
  w.importedPages = (page as any)[webName]
  w.apiHeaders = {}
  w.webname = webName
  w.isSSR = false

  if (!w.serverurl) {
    w.serverurl = location.href
  }

  if (!w.baseurl) {
    w.baseurl = location.href
  }

  if (!w.basepath) {
    const url = new URL(w.baseurl)
    w.basepath = url.pathname

    if (w.basepath.endsWith('/')) {
      w.basepath = w.basepath.substring(0, w.basepath.length - 1)
    }
  }

  w.pathname = location.pathname.substring(w.basepath.length)

  await importPageAndLayout(w.webname)

  if (!w.css) {
    if (!w.mode) w.mode = 'dev'
    w.css = css
    w.Fragment = Fragment
    w.React = React
    w.params = {}

    if (w.Capacitor) {
      w.isMobile = true
      w.mobile = {
        ready: false,
        insets: null,
      }
      if (w.Capacitor.Plugins) {
        const app = w.Capacitor.Plugins.App
        if (app) {
          app.addListener('backButton', () => {
            history.back()
          })
        }
      }
    }

    let apimeta
    try {
      //@ts-ignore
      apimeta = await import('gen/api.meta.json')
    } catch (e) {}

    //@ts-ignore
    if (apimeta && apimeta['srv']) {
      //@ts-ignore
      const { _params, _url } = apimeta['srv']
      w.api = new Proxy(
        {},
        {
          get: (_, actionName) => {
            return (...rest: any) => {
              return new Promise<any>(async (resolve) => {
                const action = (_url as any)[actionName]
                const params = (_params as any)[actionName]
                if (action && params) {
                  let actionurl = action

                  if (rest.length > 0 && params.api.length > 0) {
                    for (const [idx, p] of Object.entries(rest)) {
                      const paramName = params.api[idx]
                      if (params.shared && params.shared.includes(paramName)) {
                        if (
                          !!p &&
                          typeof p !== 'string' &&
                          typeof p !== 'number'
                        ) {
                          throw new Error(
                            `\n\nAPI Parameter [${paramName}] should be string or number.\nIt is passed in url: ${action}.\n\nCurrent value: \n${JSON.stringify(
                              p
                            )}\n`
                          )
                        }
                      }
                      actionurl = actionurl.replace(`:${paramName}?`, p + '')
                      actionurl = actionurl.replace(`:${paramName}`, p + '')
                    }
                  }

                  const url = `${w.basepath}${actionurl}`
                  const result = await fetchSendApi(url, rest)
                  resolve(result)
                } else {
                  console.error(`API Not Found: ${actionName.toString()}`)
                }
              })
            }
          },
        }
      )
    }

    w.navigate = (href: string) => {
      let _href = href

      if (_href.startsWith('/')) {
        if (w.basepath.length > 1) {
          _href = `${w.basepath}${_href}`
        }
      }

      if (!w.appRoot.mounted) {
        window.location.href = _href
        return
      }
      history.pushState({}, '', _href)
      w.pathname = location.pathname.substring(w.basepath.length)
      w.appRoot.render()
    }
    window.addEventListener('popstate', () => {
      if (w.preventPopRender) {
        w.preventPopRender = false
        return
      }
      w.appRoot.render()
    })

    let prisma

    try {
      // @ts-ignore
      prisma = await import('gen/prisma')
    } catch (e) {}

    if (prisma) {
      for (let name of Object.keys(prisma)) {
        if (name.startsWith('db.')) {
          ;(w as any)[name.substring(3)] = dbClient(name)
        } else {
          ;(w as any)[name] = dbClient(name)
        }
      }
    }
  }
}

const dbClient = (name: string) => {
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table.startsWith('$')) {
          return (...params: any[]) => {
            return fetchSendDb(name, {
              db: name,
              action: 'query',
              table,
              params,
            })
          }
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return (...params: any[]) => {
                if (table === 'query') {
                  table = action
                  action = 'query'
                }
                return fetchSendDb(name, {
                  db: name,
                  action,
                  table,
                  params,
                })
              }
            },
          }
        )
      },
    }
  )
}

export const fetchSendApi = async (_url: string, params: any) => {
  let url = _url
  let frm: ReturnType<typeof createFrameCors>
  if (!w.frmapi) {
    w.frmapi = {}
    w.frmapi[w.serverurl] = createFrameCors(w.serverurl)
  }
  frm = w.frmapi[w.serverurl]

  if (url.startsWith('http')) {
    const purl = new URL(url)
    if (!w.frmapi[purl.host]) {
      w.frmapi[purl.host] = createFrameCors(`${purl.protocol}//${purl.host}`)
    }

    frm = w.frmapi[purl.host]
    url = url.substring(`${purl.protocol}//${purl.host}`.length)
  }

  return await frm.send(url, params, w.apiHeaders)
}

export const fetchSendDb = async (name: string, params: any) => {
  const w = window as any
  let url = `/_dbs/${name}`
  let frm: ReturnType<typeof createFrameCors>

  if (params.table) {
    url += `/${params.table}`
  }
  if (!w.frmapi) {
    w.frmapi = {}
    w.frmapi[w.serverurl] = createFrameCors(w.serverurl)
  }
  frm = w.frmapi[w.serverurl]

  return await frm.send(url, params, w.apiHeaders)
}

if (w) {
  //---generated---//
  w.db = dbClient('db')
}
