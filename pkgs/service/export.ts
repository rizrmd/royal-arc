import { svc } from "./src/global";
import { MODE, SERVICE_NAME } from "./src/types";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  await svc.init();

  await fn();
  console.log("::RUNNING::");
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
