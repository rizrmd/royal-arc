import { globalize } from "dir";
import { createRPC } from "rpc";
import { RPCServerAction } from "rpc/src/types";
import { rootAction } from "./action";

export const svc = globalize({
  name: "svc",
  value: {
    rpc: null as unknown as RPCServerAction<typeof rootAction>,
  },
  init: async (g) => {
    g.rpc = await createRPC("root", rootAction);
  },
});
