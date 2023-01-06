import { watch } from 'chokidar'
import { basename, join } from 'path'
import { dirAsync } from 'service'
import { createWebGen, reloadWebGenSingle } from './scaff-web-gen'
import { createWebLayout, reloadWebLayoutSingle } from './scaff-web-layout'
import { createWebPage, reloadWebPageSingle } from './scaff-web-page'

export const watcherWeb = async (path: string) => {
  const webName = basename(path)

  const pagePath = join(path, 'src', 'base', 'page')
  const layoutPath = join(path, 'src', 'base', 'layout')
  const genPath = join(path, 'src', 'gen')

  const paths = [pagePath, layoutPath, genPath]

  await Promise.all(paths.map((e) => dirAsync(e)))

  const w = watch(paths, { ignoreInitial: true })

  w.on('all', async (e, filePath) => {
    switch (true) {
      case filePath.startsWith(layoutPath):
        {
          if (e === 'add' && filePath.endsWith('.tsx')) {
            await createWebLayout(filePath)
          }

          await reloadWebLayoutSingle(webName, filePath)
        }
        break
      case filePath.startsWith(pagePath):
        {
          if (e === 'add' && filePath.endsWith('.tsx')) {
            await createWebPage(filePath)
          }

          await reloadWebPageSingle(webName, filePath)
        }
        break
      case filePath.startsWith(genPath):
        {
          if (e === 'add' && filePath.endsWith('.ts')) {
            await createWebGen(filePath)
          }

          await reloadWebGenSingle(webName)
        }
        break
    }
  })
}
