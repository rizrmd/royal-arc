import { init } from "@paralleldrive/cuid2";
import { DeepProxy, THandlerContext } from "@qiwi/deep-proxy";
import chalk from "chalk";
import get from "lodash.get";
import { WebSocket } from "ws";
import {
  ActionArg,
  ActionExecMsg,
  ActionResultMsg,
  RPCConnection,
} from "./types";
const cuid = init({ length: 7 });

type QueueItem = {
  msg: ActionExecMsg;
  resolve: (value: any) => void;
  reject: (error: string) => void;
};

let g = (typeof window === "undefined" ? globalThis : window) as unknown as {
  clientRPC: {
    msgQueue: WeakMap<any, Record<string, QueueItem>>;
  };
};

const dec = new TextDecoder();

export type ClientWS = WebSocket & { queue: Record<string, QueueItem> };

export const connectRPC = async <T extends ActionArg, C extends ActionArg, X>({
  name,
  host,
  action,
}: {
  name: string;
  host: string;
  action: { server: T; client?: C };
}) => {
  if (!g.clientRPC) {
    g.clientRPC = { msgQueue: new WeakMap() };
  }

  const ws = new WebSocket(host) as ClientWS;

  let queue: Record<string, QueueItem> = g.clientRPC.msgQueue.get(
    action.server
  ) as any;

  if (!queue) {
    g.clientRPC.msgQueue.set(action.server, {});
    queue = g.clientRPC.msgQueue.get(action.server) as any;
  }
  ws.queue = queue;

  const send = (ws: WebSocket, msg: ActionExecMsg | string) => {
    if (typeof msg === "string") ws.send(msg);
    else {
      ws.send(JSON.stringify(msg));
    }
  };

  await new Promise<void>((resolve, reject) => {
    ws.onmessage = async ({ data: rawmsg }) => {
      const data =
        typeof rawmsg === "string" ? rawmsg : dec.decode(rawmsg as any);

      if (data === "connected") {
        resolve();
        return;
      }
      const raw = JSON.parse(data);
      const msg = raw as ActionResultMsg;
      if (msg.type === "result") {
        const qitem = queue[msg.mid];
        if (qitem) {
          if ("result" in msg) {
            if (typeof msg.result === "string") {
              if (msg.result === "null") msg.result = null;
              if (msg.result === "undefined") msg.result = undefined;
              if (msg.result === "false") msg.result = false;
              if (msg.result === "0") msg.result = 0;
              if (msg.result === "-0") msg.result = -0;
              if (msg.result === "NaN") msg.result = NaN;
            }

            qitem.resolve(msg.result);
            delete queue[msg.mid];
          } else {
            if (qitem.msg.type === "msg") {
              let err = "RPC unknown error";
              const fnstr = `${chalk.blue(
                `${name}.${qitem.msg.method}`
              )}(${qitem.msg.args
                .map((e) => {
                  return chalk.green(JSON.stringify(e, null, 2));
                })
                .join(", ")})`;

              qitem.reject(`\

Failed to call RPC:

➥ ${fnstr.split("\n").join("\n  ")} 

 ${msg.error?.stack || err}`);
            } else {
              qitem.reject(
                `Error when doing RPC Management task: ${qitem.msg.task}`
              );
            }

            delete queue[msg.mid];
          }
        }
      } else {
        const method = get(action.client, msg.method.join("."));
        if (typeof method === "function") {
          try {
            const result = await method(...msg.args);
            ws.send(
              JSON.stringify({
                type: "manage",
                task: "result-action",
                callerPid: msg.callerPid,
                mid: msg.mid,
                result,
              })
            );
          } catch (e) {}
        }
      }
    };

    ws.onopen = () => {
      send(ws, "connect|" + name);
    };
    ws.onclose = reject;
    ws.onerror = reject;
  });

  (action.server as any).ws = ws;

  return new DeepProxy(
    action.server as any,
    ({ trapName, PROXY, path, key, value }: THandlerContext<any>) => {
      if (trapName === "set") {
        throw new TypeError("target is immutable");
      }

      if (path.length === 0 && key === "_ws" && trapName === "get") {
        return ws;
      }

      if (
        typeof value === "undefined" &&
        (["then", "$$typeof", "toJSON", undefined, "length"].includes(
          key as any
        ) ||
          typeof key === "symbol")
      )
        return PROXY({});

      if (typeof value === "object") return PROXY(value);
      if (typeof value === "function") {
        return (...args: []) => {
          return new Promise((resolve, reject) => {
            const mid = cuid();

            const msg: ActionExecMsg = {
              type: "msg",
              mid,
              args,
              method: [...path, key as any],
            };
            queue[mid] = {
              msg,
              resolve,
              reject,
            };

            send((action.server as any).ws, msg);
          });
        };
      }

      return new Promise((resolve, reject) => {
        const mid = cuid();

        const msg: ActionExecMsg = {
          type: "msg",
          mid,
          args: [],
          method: [...path, key as any],
        };
        queue[mid] = {
          msg,
          resolve,
          reject,
        };

        send((action.server as any).ws, msg);
      });
    }
  ) as RPCConnection<T>;
};
