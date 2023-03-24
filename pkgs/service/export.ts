import { DeepProxy, TProxyFactory } from "@qiwi/deep-proxy";
import { addExitCallback } from "catch-exit";
import chalk from "chalk";
import { dir } from "dir";
import { pkg } from "pkg";
import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { attachSpawnCleanup } from "utility/spawn";
import type { actions } from "../../app/gen/service/actions";
import { svc } from "./src/global";
import { SERVICE_NAME } from "./src/types";
import get from "lodash.get";

export * from "./src/create-service";

export const initialize = async (fn: () => Promise<void>) => {
  attachSpawnCleanup("root");

  await pkg.install(dir.path(), { deep: true });
  process.removeAllListeners("warning");

  await svc.init();

  await fn();

  if (process.send) process.send("::RUNNING::");

  if ((await connectRPC("base")).connected) {
  } else {
    addExitCallback(() => {
      svc.rootRpc.destroy();
    });
  }
};

type ProcessAction = {
  isRunning: boolean;
  start: () => Promise<boolean>;
  restart: () => Promise<boolean>;
  stop: () => Promise<boolean>;
};

const manageProcess = (name: SERVICE_NAME, pid?: string) => {
  return {
    get isRunning() {
      return false;
    },
    async start() {
      return await svc.rootRpc.start({ name, pid: pid || name });
    },
    async restart() {
      return true;
    },
    async stop() {
      return true;
    },
  } as ProcessAction;
};

export const executeAction = ({
  name,
  pid,
  entry,
}: {
  name: string;
  pid?: string;
  entry: string;
}): any => {
  const tag = `${name}.${pid || name}`;
  const def = svc.definitions[tag];

  if (def && svc.rpc[tag]) {
    if (def[entry] === "function") {
      return svc.rpc[tag][entry];
    } else if (def[entry] === "object") {
      return new DeepProxy({}, ({ path, key, PROXY }) => {
        const objkey = [entry, ...path, key].join(".");

        if (def[objkey] === "function") {
          return get(svc.rpc[tag], objkey);
        }
        return PROXY({});
      });
    }
  } else {
    console.error(
      `Failed to call ${chalk.magenta(
        `service.coba.${entry}`
      )}\n Service ${chalk.green(name)} not started yet.`
    );
  }
};

export const service = new DeepProxy({}, ({ PROXY, path, key }) => {
  return PROXY({}, ({ path, key, PROXY }) => {
    if (key === "_process" || key === "_all") {
      return manageProcess(path[0] as any);
    }

    if (key === "_pid") {
      return PROXY({}, ({ path, key }) => {
        const pid = key as string;
        return PROXY({}, ({ key }) => {
          if (key === "_process") {
            return manageProcess(path[0] as any, key as string);
          }

          return executeAction({
            name: path[0],
            pid: pid,
            entry: key as string,
          });
        });
      });
    }

    return executeAction({ name: path[0], entry: key as string });
  });
}) as {
  [K in keyof actions]: actions[K]["type"] extends "single"
    ? RPCActionResult<actions[K]["action"]> & { _process: ProcessAction }
    : {
        _pid: Record<
          string,
          RPCActionResult<actions[K]["action"]> & {
            _process: Omit<ProcessAction, "start" | "isRunning">;
          }
        >;
        _all: Omit<ProcessAction, "start" | "isRunning">;
        _start: ProcessAction["start"];
      };
};
