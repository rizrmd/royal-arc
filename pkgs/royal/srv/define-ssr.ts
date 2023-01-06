import { serveSSR } from '../uws/serve-ssr'

type SSRArg = Parameters<typeof serveSSR>
export const defineSSR = (fn: (req: SSRArg[0]) => void | Promise<void>) => {
  return fn
}
