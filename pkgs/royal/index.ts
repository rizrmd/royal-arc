#!/usr/bin/env node
import { join } from "path";
import { declareService } from "service";
import { action } from "./action";
import { boot } from "./boot";
import { deploy } from "./deploy/deploy";
import { getDeployKey } from "./deploy/key";
import { g } from "./global";

export default declareService({
  name: "royal",
  hook: {
    onStop: async () => {
    },
    onStart: async ({ argv, restarted, params }) => {
      g.root = join(process.cwd(), "..", "..");
      g.vite = {};

      g.mode = params.mode;
      g.execFromBase = argv.includes("base");

      g.serverName = "default";

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
