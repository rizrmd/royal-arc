import { addExitCallback } from "catch-exit";
import { connectRPC } from "rpc";
import { attachSpawnCleanup } from "utility/spawn";
import { svc } from "./src/global";
import { pkg } from "pkg";
import { dir } from "dir";

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
      svc.rpc.destroy();
    });
  }
};

export const root = {
  get service() {
    return svc.rpc;
  },
};
