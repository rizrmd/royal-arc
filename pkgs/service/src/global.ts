import { globalize } from "dir";
import { createRPC } from "rpc";
import { action } from "./action";

export const svc = globalize("svc", {
  rpc: createRPC("root.svc", action),
});
