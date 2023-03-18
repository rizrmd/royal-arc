import { createId } from "@paralleldrive/cuid2";
import { DeepProxy } from "@qiwi/deep-proxy";
import get from "lodash.get";
import { WebSocket as WSClient } from "ws";
import { config } from "./config";
import { ActionResult } from "./server";
import { RPCAction, RPCActionResult } from "./types";

export const connectRPC = async <T extends RPCAction>(
  name: string,
  arg?: { waitConnection: boolean }
) => {
  const waitConnection = get(arg, "waitConnection", true);
  let ws = false as false | WSClient;
  let serverConnected = false;
  if (waitConnection) {
    const res = await connect(name);
    if (res) {
      ws = res.ws;
      serverConnected = res.serverConnected;
    }
  }

  return new DeepProxy({}, ({ target, PROXY, key, path, handler }) => {
    if (key) {
      if (key === "then") {
        return PROXY({}, handler, path);
      }

      if (path.length === 0 && key === "connected")
        return !!ws && !!serverConnected;

      return async (...args: any[]) => {
        if (ws === false) {
          const res = await connect(name);
          if (res) {
            ws = res.ws;
            serverConnected = res.serverConnected;
          }
        }

        return new Promise<any>((resolve, reject) => {
          if (ws) {
            const onmsg = (raw: string) => {
              if (ws) {
                ws.off("message", onmsg);

                const msg = JSON.parse(raw) as ActionResult;

                if (msg.type === "action-result") {
                  if (!msg.error) {
                    resolve(msg.result);
                  } else {
                    reject(msg.error);
                  }
                }
              }
            };
            ws.on("message", onmsg);
            ws.send(
              JSON.stringify({
                type: "action",
                msgid: createId(),
                path: [...path, key],
                args,
              })
            );
          }
        });
      };
    }
    return undefined;
  }) as RPCActionResult<T> & { connected: boolean };
};

const connect = (name: string) => {
  return new Promise<false | { ws: WSClient; serverConnected: boolean }>(
    (resolve) => {
      const ws = new WSClient(`ws://localhost:${config.port}/connect/${name}`);
      ws.on("open", () => {
        ws.send(JSON.stringify({ type: "identify", name }));
        ws.on("message", (raw: string) => {
          const msg = JSON.parse(raw) as {
            type: "connected";
            serverConnected: boolean;
          };

          if (msg.type === "connected") {
            resolve({ ws, serverConnected: msg.serverConnected });
          }
        });
      });
      ws.on("close", () => resolve(false));
      ws.on("error", () => resolve(false));
    }
  );
};
