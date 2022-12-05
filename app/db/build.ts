import { declareBuild } from "../../pkgs/service";
import { preBuildDb } from "../../pkgs/royal";

declareBuild({
  preBuild() {
    preBuildDb(true);
  },
});
