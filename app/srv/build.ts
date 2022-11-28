import { declareBuild } from "service";
import { preBuildSrv } from "royal";

declareBuild({
  preBuild({ restarted }) {
    console.log(restarted);
    // preBuildSrv();
  },
});
