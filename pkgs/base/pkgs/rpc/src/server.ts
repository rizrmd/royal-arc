import { RPCAction } from "./types";
import { Server } from "hyper-express";

export const startRPC = (port: number, action: RPCAction) => {
  const server = new Server();
  server.post("/", async (req, res) => {
    let body = req.json();
    res.json({ oke: "deh" });
  });
  server.listen(port, "localhost");
};
