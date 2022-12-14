import { build } from 'esbuild'
import { basename, join } from 'path'
import { format } from 'prettier'
import { listAsync, readAsync, writeAsync } from 'service'
import { g } from '../global'
import { loadSSR } from '../uws/load-ssr'
import { walkDir } from '../web/utils'
import { loader } from './parser/build-ssr-opt'
import { parseWebLayout } from './parser/web-layout-parser'
const layouts: any = {}
const ssr: any = {}
const root = join(process.cwd(), '..', '..')

export const createWebLayout = async (path: string) => {
  const src = `\
import { layout } from 'web-init'
export default layout({
  component: ({ children }) => {
    return <>{children}</>
  },
})`

  await writeAsync(path, src)
}

export const reloadWebLayoutAll = async () => {
  const list = await listAsync(join(root, 'app'))
  if (list) {
    for (const webName of list) {
      if (webName.startsWith('web')) {
        layouts[webName] = {} as any
        ssr[webName] = {} as any
        await reloadAllInternal(
          webName,
          join(root, 'app', webName, 'src', 'base', 'layout')
        )
      }
    }
  }
  await writeWebLayoutInternal(root)
  await buildSSR()
}

export const reloadWebLayoutSingle = async (webName: string, path: string) => {
  if (!layouts[webName]) {
    layouts[webName] = {}
  }
  if (Object.keys(layouts[webName]).length === 0) {
    layouts[webName] = {} as any
    ssr[webName] = {} as any
    await reloadAllInternal(
      webName,
      join(root, 'app', webName, 'src', 'base', 'layout')
    )
    await writeWebLayoutInternal(root)
    await buildSSR()
  } else {
    const res = await reloadInternal(
      webName,
      join(root, 'app', webName, 'src', 'base', 'layout'),
      path
    )
    await writeWebLayoutInternal(root)
    if (res.ssr) {
      await buildSSR()
    }
  }
}

const reloadAllInternal = async (webName: string, basedir: string) => {
  const list = await walkDir(basedir)

  for (let path of list) {
    await reloadInternal(basedir, webName, path)
  }
}

const reloadInternal = async (
  basedir: string,
  webName: string,
  path: string
) => {
  const name = basename(
    path.endsWith('.tsx') ? path.substring(0, path.length - 4) : path
  )

  let isSSR = false

  await parseWebLayout(path, ({ type, value }) => {
    if (type === 'ssr' && value) {
      isSSR = true
    }
  })

  const value = `() => import('../app/${webName}/src/base/layout${path
    .substring(basedir.length, path.length - 4)
    .replace(/\\/gi, '/')}')`

  layouts[webName][name] = value
  if (isSSR) {
    ssr[webName][name] = value
  }

  return { ssr: isSSR }
}
const writeWebLayoutInternal = async (root: string) => {
  const fmtout = format(
    `\
  /******************************************************/
  /************* autogenerated - do not edit ************/
  /******************************************************/
  
  export default {
  ${Object.entries(layouts)
    .sort()
    .map((arg: any) => {
      const [key, value] = arg
      return `'${key}':{${Object.entries(value)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, v]) => {
          return `"${k}":${v}`
        })}},`
    })
    .join('\n')}
  }`,
    { parser: 'babel' }
  )

  const fmtssr = format(
    `\
  /******************************************************/
  /************* autogenerated - do not edit ************/
  /******************************************************/
  
  export default {
  ${Object.entries(ssr)
    .sort()
    .map((arg: any) => {
      const [key, value] = arg
      return `'${key}':{${Object.entries(value)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, v]) => {
          return `"${k}":${v}`
        })}},`
    })
    .join('\n')}
  }`,
    { parser: 'babel' }
  )
  await writeAsync(join(root, 'gen', 'web.layout.ts'), fmtout)
  await writeAsync(join(root, 'gen', 'web.layout.ssr.ts'), fmtssr)
}

const buildSSR = async () => {
  try {
    const scriptPath = join(root, 'gen', 'web.layout.ssr.compiled.js')
    await build({
      entryPoints: [join(root, 'gen', 'web.layout.ssr.ts')],
      bundle: true,
      platform: 'node',
      loader,
      format: 'cjs',
      alias: {
        'gen/web.layout': join(root, 'gen', 'web.layout.ssr.ts'),
      },
      outfile: scriptPath,
    })

    if (!g.isPrebuild) {
      await loadSSR()
    }
  } catch (e) {
    console.log(e)
  }
}
