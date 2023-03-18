import { globalize } from "dir";
import { createRPC } from "rpc";
import { RPCServerAction } from "rpc/src/types";
import { action } from "./action";

export const svc = globalize({
  name: "svc",
  value: {
    rpc: null as unknown as RPCServerAction<typeof action>,
  },
  init: async (g) => {
    g.rpc = await createRPC("root", action);
  },
});
