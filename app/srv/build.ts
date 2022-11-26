import { declareBuild } from "service";
import { preBuildSrv } from "royal";

declareBuild({
  preBuild() {
    preBuildSrv();
  },
});
