import { addExitCallback } from "catch-exit";
import { connectRPC } from "rpc";
import { svc } from "./src/global";

export * from "./src/create-service";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  await svc.init();

  await fn();

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
