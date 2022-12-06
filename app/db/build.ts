import { join } from "path";
import { preBuildDb } from "../../pkgs/royal";
import { declareBuild } from "../../pkgs/service";

declareBuild({
  preBuild() {
    preBuildDb();
  },
});
