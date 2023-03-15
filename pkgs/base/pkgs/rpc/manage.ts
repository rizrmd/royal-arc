import { init } from "@paralleldrive/cuid2";
import { DeepProxy, THandlerContext } from "@qiwi/deep-proxy";
import { ClientWS } from "./client";
import { ActionExecManager, ActionExecMsg, RPCManager } from "./types";

const cuid = init({ length: 7 });
export const manageRPC = async <T>(ws: ClientWS) => {
  return {
    async clients(each) {
      const clients = (await callRPC(ws, { task: "list-clients" })) as {
        pid: string;
        data: any;
      }[];
      await Promise.all(
        clients.map((client) =>
          each({
            pid: client.pid,
            data: client.data,
            action: new DeepProxy(
              {},
              ({ PROXY, path, key, parameters }: THandlerContext<any>) => {
                if (key === undefined) {
                  const arg = parameters[parameters.length - 1];
                  return new Promise(async (resolve, reject) => {
                    try {
                      resolve(
                        await callRPC(ws, {
                          task: "call-action",
                          pid: client.pid,
                          method: path,
                          args: arg,
                        })
                      );
                    } catch (e) {
                      reject(e);
                    }
                  });
                }

                return PROXY(() => {});
              }
            ) as any,
            async disconnect() {},
          })
        )
      );
    },
    current: {
      async setData(data) {
        await callRPC(ws, { task: "set-data", data });
      },
    },
  } as RPCManager<T>;
};

const callRPC = (ws: ClientWS, msg: Partial<ActionExecManager>) => {
  return new Promise((resolve, reject) => {
    const mid = cuid();
    const final = { ...msg, mid, type: "manage" } as ActionExecManager;
    ws.queue[mid] = {
      msg: final,
      resolve,
      reject,
    };
    ws.send(JSON.stringify(final));
  });
};
