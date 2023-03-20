import { bundle, runner } from "bundler";
import { dir } from "dir";
import { action } from "../../../service/src/action";
import { RPCActionResult } from "rpc/src/types";
import { prepareDB } from "./service/db";
import { watchService } from "../watcher/watch-service";
import { watcher } from "bundler/src/watch";
import { prepareSrv } from "./service/srv";

const marker = {} as Record<string, true | Set<string>>;

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
              const mark = marker[name];

              if (mark) {
                if (mark instanceof Set) {
                  await prepare(name, mark);
                  delete marker[name];
                }

                await rpc.restart({ name: name as any });
              } else {
                marker[name] = true;
              }
            }
          }
        : undefined,
    }))
  ) {
    console.log(`build service ${name} failed`);
    return false;
  }

  await prepare(name);

  watchService(name, (err, changes) => {
    if (!err) {
      if (!err) {
        for (const c of changes) {
          if (c.type === "update") {
            console.log(c)
            if (!marker[name]) marker[name] = new Set();

            const mark = marker[name];
            if (mark) {
              if (mark instanceof Set) {
                mark.add(c.path);
              } else if (mark === true) {
                delete marker[name];
              }
            }
          } else {
          }
        }

        const deladd = changes.filter((e) => e.type !== "delete");
        if (deladd.length > 0) {
          prepare(name, new Set(deladd.map((e) => e.path)));
        }
      }
    }
  });

  return true;
};

const prepare = async (name: string, mark?: Set<string> | undefined) => {
  if (name.startsWith("db")) await prepareDB(name, mark);
  if (name.startsWith("srv")) await prepareSrv(name, mark);
};
