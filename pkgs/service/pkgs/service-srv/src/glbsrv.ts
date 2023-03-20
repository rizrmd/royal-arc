import { globalize } from "dir";
import { Server } from "hyper-express";
import { connectRPC } from "rpc";
import { SERVICE_NAME } from "../../../src/types";
import { dbs } from "../../service-db";

export const srv = globalize({
  name: "srv",
  value: {
    name: "" as SERVICE_NAME,
    server: Server,
    port: 0,
    serverURL: "",
    cookieKey: "",
    rpc: {
      db: null as unknown as ReturnType<typeof dbs>,
    },
  },
  async init() {
    srv.rpc.db = dbs(await connectRPC("svc.db"));
    (global as any).db = srv.rpc.db;
  },
});

declare global {
  const db: ReturnType<typeof dbs>;
}
