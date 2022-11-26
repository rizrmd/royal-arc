import { IAppRoot } from 'index'
import { createRouter } from 'radix3'
import { FC, lazy } from 'react'

const w = window as typeof window & {
  importedPages: any
  importedLayouts: any
  lazyPages: any
  lazyLayout: any
}

export const importPageAndLayout = async (name: string) => {
  w.lazyPages = {}
  Object.entries(w.importedPages).map(([name, imp]: any) => {
    w.lazyPages[name] = lazy(async () => {
      const component = (await imp[2]()).default.component
      // this is commented because component is blinking after first load
      // w.lazyPages[name] = component
      return {
        default: component,
      }
    })
  })

  w.lazyLayout = {}
  Object.entries(w.importedLayouts).map(([name, imp]) => {
    w.lazyLayout[name] = lazy(async () => {
      // @ts-ignore
      const component = (await imp()).default
      // this is commented because component is blinking after first load
      // w.lazyLayout[name] = component
      return {
        default: component,
      }
    })
  })
}

export type IFoundPage = {
  layout: string
  page: string
  Page: FC
  Layout: FC
  params: any
}

if (w.appRoot) {
  w.appRoot.router = undefined
  if (w.appRoot.render) w.appRoot.render()
}

// this will be run on each app render, so it cannot be an aysnc func
export const loadPageAndLayout = (local: IAppRoot & { render: () => void }) => {
  local.page.list = w.importedPages
  local.layout.list = w.importedLayouts

  if (!local.initialized) {
    local.router = createRouter({ strictTrailingSlash: true })
    initializeRoute(local)
  }

  if (local.router) {
    let found = local.router.lookup(local.url) as IFoundPage | null | undefined

    if (!found) {
      if (local.url.endsWith('/')) {
        found = local.router.lookup(
          local.url.substring(local.url.length - 1)
        ) as IFoundPage | null | undefined
      } else {
        found = local.router.lookup(local.url + '/') as
          | IFoundPage
          | null
          | undefined
      }
    }

    if (found) {
      w.params = found.params || {}
      local.page.name = found.page
      if (local.layout.name !== found.layout) {
        local.layout.name = found.layout
      }

      local.page.current = found.Page
      local.layout.current = found.Layout
    }
    return found
  }
}

const initializeRoute = (local: IAppRoot) => {
  if (local.router) {
    for (let [pageName, page] of Object.entries(local.page.list)) {
      const [url, layoutName, pageDef] = page as unknown as [
        string,
        string,
        () => Promise<{
          default: {
            url: string
            layout: string
            component: () => {
              default: React.ComponentType<any>
            }
          }
        }>
      ]

      local.router.insert(
        convertUrl(w.basepath === '/' ? '' : w.basepath + url),
        {
          layout: layoutName,
          page: pageName,
          Page: w.lazyPages[pageName],
          Layout: w.lazyLayout[layoutName],
        }
      )
    }
  }
}

const convertUrl = (url: string) => {
  let newUrl = url.replace(/\:(.+)\?/gi, ':$1')
  return newUrl
}
