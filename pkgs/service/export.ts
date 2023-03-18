import { connectRPC } from "rpc";
import { svc } from "./src/global";
import { MODE, SERVICE_NAME } from "./src/types";
import { addExitCallback } from "catch-exit";
export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  await svc.init();

  await fn();

  if ((await connectRPC("base")).connected) {
    console.log("WARNING: SERVER ALREADY RUNNING");
  } else {
    addExitCallback(() => {
      svc.rpc.destroy();
    });
  }
};

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: { mode: MODE; ready: () => void }) => Promise<void>
) => {
  await fn({
    mode: "dev",
    ready() {
      console.log(`::RUNNING|${serviceName}::`);
    },
  });
};

export const root = {
  get service() {
    return svc.rpc;
  },
};
