import { RPCAction, RPCActionResult } from "./types";
import { WebSocket as WSClient } from "ws";
import { config } from "./config";
import get from "lodash.get";
import { DeepProxy } from "@qiwi/deep-proxy";
export const connectRPC = async <T extends RPCAction>(
  name: string,
  arg?: { waitConnection: boolean }
) => {
  const waitConnection = get(arg, "waitConnection", true);
  let ws = false as false | WSClient;
  if (waitConnection) {
    ws = await connect(name);
  }

  return new DeepProxy({}, ({ target, PROXY, key, path, handler }) => {
    if (key) {
      if (key === "then") {
        return PROXY({}, handler, path);
      }

      if (path.length === 0 && key === "connected") return !!ws;

      if (typeof target[key] === "function") {
        return async (...args: any[]) => {
          if (ws === false) ws = await connect(name);

          if (ws) {
            const onmsg = (raw: string) => {
              console.log(raw);
              if (ws) ws.off("message", onmsg);
            };
            ws.on("message", onmsg);
            ws.send(
              JSON.stringify({ type: "action", path: [...path, key], args })
            );
          }
        };
      }

      return PROXY({}, handler, path);
    }
    return undefined;
  }) as RPCActionResult<T> & { connected: boolean };
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
