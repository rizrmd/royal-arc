import { init } from "@paralleldrive/cuid2";
import get from "lodash.get";
import PrettyError from "pretty-error";
import { App, WebSocket } from "uWebSockets.js";
import { getPort } from "./get-port";
import { g } from "./global";
import {
  ActionArg,
  ActionExecMsg,
  ActionItem,
  ActionResult,
  Client,
} from "./types";

const pe = new PrettyError();
const cuid = init({ length: 7 });
const dec = new TextDecoder();

export const createAction = <T extends ActionArg>(action: T) => {
  return action as unknown as ActionResult<T>;
};

export type RPCResult = Awaited<ReturnType<typeof createRPC>>;

export const createRPC = async <T extends ActionArg, C extends ActionArg>({
  name,
  action,
  host,
}: {
  name: string;
  action: { server: T; client?: C };
  host?: string;
}) => {
  if (!g.rpcConns) {
    g.rpcConns = { ws: {} };
  }

  if (!g.rpcConns.ws[name]) {
    g.rpcConns.ws[name] = new Set();
  }

  if (!host) {
    host = `ws://localhost:${await getPort()}`;
  }

  if (host) {
    const url = new URL(host);

    if (url.protocol.startsWith("ws")) {
      await new Promise<void>((resolve) => {
        App({})
          .ws("/*", {
            maxPayloadLength: 50 * 1024 * 1024 * 1024, // set max to 50gb
            close(ws: WebSocket<{ embed: Client }>) {
              for (const conns of Object.values(g.rpcConns.ws)) {
                if (conns.has(ws)) conns.delete(ws);
              }
            },
            async message(ws, raw, isBinary) {
              const wsd = ws.getUserData();
              const rawmsg = dec.decode(raw);
              if (
                typeof rawmsg === "string" &&
                rawmsg.startsWith("connect|") &&
                host
              ) {
                const name = rawmsg.substring("connect|".length);

                wsd.embed = {
                  rpcName: name,
                  pid: cuid(),
                  host: host,
                  data: {},
                  send: (data: any) => {
                    ws.send(JSON.stringify(data));
                  },
                };
                g.rpcConns.ws[name].add(ws);
                ws.send("connected");
              } else {
                const msg = await parseMsg(rawmsg);
                if (msg.type === "msg") {
                  await executeServerAction({
                    client: wsd.embed,
                    server: action.server,
                    msg,
                  });
                } else {
                  await executeServerManager({ client: wsd.embed, msg });
                }
              }
            },
          })
          .listen(parseInt(url.port), (listenSocket) => {
            resolve();
          });
      });
    }
  }

  const parseMsg = async (buf: string | Uint8Array) => {
    return (typeof buf === "string" ? JSON.parse(buf) : {}) as ActionExecMsg;
  };

  return {
    server: {
      host,
      parseMsg,
      executeAction: executeServerAction,
    },
    clients: g.rpcConns.ws[name],
  };
};

const executeServerManager = async ({
  client,
  msg,
}: {
  client: Client;
  msg: ActionExecMsg;
}) => {
  if (msg.type === "manage") {
    switch (msg.task) {
      case "list-clients":
        {
          const clients = g.rpcConns.ws[client.rpcName];
          client.send({
            type: "result",
            mid: msg.mid,
            result: [...clients].map((e) => {
              const data = e.getUserData();

              return {
                pid: data.embed.pid,
                data: data.embed.data,
              };
            }),
          });
        }
        break;
      case "set-data":
        {
          for (const [k, v] of Object.entries(msg.data)) {
            client.data[k] = v;
          }
          client.send({ type: "result", mid: msg.mid, result: client.data });
        }
        break;
      case "call-action":
        {
          const ws = g.rpcConns.ws[client.rpcName];
          if (ws) {
            let found = null as null | WebSocket<{ embed: Client }>;
            ws.forEach((w) => {
              if (w.getUserData().embed.pid === msg.pid) {
                found = w;
              }
            });
            if (found) {
              const ref = found.getUserData();
              ref.embed.send({
                mid: msg.mid,
                callerPid: client.pid,
                type: "client-call",
                method: msg.method,
                args: msg.args,
              });
            }
          }
        }
        break;
      case "result-action":
        {
          const ws = g.rpcConns.ws[client.rpcName];
          if (ws) {
            let found = null as null | WebSocket<{ embed: Client }>;
            ws.forEach((w) => {
              if (w.getUserData().embed.pid === msg.callerPid) {
                found = w;
              }
            });

            if (found) {
              const ref = found.getUserData();
              ref.embed.send({
                mid: msg.mid,
                type: "result",
                result: msg.result,
              });
            }
          }
        }
        break;
    }
  }
};

const executeServerAction = async ({
  server,
  client,
  msg,
}: {
  client: Client;
  msg: ActionExecMsg;
  server: ActionArg;
}) => {
  if (msg.type === "msg") {
    const method = msg.method.join(".");
    const prop = get(server, method) as ActionItem;
    const send = client.send;
    if (prop) {
      if (typeof prop === "function") {
        try {
          const result = (await prop.bind(client)(...msg.args)) || null;
          send({
            type: "result",
            mid: msg.mid,
            result,
          });
        } catch (err: any) {
          send({
            type: "result",
            mid: msg.mid,
            error: {
              name: err.name,
              message: err.message,
              code: err.code,
              stack: pe.render(err),
            } as Error,
          });
        }
      } else {
        send({
          type: "result",
          mid: msg.mid,
          result: prop,
        });
      }
    } else {
      send({
        type: "result",
        mid: msg.mid,
        error: {
          message: `RPC: ${msg.method}(): Property ${method} not found.`,
        },
      });
    }
  }
};
