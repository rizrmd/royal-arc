import { JsonRpcRequest, JsonRpcResponse, RequestSender } from "./typed-rpc";

import { _names } from "gen";
import { WebSocket } from "ws";
import { Action, DeclareServiceArg, root } from "../../export";
import PrettyError from "pretty-error";
import { g } from "../global";
export const cg = globalThis as unknown as {
  _serviceName: _names;
  _pid: string;
  _ws: WebSocket;
  _clientID: string;
  _crashed?: boolean;
  _wsPort: number;
  _runtime: "node" | "bun" | "deno";
  _timeoutHolder: ReturnType<typeof setTimeout>;
};

const pe = new PrettyError();

const rpcQueue = {} as Record<
  string,
  { resolve: (value: any) => void; reject: (value: any) => void }
>;

export const rpcSender: (rpc: "boot" | "service") => RequestSender = (rpc) => ({
  sendRequest(request: JsonRpcRequest & { id: string }) {
    return new Promise<JsonRpcResponse>(async (resolve, reject) => {
      const clientID = cg._clientID;
      const ws = cg._ws;
      if (!clientID || !ws) {
        reject(`Cannot send RPC to root. WebSocket not initialized`);
      } else {
        request.id = `${clientID}|${rpc}|${request.id}`;

        // wait until connected
        if (ws.readyState !== ws.OPEN) {
          await new Promise((resume) => {
            ws.once("open", resume);
          });
        }

        rpcQueue[request.id] = { resolve, reject };

        ws.send(JSON.stringify(request));
      }
    });
  },
});

export const initClientRPC = (
  conf: {
    clientID: string;
    wsPort: number;
  },
  arg?: DeclareServiceArg<any>,
) => {
  process
    .on("unhandledRejection", (r, p) => {
      console.log("");
      console.log(pe.render(r as Error));
      process.exit(1);
    });
  process
    .on("uncaughtException", (err) => {
      console.log("");
      console.log(pe.render(err));
      process.exit(1);
    });
  const hook = arg ? arg.hook : undefined;
  return new Promise<void>(async (resolve) => {
    try {
      const port = conf ? conf.wsPort : 0;
      const ws = new WebSocket("ws://127.0.0.1:" + port);
      cg._clientID = conf.clientID;
      cg._pid = conf.clientID.split("~").pop() || "";
      cg._serviceName = (conf.clientID.split("~").shift() || "") as any;
      cg._ws = ws;
      cg._runtime = "node";

      ws.on("error", (e) => {
        console.log(`${cg._serviceName} ws error: ${e.message}`);
      });
      ws.on("close", () => {
        process.exit(88);
      });

      ws.on("open", async () => {
        const res = await root.service.identify(cg._serviceName, cg._pid);

        if (res) {
          if (hook && res) {
            try {
              await hook.onStart({
                pid: cg._pid,
                restarted: res.restarted,
                argv: res.argv,
                params: res.params,
                starter: res.starter,
                metafile: res.metafile
              });
            } catch (e: any) {
              console.log("");
              console.log(pe.render(e));
              process.exit(1);
            }
          }
          cg._runtime = res.runtime;

          clearTimeout(cg._timeoutHolder);
          resolve();
        } else {
          resolve();
        }
      });

      ws.on("message", async (data) => {
        const json = JSON.parse(data.toString("utf8")) as JsonRpcResponse & {
          result?: any;
          error?: any;
        };

        if (json) {
          const msg = json as unknown as
            | { type: "event"; event: "kill"; code?: number }
            | {
              type: "action";
              fn: keyof ReturnType<Action>;
              args: any[];
              aid: string;
            };

          if (msg.type === "event") {
            if (msg.event === "kill") {
              if (hook) {
                await hook.onStop(cg._pid);
              }
              process.exit(msg.code || 0);
            }
          } else if (msg.type === "action") {
            if (arg) {
              const action = arg.action({ pid: cg._pid })[msg.fn];
              let result;
              let error;
              try {
                if (Array.isArray(msg.args)) {
                  result = await action(...msg.args);
                } else {
                  result = await action();
                }
              } catch (e: any) {
                if (e && e.message) error = e.message;
                else error = e;
              }
              ws.send(
                JSON.stringify({
                  type: "action-result",
                  pid: cg._pid,
                  name: cg._serviceName,
                  aid: msg.aid,
                  result,
                  error,
                }),
              );
            }
          } else if (rpcQueue[json.id]) {
            const { resolve, reject } = rpcQueue[json.id];
            if (!json.error) {
              resolve(json.result);
            } else {
              if (json.error && json.error.stack) {
                const stack = json.error.stack.split("\n");

                const lines = [] as ReturnType<typeof parseJSC>[];
                for (let line of stack) {
                  lines.push(parseJSC(line));
                }
                const fl = lines[0];

                if (fl?.function_name) {
                  reject(`\
${json.error.message}
 at ${fl?.function_name}() -> ${fl?.file}:${fl?.position.line}:${fl?.position.column_start}`);
                } else {
                  reject(`${cg._serviceName}: ${json.error.message} `);
                }
              } else {
                reject(json.error);
              }
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
};

const javaScriptCoreRe =
  /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;

function parseJSC(line: string) {
  const parts = javaScriptCoreRe.exec(line);

  if (!parts) {
    return null;
  }

  return {
    file: parts[3],
    function_name: parts[1] || "",
    position: {
      line: +parts[4],
      column_start: parts[5] ? +parts[5] : null,
    },
  };
}
