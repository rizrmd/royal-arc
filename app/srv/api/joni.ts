import { APIContext } from 'royal'

export const _ = {
  url: '/joni',
  async api(name: string) {
    const server: APIContext = this as any

    return { hello: name || "" }
  },
}