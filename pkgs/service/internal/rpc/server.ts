import { ServerWebSocket } from "bun";
import { _names } from "gen";
import { WebSocket as uWebSocket } from "uWebSockets.js";
import { g } from "../global";
import { getSvc, rootBoot, rootService } from "./action-rpc";
import { getRuntime } from "./get-runtime";
import { createRequestHandler, JsonRpcRequest } from "./typed-rpc";
import { waitExit } from "./wait-exit";

const bootHandler = createRequestHandler<typeof rootBoot>({ ...rootBoot });
const serviceHandler = createRequestHandler<typeof rootService>({
  ...rootService,
});

const dec = new TextDecoder();

export const initServerRPC = async (port: number) => {
  g.cwd = process.cwd();
  g.svc = {} as any;
  g.ws = new WeakMap();
  const runtime = getRuntime();

  if (runtime === "node") {
    const { App, getParts } = await import("uWebSockets.js");
    const app = App({});

    app
      .ws("/*", {
        idleTimeout: 0,
        sendPingsAutomatically: true,
        maxPayloadLength: 99999 * 1024 * 1024,
        close(ws, code, message) {
          ws.closed = true;
          onClose(ws);
        },
        async message(ws, message, isBinary) {
          await onMessage(ws, message);
        },
        open(ws) {
          ws.closed = false;
        },
      });
    app.listen("127.0.0.1", port, (socket) => {});
  } else if (runtime === "bun") {
    while (true) {
      try {
        Bun.serve({
          port: port,
          hostname: "127.0.0.1",
          websocket: {
            async close(ws, code, message) {
              onClose(ws);
            },
            async message(ws, message) {
              await onMessage(ws, message);
            },
          },
          fetch(req, server) {
            if (server.upgrade(req)) return;
            return new Response("Regular HTTP response");
          },
        });
        break;
      } catch (_) {
        port = getRandomInt(10000, 22000);
      }
    }
  }
  return port.toString();
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const onClose = async (ws: ServerWebSocket | (uWebSocket)) => {
  const svc = g.ws.get(ws);
  if (svc) {
    g.ws.delete(ws);
    if (g.svc[svc.name] && g.svc[svc.name][svc.pid]) {
      const s = g.svc[svc.name][svc.pid];
      if (s && s.child) {
        s.child.kill();

        await waitExit(s.child);

        delete g.svc[svc.name][svc.pid];
      }
    }
  }
};

const onMessage = async (ws: ServerWebSocket | uWebSocket, _raw: any) => {
  let raw: any = _raw;
  if (raw instanceof ArrayBuffer) {
    raw = dec.decode(_raw);
  }

  if (typeof raw === "string") {
    const json = JSON.parse(raw) as JsonRpcRequest;
    const msg = json as unknown as {
      type: "action-result";
      pid: string;
      name: _names;
      aid: string;
      result?: string;
      error?: string;
    };

    if (msg.type === "action-result") {
      const svc = getSvc(msg.name, msg.pid);
      if (svc) {
        if (svc.pendingActions && svc.pendingActions[msg.aid]) {
          const action = svc.pendingActions[msg.aid];
          if (msg.error) action.reject(msg.error);
          else if (msg.result) action.resolve(JSON.parse(msg.result));
          delete svc.pendingActions[msg.aid];
        }
      }
    } else {
      const [_clientID, rpc, _msgID] = json.id.split("|");

      bootHandler.bindThis({ _ws: ws });
      serviceHandler.bindThis({ _ws: ws });

      let res;
      if (rpc === "boot") {
        res = await bootHandler.handleRequest(json);
      }
      if (rpc === "service") {
        res = await serviceHandler.handleRequest(json);
      }

      const uws = ws as uWebSocket;
      if (res && !uws.closed) {
        ws.send(JSON.stringify(res));
      }
    }
  }
};
