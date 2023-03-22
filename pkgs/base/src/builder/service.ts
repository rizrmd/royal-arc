import { bundle } from "bundler";
import { runner } from "bundler/runner";
import { dir } from "dir";
import { basename } from "path";
import { pkg } from "pkg";
import { baseGlobal } from "../action";
import { watchService } from "../watcher/watch-service";
import { prepareDB } from "./service/db";
import { prepareSrv } from "./service/srv";
import { prepareWeb } from "./service/web";

export const marker = {} as Record<string, "skip" | Set<string>>;
 
export const bundleService = async (name: string, arg: { watch: boolean }) => {
  const tstart = performance.now();

  await prepareBuild(name);
  let shouldRestart = false;

  await bundle({
    input: dir.root(`app/${name}/main.ts`),
    output: dir.root(`.output/app/${name}/index.js`),
    tstart,
    pkgjson: {
      input: dir.root(`app/${name}/package.json`),
      output: dir.root(`.output/app/${name}/package.json`),
    },
    watch: arg.watch,
    event: arg.watch
      ? {
          async onStart({ isRebuild }) {
            shouldRestart = false;

            if (marker["*"]) return;

            if (isRebuild && runner.list[baseGlobal.app.output]) {
              const mark = marker[name];

              if (mark) {
                if (mark instanceof Set) {
                  const res = await prepareBuild(name, mark);
                  if (res) shouldRestart = res.shouldRestart;
                  delete marker[name];
                } else if (mark === "skip") {
                  delete marker[name];
                }
              }
            }
          },
          async onEnd({ isRebuild }) {
            if (isRebuild) {
              if (shouldRestart)
                await baseGlobal.rpc.service.restart({ name: name as any });
            }
          },
        }
      : undefined,
  });

  watchService(name, async (err, changes) => {
    if (!err) {
      for (const c of changes) {
        if (c.type === "update") {
          if (basename(c.path) === "package.json") {
            marker[name] = "skip";

            await pkg.install(c.path);
            await baseGlobal.rpc.service.restart({ name: name as any });
            return;
          }

          if (!marker[name]) marker[name] = new Set();

          const mark = marker[name];
          if (mark) {
            if (mark instanceof Set) {
              mark.add(c.path);
            }
          }
        }
      }

      const deladd = changes.filter((e) => e.type !== "update");
      if (deladd.length > 0) {
        marker[name] = "skip";
        await prepareBuild(name, new Set(deladd.map((e) => e.path)));
        await baseGlobal.rpc.service.restart({ name: name as any });

        setTimeout(() => {
          baseGlobal.rpc.service.restart({ name: name as any });
        }, 500);
      }
    }
  });
};

const prepareBuild = async (name: string, mark?: Set<string> | undefined) => {
  if (name.startsWith("db")) return await prepareDB(name, mark);
  if (name.startsWith("srv")) return await prepareSrv(name, mark);
  if (name.startsWith("web")) return await prepareWeb(name, mark);
  return { shouldRestart: false };
};
