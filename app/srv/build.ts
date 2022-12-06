import { join } from "path";
import { preBuildSrv } from "royal";
import { declareBuild } from "service";

declareBuild({
  async preBuild() {
    await preBuildSrv();
  },
});
