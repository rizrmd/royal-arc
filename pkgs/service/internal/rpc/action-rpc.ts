import { ServerWebSocket } from "bun";
import { spawn } from "child_process";
import cuid from "cuid";
import { _names, _runtime } from "gen";
import capitalize from "lodash.capitalize";
import padEnd from "lodash.padend";
import { join } from "path";
import picocolors from "picocolors";
import { root } from "../../export";
import { ActionItem, ActionKey, g } from "../global";
import { buildSvc } from "../service/build/build-svc";
import { generateMeta } from "../service/gen-meta";
import { serverCleanUp } from "../service/server/cleanup";
import { getPort } from "./get-port";
import { getRuntime } from "./get-runtime";
import { Handlers, RequestSender } from "./typed-rpc";

const { blue, green, magenta, red, yellow } = picocolors;
const _boot = () => ({
  async stop() {
    await serverCleanUp();
    process.exit(0);
  },
  async genMeta() {
    await generateMeta(join(process.cwd(), "..", ".."));
  },
  async getPort() {
    return await getPort();
  },
  buildSvc: buildSvc,
});

const _service = () => ({
  identify(name: _names, pid: string) {
    const ws = getWs(this);
    let svc = getSvc(name, pid);

    if (svc) {
      svc.ws = ws;
      if (svc.pendingStart) {
        svc.pendingStart({ pid });
      }

      console.log(
        magenta("Started"),
        green(`› ${padEnd(capitalize(name) + " ", 13, " ")}`),
        `[pid: ${blue(padEnd(pid, 7, " "))}]`,
        !!svc.restarted ? yellow("Restarted") : "",
      );

      return {
        params: svc.params,
        argv: process.argv.slice(2),
        runtime: svc.runtime,
        restarted: !!svc.restarted,
        starter: svc.starter,
        metafile: g.node.build[name].metafile,
      };
    }
  },
  start(name: _names, params?: any) {
    return new Promise<{ pid: string }>((resolve) => {
      const ws = getWs(this);
      const starter = g.ws.get(ws)?.name || "root";

      const pid = cuid.slug();
      const svc = getSvc(name, pid, true);
      const path = join(process.cwd(), "service", name);
      svc.params = params;
      svc.starter = starter;

      const restart = (crashed?: boolean) => {
        svc.restarted = true;
        svc.crashed = !!crashed;
        if (svc.ws) {
          if (svc.ws.readyState === 3) svc.ws.close();
          delete svc.ws;
        }
        start();
      };

      const start = () => {
        const svcRuntime = getRuntime();
        const onExit = (exitCode: number) => {
          const desc: any = {
            "0": "EXIT WITHOUT ERROR",
            "1": "FATAL ERROR",
            "2": "Incorrect usage, invalid options or missing arguments",
            "55": "Service requested stop parent",
            "126": "Command found but is not executable",
            "128": "Command was forcefully terminated manually",
            "88": "Parent websocket connection lost",
            "111": "Hot Reload",
            "222": "Terminated by parent",
            "130": "SIGINT (ctrl+c)",
            "143": "SIGTERM (kill command)",
          };
          const stoplog = (reason?: string) => {
            if (reason === "Hot Reload" || reason === "Clean Up") return;
            console.log(
              red("Stopped"),
              green(`› ${padEnd(capitalize(name) + " ", 13, " ")}`),
              `[pid: ${blue(padEnd(pid, 7, " "))}] ${yellow(reason || "")}`,
            );
          };

          if (svc.pendingExit && svc.pendingExit.resolve) {
            const reason = svc.pendingExit.from;
            stoplog(`${reason}`);
            svc.pendingExit.resolve(exitCode);
            delete g.svc[name][pid];
          } else {
            const text = desc[exitCode.toString()] || "Unknown Exit Code";

            if (exitCode === 55) {
              process.exit(55);
            }

            if (exitCode === 111) {
              stoplog(text);
              buildSvc(name, process.cwd());
              restart();
              return;
            } else {
              stoplog(`[${red(`${exitCode}`)}] ${yellow(text)}`);
              if (g.mode !== "dev") {
                restart(true);
              } else {
                delete g.svc[name][pid];
              }
              return;
            }
          }
          delete g.svc[name][pid];
        };
        if (_runtime[name] === "node") {
          const args = [
            "--enable-source-maps",
            "--no-warnings",
            join(path, "index.js"),
            svc.crashed ? "crashed" : "running",
            g.svcPort.toString(),
            pid,
          ].filter((e) => e);
          if (svcRuntime === "bun") {
            svc.child = Bun.spawn({
              cmd: ["node", ...args],
              cwd: process.cwd(),
              stderr: "inherit",
              stdout: "inherit",
              onExit(exitCode) {
                onExit(exitCode);
              },
            });
          } else if (svcRuntime === "node") {
            svc.child = spawn(process.execPath, args, {
              cwd: process.cwd(),
              stdio: "inherit",
            });
            svc.child.on("exit", (code) => {
              onExit(code || 0);
            });
          }
          svc.pendingStart = resolve;
          return svc;
        } else {
          if (!_runtime[name]) {
            console.log(`Service ${name} not found`);
          } else {
            console.log("Only node service are supported");
          }
        }
      };
      start();
    });
  },
  stopAll(name: _names, reason?: string) {
    return new Promise<number[]>((_resolve) => {
      const pending: Promise<number>[] = [];
      const resolve = (codes: number[]) => {
        _resolve(codes);
      };
      if (g.svc[name]) {
        for (const [_, svc] of Object.entries(g.svc[name])) {
          if (svc && svc.ws) {
            pending.push(
              new Promise<number>((done) => {
                if (svc && svc.ws) {
                  svc.pendingExit = {
                    resolve: done,
                    from: reason || "Stop All",
                  };
                  svc.ws.send(
                    JSON.stringify({
                      type: "event",
                      event: "kill",
                    }),
                  );
                }
              }),
            );
          }
        }
        Promise.all(pending).then(resolve);
      } else {
        resolve([]);
      }
    });
  },
  stop(name: _names, pid: string, reason?: string) {
    return new Promise<number>((resolve) => {
      const svc = getSvc(name, pid);
      if (svc && svc.ws) {
        svc.pendingExit = { resolve, from: reason || "Stop" };
        svc.ws.send(
          JSON.stringify({
            type: "event",
            event: "kill",
          }),
        );
      }
    });
  },
});

