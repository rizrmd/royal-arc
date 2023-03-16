import { RPCAction, RPCActionResult } from "./types";

export const connectRPC = async <T extends RPCAction>(name: string) => {
  return {} as RPCActionResult<T>;
};
