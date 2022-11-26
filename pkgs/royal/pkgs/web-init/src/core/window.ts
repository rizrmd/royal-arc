import { css } from '@emotion/react'
import { IAppRoot } from 'index'
import { Fragment } from 'react'
import { jsx } from './jsx'
export {}

declare global {
  interface Window {
    mode: 'dev' | 'prod' | 'pkg'
    css: typeof css
    jsx: typeof jsx
    Fragment: typeof Fragment
    Capacitor: any
    isMobile: boolean
    mobile: {
      ready: boolean
      insets: any
    }
    devStamp: number
    navigate: (href: string) => void
    preventPopRender: boolean
    appRoot: IAppRoot & { render: () => void }
    dbDefinitions: Record<string, any>
    auth: any
    basepath: string
    pathname: string
    baseurl: string
    serverurl: string
    params: any
  }
}
