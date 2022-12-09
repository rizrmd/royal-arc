//@ts-ignore
import { prisma } from "gen/prisma";
import { DBArg, root } from "service";

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

type SetCacheWhere<T extends DBName, N extends DBTables<T>> = Parameters<
  typeof prisma[T][N]["findFirst"]
>[0]["where"];

type SetCacheData<T extends DBName, N extends DBTables<T>> = Parameters<
  typeof prisma[T][N]["update"]
>[0]["data"];

export type ExtendPrisma<T extends DBName> = {
  _schema: {
    [tableName in DBTables<T>]: Promise<{
      pk: string[];
    }>;
  };
  _cache:
    & {
      [tableName in DBTables<T>]: {
        get: (
          where: any,
          forceReload?: boolean,
        ) => Promise<ReturnType<typeof prisma[T][tableName]["findFirst"]>>;
        upsert: (
          data: SetCacheData<T, tableName>,
          where?: SetCacheWhere<T, tableName>,
        ) => Promise<void>;
      };
    }
    & {
      _init: (obj: object, key: string) => void;
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
        if (table === "_cache") {
          return new Proxy({ var: {} as any }, {
            get(target, table: string) {
              target.var;

              if (table === "_init") {
                return (obj: object, key: string) => {
                  if (obj) {
                    obj[key] = {};
                  }
                };
              }

              let items = null as unknown as Set<any>;
              if (!target.var[table]) {
                target.var[table] = new Set();
              }
              items = target.var[table];

              return {
                async get(where: any, forceReload?: boolean) {
                  let item: any;

                  if (!forceReload) {
                    items.forEach((row) => {
                      if (item) return;

                      let found = true;
                      for (const [k, v] of Object.entries(where)) {
                        if (row[k] !== v) found = false;
                      }
                      if (found) {
                        item = row;
                      }
                    });
                  }

                  if (item) return item;

                  const row = await root.action("db").query({
                    action: "findFirst",
                    table,
                    params: where ? [{ where }] : undefined,
                  });

                  if (row) {
                    items.add(row);
                    return row;
                  }

                  return {};
                },
                async upsert(data: any, where?: any) {
                  let existing = null;
                  if (where) {
                    existing = await this.get(where);
                  } else {
                    existing = await this.get(data);
                  }

                  if (Object.keys(existing).length === 0) {
                    // record does not exist in db or cache

                    const row = await root.action("db").query({
                      action: "create",
                      table,
                      params: [{ data }],
                    });

                    items.add(row);
                    return row;
                  }

                  const whereq = {};
                  for (let i of (await schema[table]).pk) {
                    whereq[i] = existing[i];
                  }

                  const row = await root.action("db").query({
                    action: "update",
                    table,
                    params: [{ data, where: whereq }],
                  });

                  items.delete(existing);
                  items.add(row);
                  return row;
                },
              };
            },
          });
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
