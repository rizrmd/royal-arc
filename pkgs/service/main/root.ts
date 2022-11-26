import { rootAction, rootBoot, rootService } from "../internal/rpc/action-rpc";
import { rpcSender } from "../internal/rpc/client";
import { createJsonRpcClient } from "../internal/rpc/typed-rpc";

export const root = {
  boot: createJsonRpcClient<typeof rootBoot>(rpcSender("boot")),
  service: createJsonRpcClient<typeof rootService>(rpcSender("service")),
  action: rootAction(rpcSender("service")),
};
