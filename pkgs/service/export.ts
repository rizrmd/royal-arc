import { svc } from "./src/global";
import {
  InitServiceResult,
  MODE,
  SERVICE_NAME,
  SERVICE_TYPE,
} from "./src/types";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  fn();
};

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (mode: MODE) => Promise<void>
) => {};

export const root = {
  service: svc.rpc,
};
