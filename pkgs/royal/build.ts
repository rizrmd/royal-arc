import { join } from "path";
import { declareBuild } from "service";
import { g } from "./global";
import { reloadWeb } from "./scaff/create-web";
import { initScaff } from "./scaff/init-scaff";

declareBuild({
  async preBuild(p) {
    g.root = join(process.cwd(), "..", "..");
    g.isPrebuild = true;
    if (p.argv.includes("prod")) {
      g.mode = "prod";
    } else if (p.argv.includes("staging")) {
      g.mode = "staging";
    } else {
      g.mode = "dev";
    }
    await reloadWeb();
  },
});
