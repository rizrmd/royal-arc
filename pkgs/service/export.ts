import { svc } from "./src/global";
import { MODE, SERVICE_NAME } from "./src/types";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  await svc.init();

  fn();
};

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (mode: MODE) => Promise<void>
) => {
  fn('dev');
};

export const root = {
  get service() {
    return svc.rpc;
  },
};
