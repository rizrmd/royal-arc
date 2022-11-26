#!/usr/bin/env node
import { cleanupExpress, db, g, initExpress, SrvParams } from "royal";
import { current, declareService } from "service";
import { action } from "./action";
export default declareService<SrvParams>({
  name: "srv",
  hook: {
    onStart: async ({ restarted, params }) => {
      g.isRestarted = restarted;
      await initExpress(params);
    },
    onStop: () => {
      cleanupExpress(current);
    },
  },
  action,
});
    