import chalk from "chalk";
import { dir } from "dir";
import { readAsync, writeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { pkg } from "pkg";
import { createRPC } from "rpc";
import { connectRPC } from "rpc/client";
import { ActionResult, RPCConnection, RPCManager } from "rpc/types";
import { ClientAction } from "./action/client";
import { ServerAction } from "./action/server";
import { g, initGlobal } from "./global";
import { SVCAction } from "../../../app/gen/service-type";
import { DeepProxy, THandlerContext } from "@qiwi/deep-proxy";
import { manageRPC } from "rpc/manage";
import { SERVICE_NAME } from "../../../app/gen";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  await initGlobal();
  await pkg.install([process.cwd()], {
    cwd: process.cwd(),
  });

  console.log(
    `── ${padEnd(chalk.cyan(g.mode.toUpperCase()) + " ", 47, "─")}\n`
  );

  g.rpc = await createRPC({
    name: "root.service",
    action: { server: ServerAction, client: ClientAction },
  });

  await root.init(g.rpc.server.host);

  await writeAsync(
    dir.path("runtime.json"),
    {
      runtime: "node",
      svc_port: parseInt(new URL(g.rpc.server.host).port),
    },
    { jsonIndent: 2 }
  );

  try {
    await fn();
  } catch (e) {
    console.error(e);
  }
};

type SERVICE_TYPE = "service" | "web" | "db" | "srv";
export const initService = async (
  serviceType: SERVICE_TYPE,
  fn: (
    mode: "dev" | "prod" | "staging"
  ) => Promise<Record<string, any> & { name: SERVICE_NAME }>
) => {
  const phase = (process.argv[2] === "build" ? "print-config" : "run") as
    | "run"
    | "print-config"
    | "import";

  if (phase === "run") {
    const runtime = await readAsync(dir.path("runtime.json"), "json");
    const init = await root.init(`ws://localhost:${runtime.svc_port}`);
    const mode = await root.service.mode();
    const config = await fn(mode);

    init._mgr.current.setData({ svcName: config.name });

    return {
      serviceType,
      mode,
      phase,
      config,
    };
  } else {
    const mode = (process.argv[3] || "prod") as "prod" | "staging";
    const config = await fn(mode);

    if (process.send) {
      process.send({ ...config, serviceType });
    }

    return {
      serviceType,
      mode,
      phase,
      config,
    };
  }
};

const enroot = (obj: any) => {
  return obj as unknown as {
    _rpc: RPCConnection<typeof ServerAction>;
    _mgr: RPCManager<typeof ClientAction>;
    _onConnect?: () => Promise<void>;
  };
};

export const root = {
  async init(host: string) {
    const rpc = await connectRPC({
      name: "root.service",
      host,
      action: { server: ServerAction, client: ClientAction },
    });
    enroot(this)._mgr = await manageRPC(rpc._ws);
    enroot(this)._rpc = rpc;
    const onConnect = enroot(this)._onConnect;
    if (onConnect) {
      await onConnect();
    }
    return enroot(this);
  },
  get service() {
    return enroot(this)._rpc;
  },
  get connected() {
    return !!enroot(this)._rpc;
  },
  get action() {
    return (name: string, pid?: string) =>
      new DeepProxy(
        {},
        ({ PROXY, path, key, parameters }: THandlerContext<any>) => {
          if (key === undefined) {
            const arg = parameters[parameters.length - 1];
            return new Promise((resolve) => {
              const mgr = enroot(this)._mgr;

              if (mgr) {
                mgr.clients(async ({ pid, data, action }) => {
                  if (data.svcName === name) {
                    const res = await action.clientAction(path, arg);
                    resolve(res);
                  }
                });
              }
            });
          }

          return PROXY(() => {});
        }
      );
  },
  onConnect(fn) {
    enroot(this)._onConnect = fn;
  },
} as {
  init: (
    host: string,
    data?: { svcName: string }
  ) => Promise<ReturnType<typeof enroot>>;
  service: ActionResult<typeof ServerAction>;
  action: <T extends keyof SVCAction>(
    name: T,
    pid?: string
  ) => Awaited<SVCAction[T]>;
  connected: boolean;
  onConnect: (fn: () => Promise<void>) => void;
};
