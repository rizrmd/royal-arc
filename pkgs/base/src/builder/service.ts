import { bundle } from "bundler";
import { runner } from "bundler/runner";
import { dir } from "dir";
import { baseGlobal } from "../action";
import { prepareDB } from "./service/db";
import { prepareSrv } from "./service/srv";
import { prepareWeb } from "./service/web";

export const marker = {} as Record<string, "skip" | Set<string>>;

export const bundleService = async (name: string, arg: { watch: boolean }) => {
  const tstart = performance.now();

  await prepareBuild(name);

  await bundle({
    input: dir.root(`app/${name}/main.ts`),
    output: dir.root(`.output/app/${name}/index.js`),
    tstart,
    pkgjson: {
      input: dir.root(`app/${name}/package.json`),
      output: dir.root(`.output/app/${name}/package.json`),
    },
    watch: arg.watch
      ? async ({ isRebuild }) => {
          if (marker["*"]) return;

          if (isRebuild && runner.list[baseGlobal.app.output]) {
            const mark = marker[name];

            if (mark) {
              let shouldRestart = false;
              if (mark instanceof Set) {
                const res = await prepareBuild(name, mark);
                if (res) shouldRestart = res.shouldRestart;
                delete marker[name];
              } else if (mark === "skip") {
                delete marker[name];
                shouldRestart = false;
              }

              if (shouldRestart)
                await baseGlobal.rpc.service.restart({ name: name as any });
            }
          }
        }
      : undefined,
  });
};

const prepareBuild = async (name: string, mark?: Set<string> | undefined) => {
  if (name.startsWith("db")) return await prepareDB(name, mark);
  if (name.startsWith("srv")) return await prepareSrv(name, mark);
  if (name.startsWith("web")) return await prepareWeb(name, mark);
  return { shouldRestart: false };
};
