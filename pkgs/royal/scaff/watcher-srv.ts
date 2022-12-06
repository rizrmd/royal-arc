import { watch } from "chokidar";
import { basename, dirname, join } from "path";
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
      scaffoldAPI(basename(path), join(path, "api"), filePath);
    }, 500);
  });
};
