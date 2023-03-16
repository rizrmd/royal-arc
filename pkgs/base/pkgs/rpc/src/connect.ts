import { RPCAction, RPCActionResult } from "./types";

export const connectRPC = async <T extends RPCAction>(port: number) => {
  return {} as RPCActionResult<T>;
};
