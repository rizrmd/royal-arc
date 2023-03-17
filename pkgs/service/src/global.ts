import { globalize } from "dir";
import { createRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { action } from "./action";

export const svc = globalize(
  "svc",
  {
    rpc: null as unknown as RPCActionResult<typeof action>,
  },
  async (g) => {
    console.log("init global");
    g.rpc = await createRPC("root", action);
  }
);
