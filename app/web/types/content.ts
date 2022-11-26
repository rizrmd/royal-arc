import { FC } from 'react'
import type layouts from './layout'

export { default as pages } from './page'
export { default as layouts } from './layout'

type IPage = {
  url: string
  layout?: keyof typeof layouts
  actions?: string[]
  component: FC<{ layout: any & { ready: boolean; render: () => void } }>
}

export const page = (opt: IPage) => {
  return opt
}