//@ts-ignore
import _jetpack from './lib/jetpack'
import { FSJetpack } from './types'

let _jet: any = _jetpack()
while (typeof _jet === 'function') {
  _jet = _jet()
}

export const jetpack: FSJetpack = _jet as any
export const writeAsync = jetpack.writeAsync
export const append = jetpack.append
export const appendAsync = jetpack.appendAsync
export const copy = jetpack.copy
export const copyAsync = jetpack.copyAsync
export const createReadStream = jetpack.createReadStream
export const createWriteStream = jetpack.createWriteStream
export const cwd = jetpack.cwd
export const dir = jetpack.dir
export const dirAsync = jetpack.dirAsync
export const exists = jetpack.exists
export const existsAsync = jetpack.existsAsync
export const file = jetpack.file
export const fileAsync = jetpack.fileAsync
export const find = jetpack.find
export const findAsync = jetpack.findAsync
export const inspect = jetpack.inspect
export const inspectAsync = jetpack.inspectAsync
export const inspectTree = jetpack.inspectTree
export const inspectTreeAsync = jetpack.inspectTreeAsync
export const list = jetpack.list
export const listAsync = jetpack.listAsync
export const move = jetpack.move
export const moveAsync = jetpack.moveAsync
export const path = jetpack.path
export const read = jetpack.read
export const readAsync = jetpack.readAsync
export const remove = jetpack.remove
export const removeAsync = jetpack.removeAsync
export const rename = jetpack.rename
export const renameAsync = jetpack.renameAsync
export const symlink = jetpack.symlink
export const symlinkAsync = jetpack.symlinkAsync
export const tmpDir = jetpack.tmpDir
export const tmpDirAsync = jetpack.tmpDirAsync
export const write = jetpack.write
