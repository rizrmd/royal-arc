import { join } from 'path'
import { createRouter } from 'radix3'
import { readAsync } from 'service'
import { g } from '../global'

export const loadSSR = async () => {
  const rootcwd = join(process.cwd(), '..', '..')

  if (!g.ssr) g.ssr = { route: {}, pages: {}, layouts: {} }
  try {
    let im = { page: null as any, layout: null as any }

    if (g.mode === 'dev') {
      im.page = await evalImport(
        join(rootcwd, 'gen', 'web.page.ssr.compiled.js')
      )
      im.layout = await evalImport(
        join(rootcwd, 'gen', 'web.layout.ssr.compiled.js')
      )
    } else {
      //@ts-ignore
      im.page = (await import('gen/web.page.ssr.compiled.js')).default.default
      im.layout = //@ts-ignore
      (await import('gen/web.layout.ssr.compiled.js')).default.default
    }

    if (im.page && im.layout) {
      for (const k of ['web']) {
        if (k.startsWith('web') && im.page[k] && im.layout[k]) {
          g.ssr.pages[k] = im.page[k]
          g.ssr.layouts[k] = im.layout[k]
          g.ssr.route[k] = createRouter({
            strictTrailingSlash: true,
          })
          for (const r of Object.values(im.page[k])) {
            const [url, layout, im] = r as any

            let _url = url.replace(/\*\*/gi, '*')
            _url = url.replace(/\*/gi, '**')

            const page = (await im()).default
            g.ssr.route[k].insert(_url.trim(), page as any)
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const evalImport = async (path: string) => {
  const module: any = {}
  try {
    eval(await readAsync(path))
  } catch (e) {
    console.log(`Error while reloading ssr: ${path}`)
    console.log(e)
  }
  if (module.exports) {
    return module.exports.default
  }
  return {}
}
