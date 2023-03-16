import { RPCAction } from "./types";
import { Server } from "hyper-express";

export const createRPC = (name: string, action: RPCAction) => {
  const server = new Server();
  server.post("/", async (req, res) => {
    let body = req.json();
    res.json({ oke: "deh" });
  });
  // server.listen(port, "localhost");
};
