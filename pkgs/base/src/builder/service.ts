import { bundle } from "bundler";
import { runner } from "bundler/runner";
import { dir } from "dir";
import { RPCActionResult } from "rpc/src/types";
import { action } from "../../../service/src/action";
import { watchService } from "../watcher/watch-service";
import { prepareDB } from "./service/db";
import { prepareSrv } from "./service/srv";

export const marker = {} as Record<string, true | Set<string>>;

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
            if (installDeps || marker["*"]) return;

            if (isRebuild && runner.list[app.path]) {
              const mark = marker[name];

              if (mark) {
                let shouldRestart = false;
                if (mark instanceof Set) {
                  const res = await afterBuild(name, mark);
                  shouldRestart = res.shouldRestart;
                  delete marker[name];
                }

                if (shouldRestart) await rpc.restart({ name: name as any });
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

  await afterBuild(name);

  watchService(name, async (err, changes) => {
    if (!err) {
      if (!err) {
        for (const c of changes) {
          if (c.type === "update") {
            if (!marker[name]) marker[name] = new Set();

            const mark = marker[name];
            if (mark) {
              if (mark instanceof Set) {
                mark.add(c.path);
              } else if (mark === true) {
                marker[name] = new Set([c.path]);
              }
            }
          } else {
          }
        }

        const deladd = changes.filter((e) => e.type !== "delete");
        if (deladd.length > 0) {
          const res = await afterBuild(
            name,
            new Set(deladd.map((e) => e.path))
          );

          if (res.shouldRestart) await rpc.restart({ name: name as any });
        }
      }
    }
  });

  return true;
};

const afterBuild = async (name: string, mark?: Set<string> | undefined) => {
  if (name.startsWith("db")) return await prepareDB(name, mark);
  if (name.startsWith("srv")) return await prepareSrv(name, mark);
  return { shouldRestart: false };
};
