import { svc } from "./src/global";
import { InitServiceResult, MODE, SERVICE_TYPE } from "./src/types";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  fn();
};

export const initService = async (
  serviceType: SERVICE_TYPE,
  fn: (mode: MODE) => Promise<InitServiceResult>
) => {};

export const root = {
  service: svc.rpc,
};