export const getSvc = (
  name: _names,
  pid: string | undefined,
  initWhenNotFound?: true,
) => {
  if (!g.svc[name]) g.svc[name] = {};

  if (!pid) {
    const firstidx = Object.keys(g.svc[name])[0];
    return g.svc[name][firstidx];
  }

  if (g.svc[name][pid]) {
    return g.svc[name][pid];
  } else if (initWhenNotFound) {
    g.svc[name][pid] = { runtime: "node", starter: "root" };
  }

  return g.svc[name][pid];
};

const getWs = (a: any) => {
  return a._ws as ServerWebSocket;
};

export const rootAction =
  (sender: RequestSender) => <N extends ActionKey>(name: N, pid?: string) => {
    return new Proxy(
      {},
      {
        get(_, p) {
          return async (...args: any[]) => {
            return await sender.sendRequest({
              id: cuid.slug(),
              jsonrpc: "2.0",
              method: "action",
              params: [name, p, args, pid],
            });
          };
        },
      },
    ) as Handlers<ReturnType<ActionItem[N]>>;
  };

export const invokeAction = <N extends ActionKey>(
  name: N,
  fn: keyof ReturnType<ActionItem[N]>,
  args?: any[],
  pid?: string,
) => {
  return new Promise<any>((resolve, reject) => {
    const svc = getSvc(name as any, pid);
    if (svc && svc.ws) {
      if (!svc.pendingActions) svc.pendingActions = {};
      const aid = cuid.slug();
      svc.pendingActions[aid] = { resolve, reject };
      svc.ws.send(
        JSON.stringify({
          type: "action",
          aid,
          fn,
          args,
        }),
      );
    } else {
      reject(
        `Failed to call ${fn.toString()}: Service ${
          String(name)
        } not started yet.`,
      );
    }
  });
};

export const rootBoot = _boot() as Handlers<ReturnType<typeof _boot>>;
export const rootService = _service() as Handlers<ReturnType<typeof _service>>;
