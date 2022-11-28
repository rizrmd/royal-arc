import { watch } from "chokidar";
import { _path } from "gen";
import { dirname, join } from "path";
import { writeAsync } from "service";
import { g } from "../global";
import { scaffoldAPI } from "../srv/prebuild-api";

export const startAPIWatcher = () => {
  for (const [k, v] of Object.entries(_path)) {
    if (k.startsWith("srv")) {
      const srvName = dirname(v);
      const apiPath = join(process.cwd(), "..", "..", srvName, "api");
      g.watchers.push(
        watch(apiPath, { ignoreInitial: true }).on(
          "all",
          async (e, path, stat) => {
            let reset = false;
            if (e === "add" && path.endsWith(".ts")) {
              reset = true;
              const apiName = path.substring(
                apiPath.length + 1,
                path.length - 3,
              ).replace(/\W/ig, "_");
              await writeAsync(
                path,
                `\
import { apiContext } from "royal";
export const _ = {
  url: "/${apiName}",
  async api(name: string) {
    const ctx = apiContext(this);
    return { hello: name || "" };
  },
};
`,
              );
            }
            if (e === "unlink" && path.endsWith(".ts")) {
              reset = true;
            }

            if (reset) {
              await scaffoldAPI(srvName, process.cwd())
            }
          },
        ),
      );
    }
  }
};
