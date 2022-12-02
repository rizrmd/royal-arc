import { join } from "path";
import { scaffoldAPI } from "royal/srv/prebuild-api";
import { declareBuild } from "service";

declareBuild({
  async preBuild(p) {
    await scaffoldAPI("srv", join(process.cwd(), "api"));
  },
});
