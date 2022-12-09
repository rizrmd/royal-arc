#!/usr/bin/env node
import { cleanupExpress, db, g, initServer, session, SrvParams } from "royal";
import { current, declareService } from "service";
import { action } from "./action";
import { DeployKey } from "../../config";
export default declareService<SrvParams>({
  name: "srv",
  hook: {
    onStart: async ({ restarted, params }) => {
      g.isRestarted = restarted;
      db._cache._init(g, "dbcache");
      session.init({ cookieKey: `royal-sid-${DeployKey.substring(30, 40)}` });
      await initServer(params);
    },
    onStop: () => {
      cleanupExpress(current);
    },
  },
  action,
});
