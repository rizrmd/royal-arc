#!/usr/bin/env node
import { join } from "path";
import { declareService } from "service";
import { action } from "./action";
import { boot } from "./boot";
import { deploy } from "./deploy/deploy";
import { getDeployKey } from "./deploy/key";
import { g } from "./global";
import { stopAllWatcher } from "./scaff/cleanup";
import { viteBuild } from "./web/build";

export default declareService({
  name: "royal",
  hook: {
    onStop: async () => {
      await stopAllWatcher();
    },
    onStart: async ({ argv, restarted, params, metafile }) => {
      g.root = join(process.cwd(), "..", "..");
      g.vite = {};
      g.watchers = [];

      g.mode = params.mode;
      g.execFromBase = argv.includes("base");

      g.serverName = "default";
      g.watchers = [];

      g.deployKey = await getDeployKey();

      g.config = await (await import("../../config")).default;
      g.isRestarted = restarted;

      if (argv.includes("deploy")) {
        await deploy();
      } else {
        boot();
      }
    },
  },
  action,
});
