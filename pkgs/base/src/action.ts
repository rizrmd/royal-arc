import { SERVICE_TYPE } from "../../service/src/types";
import { rootAction as ServiceAction } from "../../service/src/action";
import { RPCActionResult } from "rpc/src/types";
import { prepareApp } from "./scaffold/app";
import { bundleService } from "./builder/service";

export const baseGlobal = global as unknown as {
  rpc: { service: RPCActionResult<typeof ServiceAction> };
  app: Awaited<ReturnType<typeof prepareApp>>;
};

export const action = {
  rebuildService: async (name: SERVICE_TYPE) => {
    return await bundleService(name, {
      watch: true,
    });
  },
};
