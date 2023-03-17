import { RPCAction, RPCActionResult } from "./types";
import { Server, Websocket as WSServer } from "hyper-express";
import { config } from "./config";
import { WebSocket as WSClient } from "ws";
import getPort, { portNumbers } from "get-port";
import { DeepProxy } from "@qiwi/deep-proxy";
export const createRPC = async <T extends RPCAction>(
  name: string,
  action: T
) => {
  if (!config.port) {
    config.port = await getPort({ port: portNumbers(14000, 19000) });
    await createServer();
  }

  if (!(await connect(name))) {
    await createServer();
    await connect(name);
  }

  return new DeepProxy(
    action,
    ({ target, PROXY, key, path, handler, args }) => {
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
    }
  ) as RPCActionResult<T>;
};

const connect = (name: string) => {
  return new Promise<boolean>((resolve) => {
    const ws = new WSClient(`ws://localhost:${config.port}/create/${name}`);
    ws.on("message", (e) => {});
    ws.on("open", () => {
      ws.send(JSON.stringify({ type: "identify", name }));
      resolve(true);
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
      const msg = JSON.parse(raw) as { type: "identify"; name: string };

      if (msg.type === "identify") {
        if (!conns[msg.name]) {
          conns[msg.name] = {
            server: ws,
            clients: [],
          };
        }
        conns[msg.name].server = ws;
      }
    });
  });
  server.ws("/connect/:name", (ws) => {});
  await server.listen(config.port, "localhost");
};
