import { RPCAction, RPCActionResult } from "./types";
import { Server, Websocket as WSServer } from "hyper-express";
import { config } from "./config";
import { WebSocket as WSClient } from "ws";
import getPort, { portNumbers } from "get-port";
import { DeepProxy } from "@qiwi/deep-proxy";
import { createId } from "@paralleldrive/cuid2";

export const createRPC = async <T extends RPCAction>(
  name: string,
  action: T
) => {
  if (!config.port) {
    config.port = await getPort({ port: portNumbers(14000, 19000) });
    await createServer();
  }

  let ws = await connect(name);
  if (!ws) {
    await createServer();
    ws = await connect(name);
  }

  return new DeepProxy(action, ({ target, PROXY, key, path, handler }) => {
    if (key) {
      if (key === "then") {
        return PROXY({}, handler, path);
      }

      if (typeof target[key] === "function") {
        // return (...args: any[]) => {
        //   if (ws) {
        //     const onmsg = (raw: string) => {
        //       console.log(raw);

        //       if (ws) ws.off("message", onmsg);
        //     };
        //     ws.on("message", onmsg);
        //     ws.send(
        //       JSON.stringify({ type: "action", path: [...path, key], args })
        //     );
        //   }
        // };
        return target[key];
      }

      return PROXY(target[key], handler, path);
    }
    return undefined;
  }) as RPCActionResult<T>;
};

const connect = (name: string) => {
  return new Promise<false | WSClient>((resolve) => {
    const ws = new WSClient(`ws://localhost:${config.port}/create/${name}`);
    ws.on("open", () => {
      ws.send(JSON.stringify({ type: "identify", name }));
      resolve(ws);
    });
    ws.on("close", () => resolve(false));
    ws.on("error", () => resolve(false));
  });
};

const createServer = async () => {
  const server = new Server();
  const conns = {} as Record<string, { server: WSServer; clients: WSServer[] }>;

  server.ws("/create/:name", (ws) => {
    ws.on("message", (raw) => {
      const msg = JSON.parse(raw) as
        | { type: "identify"; name: string }
        | { type: "action"; path: string[]; args: any };

      if (msg.type === "identify") {
        if (!conns[msg.name]) {
          conns[msg.name] = {
            server: ws,
            clients: [],
          };
        }
        conns[msg.name].server = ws;
      } else if (msg.type === "action") {
      }
    });
  });
  server.ws("/connect/:name", (ws) => {});
  await server.listen(config.port, "localhost");
};
