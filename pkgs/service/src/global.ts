import { globalize } from "dir";
import { createRPC } from "rpc";
import { RPCServerAction } from "rpc/src/types";
import { rootAction } from "./action";

export const svc = globalize({
  name: "svc",
  value: {
    rootRpc: null as unknown as RPCServerAction<typeof rootAction>,
    rpc: {} as Record<string, any>,
  },
  init: async (g) => {
    g.rootRpc = await createRPC("root", rootAction);
  },
});
