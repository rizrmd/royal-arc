import { bundle, runner } from "bundler";
import { dir } from "dir";
import { action } from "../../../service/src/action";
import { RPCActionResult } from "rpc/src/types";
import { prepareDB } from "./service/db";
import { watchDBService } from "../watcher/db-service";
import { watcher } from "bundler/src/watch";

export const buildService = async (
  name: string,
  arg: {
    onDone?: (arg: { isRebuild: boolean }) => void;
    watch: boolean;
    app: { path: string; cwd: string };
    rpc: RPCActionResult<typeof action>;
  }
) => {
  const app = arg.app;
  const rpc = arg.rpc;
  if (
    !(await bundle({
      incremental: true,
      input: dir.root(`app/${name}/main.ts`),
      output: dir.root(`.output/app/${name}/index.js`),
      pkgjson: dir.root(`.output/app/${name}/package.json`),
      pkgcwd: dir.root(".output/app"),
      printTimer: true,
      onBeforeDone: arg.onDone,
      watch: arg.watch
        ? async ({ isRebuild, installDeps }) => {
            if (installDeps) return;
            if (isRebuild && runner.list[app.path]) {
              const marker = watcher.marker[name];
              if (marker) {
                if (marker instanceof Set) {
                  if (name.startsWith("db")) await prepareDB(name, marker);
                  delete watcher.marker[name];
                }
              } else {
                watcher.marker[name] = true;
              }

              await rpc.restart({ name: name as any });
            }
          }
        : undefined,
    }))
  ) {
    console.log(`build service ${name} failed`);
    return false;
  }

  if (name.startsWith("db")) {
    await prepareDB(name);
    watchDBService(name);
  }

  return true;
};
