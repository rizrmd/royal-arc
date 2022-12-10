//@ts-ignore
import { prisma } from "gen/prisma";
import { root } from "service";

export type DBName = keyof typeof prisma;

export type DBTables<T> = T extends DBName ? Exclude<
    keyof typeof prisma[T],
    | "$connect"
    | "$disconnect"
    | "$execute"
    | "$executeRaw"
    | "$executeRawUnsafe"
    | "$on"
    | "$queryRaw"
    | "$queryRawUnsafe"
    | "$transaction"
    | "$use"
  >
  : never;

export type ExtendPrisma<T extends DBName> = {
  _schema: {
    [tableName in DBTables<T>]: Promise<{
      pk: string[];
    }>;
  };
};

type DBProxy = <T extends DBName>(
  name: T,
) => typeof prisma[T] & ExtendPrisma<T>;

export const dbs: DBProxy = (name) => {
  return new Proxy(
    { schema: {} as Record<string, { pk: string[] }> },
    {
      get(_, table: string) {
        if (!_.schema) {
          _.schema = {};
        }

        const schema = new Proxy({}, {
          async get(__, table: string) {
            if (!_.schema[table]) {
              _.schema[table] = await root.action("db").schema(table);
            }
            return _.schema[table];
          },
        });
        if (table === "_schema") {
          return schema;
        }

        if (table.startsWith("$")) {
          return (...params: any[]) => {
            //@ts-ignore
            return root.action("db").query({
              action: "query",
              table,
              params,
            });
          };
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return async (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }

                //@ts-ignore
                const result = await root.action("db").query({
                  action,
                  table,
                  params,
                });
                return result;
              };
            },
          },
        );
      },
    },
  ) as any;
};

//---generated---//
export const db = dbs("db");
