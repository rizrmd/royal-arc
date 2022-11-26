import { createRequestHandler, JsonRpcRequest } from "./typed-rpc";
import { getSvc, rootBoot, rootService } from "./action-rpc";
import { g } from "../global";
import { _names } from "gen";

const bootHandler = createRequestHandler<typeof rootBoot>({ ...rootBoot });
const serviceHandler = createRequestHandler<typeof rootService>({
  ...rootService,
});

export const initServerRPC = async (port: number) => {
  g.cwd = process.cwd();
  g.svc = {} as any;
  g.ws = new WeakMap();

  while (true) {
    try {
      Bun.serve({
        port: port,
        hostname: "127.0.0.1",
        websocket: {
          async close(ws, code, message) {
            const svc = g.ws.get(ws);
            if (svc) {
              g.ws.delete(ws);
              if (g.svc[svc.name] && g.svc[svc.name][svc.pid]) {
                const s = g.svc[svc.name][svc.pid];
                if (s && s.child) {
                  s.child.kill();
                  await s.child.exited;
                  delete g.svc[svc.name][svc.pid];
                }
              }
            }
          },
          async message(ws, message) {
            if (typeof message === "string") {
              const json = JSON.parse(message) as JsonRpcRequest;

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
                    else if (msg.result) action.resolve(msg.result);
                    delete svc.pendingActions[msg.aid];
                  }
                }
              } else {
                const [_clientID, rpc, _msgID] = json.id.split("|");

                bootHandler.bindThis({ _ws: ws });
                serviceHandler.bindThis({ _ws: ws });

                let res;
                if (rpc === "boot") res = await bootHandler.handleRequest(json);
                if (rpc === "service") {
                  res = await serviceHandler.handleRequest(json);
                }

                if (res) {
                  ws.send(JSON.stringify(res));
                }
              }
            }
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
  return port.toString();
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
