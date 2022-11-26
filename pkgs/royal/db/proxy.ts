//@ts-ignore
import { prisma } from 'gen/prisma'
import { root } from 'service'

type DBName = keyof typeof prisma
type DBProxy = <T extends DBName>(name: T) => typeof prisma[T]

export const dbs: DBProxy = (name) => {
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table.startsWith('$')) {
          return (...params: any[]) => {
            //@ts-ignore
            return root.action('db').query({
              action: 'query',
              table,
              params,
            })
          }
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return async (...params: any[]) => {
                if (table === 'query') {
                  table = action
                  action = 'query'
                }
    
                //@ts-ignore
                const result = await root.action('db').query({
                  action,
                  table,
                  params,
                })
                return result
              }
            },
          }
        )
      },
    }
  ) as any
}

//---generated---//
export const db = dbs('db')
