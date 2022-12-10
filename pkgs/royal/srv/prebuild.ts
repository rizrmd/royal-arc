import { _names, _path } from "gen";
import { existsAsync } from "service";
import { basename, join } from "path";
import { cwd } from "process";
import { g } from "../global";
import { generateApiIndex, scaffoldAPI } from "./prebuild-api";

export const preBuildSrv = async () => {
  const srvs = [] as string[];
  const svcname = basename(cwd());

  if (!g.mode) {
    for (let [_name, _] of Object.entries(_path)) {
      const name = _name as _names;
      if (name.startsWith("srv")) {
        srvs.push(name);
        const apipath = join(cwd(), "..", "..", "app", name, "api");

        if (
          svcname === name &&
          await existsAsync(apipath)
        ) {
          await scaffoldAPI(name, apipath);
        }
      }
    }

    await generateApiIndex(srvs, join(cwd(), "..", "..", "gen"));
  }
};
