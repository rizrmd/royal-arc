import { RPCAction, RPCActionResult } from "./types";
import { Server, Websocket as WSServer } from "hyper-express";
import { config } from "./config";
import { WebSocket as WSClient } from "ws";
import getPort, { portNumbers } from "get-port";
import { DeepProxy } from "@qiwi/deep-proxy";
import { createId } from "@paralleldrive/cuid2";
import get from "lodash.get";

type ActionMsg = {
  type: "action";
  path: string[];
  args: any;
  msgid: string;
  clientid?: string;
};

export type ActionResult = {
  type: "action-result";
  result: any;
  error: any;
  msgid: string;
  clientid: string;
};

export const createRPC = async <T extends RPCAction>(
  name: string,
  action: T
) => {
  if (!config.port) {
    config.port = await getPort({ port: portNumbers(14000, 19000) });
    await createServer();
  }

  let ws = await connect(name, action);
  if (!ws) {
    await createServer();
    ws = await connect(name, action);
  }

  return new DeepProxy(action, ({ target, PROXY, key, path, handler }) => {
    if (key) {
      if (key === "then") {
        return PROXY({}, handler, path);
      }

      if (typeof target[key] === "function") {
        return target[key];
      }

      return PROXY(target[key], handler, path);
    }
    return undefined;
  }) as RPCActionResult<T>;
};

const connect = (name: string, action: RPCAction) => {
  return new Promise<false | WSClient>((resolve) => {
    const ws = new WSClient(`ws://localhost:${config.port}/create/${name}`);
    ws.on("open", () => {
      ws.send(JSON.stringify({ type: "identify", name }));
      ws.on("message", async (raw: string) => {
        const msg = JSON.parse(raw) as ActionMsg;
        if (msg.type === "action") {
          const fn = get(action, msg.path.join("."));
          if (typeof fn === "function") {
            let result = undefined as any;
            let error = undefined as any;
            try {
              result = await fn(...msg.args);
            } catch (e) {
              error = e;
            }

            ws.send(
              JSON.stringify({
                type: "action-result",
                result,
                error,
                clientid: msg.clientid,
                msgid: msg.msgid,
              })
            );
          }
        }
      });

      resolve(ws);
    });
    ws.on("close", () => resolve(false));
    ws.on("error", () => resolve(false));
  });
};

const createServer = async () => {
  const server = new Server();
  const conns = {} as Record<
    string,
    { server: null | WSServer; clients: Set<WSServer> }
  >;

  server.ws("/create/:name", (ws) => {
    ws.on("message", (raw) => {
      const msg = JSON.parse(raw) as
        | { type: "identify"; name: string }
        | ActionResult;

      if (msg.type === "identify") {
        if (!conns[msg.name]) {
          conns[msg.name] = {
            server: null,
            clients: new Set(),
          };
        }
        conns[msg.name].server = ws;
      } else if (msg.type === "action-result") {
        for (const v of Object.values(conns)) {
          v.clients.forEach((cws) => {
            if (cws.context.clientId === msg.clientid) {
              cws.send(raw);
            }
          });
        }
      }
    });
  });
  server.ws("/connect/:name", (ws: WSServer<{ clientId: string }>) => {
    ws.on("message", (raw) => {
      const msg = JSON.parse(raw) as
        | { type: "identify"; name: string }
        | ActionMsg;

      if (msg.type === "identify") {
        if (!conns[msg.name]) {
          conns[msg.name] = {
            server: null,
            clients: new Set(),
          };
        }
        ws.context.clientId = createId();
        conns[msg.name].clients.add(ws);
      } else if (msg.type === "action") {
        let name = "";
        for (const [k, v] of Object.entries(conns)) {
          if (v.clients.has(ws)) {
            name = k;
          }
        }
        if (name && conns[name]) {
          conns[name].server?.send(
            JSON.stringify({ ...msg, clientid: ws.context.clientId })
          );
        }
      }
    });
  });
  await server.listen(config.port, "localhost");
};
