import { watch } from "chokidar";
import { _names, _path } from "gen";
import { dirname, join } from "path";
import { root } from "service";
import { g } from "../global";
import { scaffoldAPI } from "../srv/prebuild-api";

export const startAPIWatcher = () => {
  for (const [k, v] of Object.entries(_path)) {
    if (k.startsWith("srv")) {
      const apiPath = join(process.cwd(), "..", "..", dirname(v), "api");
      g.watchers.push(
        watch(apiPath, { ignoreInitial: true }).on("all", async () => {
          await scaffoldAPI(k, apiPath);
          await root.boot.buildSvc(
            k as _names,
            process.cwd(),
          );
        }),
      );
    }
  }
};
