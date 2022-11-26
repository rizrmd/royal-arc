import { spawn } from 'child_process'
import { unzip } from 'fflate'
import {
  copyAsync,
  dirAsync,
  existsAsync,
  moveAsync,
  removeAsync
} from 'service'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { cwd } from 'process'
import { progress } from './panel/panel-build'

export const deployOnServer = (buffer: Buffer) => {
  return new Promise((done) => {
    progress(70, `Extracting Files`)
    unzip(buffer, {}, async (_err: any, content: any) => {
      const promises: any[] = []

      const deployPath = join(cwd(), '..', 'deploy')
      if (await existsAsync(deployPath)) {
        await removeAsync(deployPath)
      }
      await dirAsync(deployPath)
      for (let [path, file] of Object.entries(content || []) as any) {
        const cpath = join(deployPath, path)
        if (file.length === 0) {
          await dirAsync(cpath)
          continue
        }
        promises.push(
          writeFile(cpath, file, {
            mode: 0o777,
          })
        )
      }
      await Promise.all(promises)

      progress(75, `Installing Dependencies`)
      const appPath = join(cwd(), '..', 'app')
      const copies = [
        'mode.json',
        'pnpm-workspace.yaml',
        'package.json',
        'ports.json',
      ]
      await Promise.all(
        copies.map((e) =>
          copyAsync(join(appPath, e), join(deployPath, 'app', e), {
            overwrite: true,
          })
        )
      )
      await new Promise<void>((resolve) => {
        const pnpm = spawn(
          /^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm',
          ['i'],
          {
            stdio: 'inherit',
            cwd: join(deployPath, 'app'),
          }
        )
        pnpm.once('close', resolve)
        pnpm.once('close', resolve)
        pnpm.once('exit', resolve)
      })

      progress(85, `Switching new Deploy`)
      const prevPath = join(cwd(), '..', 'prev')
      const appJsPath = join(cwd(), '..', 'app.js')
      if (await existsAsync(prevPath)) {
        await removeAsync(prevPath)
      }
      await dirAsync(prevPath)
      await moveAsync(appPath, join(prevPath, 'app'))
      await moveAsync(appJsPath, join(prevPath, 'app.js'))

      await moveAsync(join(deployPath, 'app'), appPath)
      await moveAsync(join(deployPath, 'app.js'), appJsPath)

      progress(90, `Restarting App`)
      await new Promise((done) => {
        // g.fork.once('exit', done)
        // g.fork.send({
        //   _type: 'dev',
        //   action: 'kill',
        // })
      })
      if (process.send) process.send({ _type: 'reboot' })
    })
  })
}
