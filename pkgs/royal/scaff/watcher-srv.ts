import { watch } from "chokidar";
import { _names } from "gen";
import { basename, dirname, join } from "path";
import { root } from "service";
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
    opt.tout = setTimeout(async () => {
      if (e === "add" && filePath.endsWith(".ts")) {
        const name = basename(path) as _names;
        await scaffoldAPI(name, join(path, "api"), filePath);
        await root.boot.buildSvc(name, process.cwd());
        await root.service.stopAll(name, "Hot Reload");
      }
    }, 500);
  });
};
