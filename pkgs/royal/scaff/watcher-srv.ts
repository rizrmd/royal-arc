import { watch } from "chokidar";
import { dirname, join } from "path";
import { scaffoldAPI } from "../srv/prebuild-api";

export const watcherSrv = (path: string) => {
  const w = watch([
    join(path, "api"),
  ], { ignoreInitial: true });

  const opt = {
    tout: null as any,
  };

  w.on("all", async (e, filePath) => {
    clearTimeout(opt.tout);
    opt.tout = setTimeout(() => {
      scaffoldAPI(dirname(path), join(path, "api"));
    }, 500);
  });
};
