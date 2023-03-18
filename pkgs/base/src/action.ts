import { SERVICE_TYPE } from "../../service/src/types";
import { action as RootAction } from "../../service/src/action";
import { RPCActionResult } from "rpc/src/types";
import { buildApp } from "./builder/app";
import { buildService } from "./builder/service";

export const baseGlobal = global as unknown as {
  rootRPC: RPCActionResult<typeof RootAction>;
  app: Awaited<ReturnType<typeof buildApp>>;
};

export const action = {
  rebuildService: async (name: SERVICE_TYPE): Promise<boolean> => {
    return await buildService(name, {
      watch: true,
      app: baseGlobal.app,
      rpc: baseGlobal.rootRPC,
    });
  },
};
