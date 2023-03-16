import { svc } from "./src/global";
import { SERVICE_NAME, SERVICE_TYPE } from "./src/types";

export const initialize = async (fn: () => Promise<void>) => {
  process.removeAllListeners("warning");

  fn();
};

export const initService = async (
  serviceType: SERVICE_TYPE,
  fn: (
    mode: "dev" | "prod" | "staging"
  ) => Promise<Record<string, any> & { name: SERVICE_NAME }>
) => {};

export const root = {
  service: svc.rpc,
};
