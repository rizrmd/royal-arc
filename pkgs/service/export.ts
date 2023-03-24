import { addExitCallback } from "catch-exit";
import { connectRPC } from "rpc";
import { attachSpawnCleanup } from "utility/spawn";
import { svc } from "./src/global";
import { pkg } from "pkg";
import { dir } from "dir";
import type { actions } from "../../app/gen/service/actions";
import { DeepProxy } from "@qiwi/deep-proxy";

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

const manageProcess = (name: string, pid?: string) => {
  return {
    get isRunning() {
      return false;
    },
    async start(): Promise<false | string> {
      console.log("starting", pid);
      return false;
    },
    async restart() {
      return true;
    },
    async stop() {
      return true;
    },
  } as ProcessAction;
};

export const executeAction = (name: string, pid?: string): any => {
  return new Proxy(
    {},
    {
      get(target, p, receiver) {
        return async (...args: any) => {
          console.log(name, pid, p, args);
        };
      },
    }
  );
};

export const service = new DeepProxy({}, ({ path, key, PROXY }) => {
  const lastPath = path[path.length - 1];

  // db.query()
  // db._start()
  if (path.length === 1) {
    if (!["_process", "_pid", "_all"].includes(key as any)) {
      return executeAction(path[0])[key];
    }
    if (key === "_start") {
      return manageProcess(path[0])["start"];
    }
  }

  // db._process.stop()
  // db._all.stop()
  if (path.length === 2) {
    if (lastPath === "_process" || lastPath === "_all") {
      return manageProcess(path[0])[key as keyof ProcessAction];
    }
  }

  // db._pid.123.query()
  if (path.length === 3) {
    if (path[1] === "_pid") {
      const pid = path[2];
      return executeAction(path[0], pid)[key];
    }
  }

  // db._pid.123._process.stop()
  if (path.length === 4) {
    if (path[1] === "_pid") {
      const pid = path[2];
      if (lastPath === "_process") {
        return manageProcess(path[0], pid)[key as keyof ProcessAction];
      }
    }
  }

  return PROXY({});
}) as {
  [K in keyof actions]: actions[K]["type"] extends "single"
    ? actions[K]["action"] & { _process: ProcessAction }
    : {
        _pid: Record<
          string,
          actions[K]["action"] & {
            _process: Omit<ProcessAction, "start" | "isRunning">;
          }
        >;
        _all: Omit<ProcessAction, "start" | "isRunning">;
        _start: ProcessAction["start"];
      };
};
