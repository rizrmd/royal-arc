import { RPCAction, RPCActionResult } from "./types";
import { Server } from "hyper-express";
import { configRPC } from "./config";
import getPort from "get-port";

export const createRPC = async <T extends RPCAction>(
  name: string,
  action: T
) => {
  const server = new Server();
  server.post("/", async (req, res) => {
    let body = req.json();
    res.json({ oke: "deh" });
  });

  if (!configRPC.ports[name]) {
    configRPC.ports[name] = await getPort();
  }
  server.listen(configRPC.ports[name], "localhost");

  return {} as RPCActionResult<T>;
};
