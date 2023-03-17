import { svc } from "./src/global";
import { MODE, SERVICE_NAME } from "./src/types";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  console.log("initialize");
  fn();
};

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (mode: MODE) => Promise<void>
) => {};

export const root = {
  service: svc.rpc,
};
