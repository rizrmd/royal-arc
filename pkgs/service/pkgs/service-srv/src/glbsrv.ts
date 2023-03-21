import { globalize } from "dir";
import { Server } from "hyper-express";
import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { SERVICE_NAME } from "../../../src/types";
import { dbs } from "../../service-db";
import { dbAction } from "../../service-db/src/action";

export const srv = globalize({
  name: "srv",
  value: {
    name: "" as SERVICE_NAME,
    server: Server,
    port: 0,
    serverURL: "",
    cookieKey: "",
    rpc: {
      db: null as unknown as RPCActionResult<typeof dbAction> & {
        connected: boolean;
      },
    },
  },
  async init() {
    srv.rpc.db = await connectRPC("svc.db");
    (global as any).db = dbs(srv.rpc.db);
  },
});

declare global {
  const db: ReturnType<typeof dbs>;
}
