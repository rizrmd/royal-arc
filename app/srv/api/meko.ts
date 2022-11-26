import { APIContext } from 'royal'

export const _ = {
  url: '/meko',
  async api(name: string) {
    const server: APIContext = this as any

    return { hello: name || "" }
  },
}