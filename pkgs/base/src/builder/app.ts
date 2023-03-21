import { bundle } from "bundler/bundle";
import { runner } from "bundler/runner";
import { dir } from "dir";
import { existsSync, readdirSync, statSync } from "fs";
import { writeAsync } from "fs-jetpack";
import { serviceGen } from "../appgen/service";
import { marker } from "./service";

export const buildApp = async (opt: { watch: boolean }) => {
  await writeAsync(
    dir.path(".output/app/pnpm-workspace.yaml"),
    `\
packages:
  - ./*`
  );

  const dirs = readdirSync(dir.path("app"))
    .filter(
      (e) => !["node_modules", "app.ts", "package.json", "gen"].includes(e)
    )
    .map((e) => ({ name: e, stat: statSync(dir.path(`app/${e}`)) }))
    .filter(
      ({ stat, name }) =>
        stat.isDirectory() && existsSync(dir.path(`app/${name}/main.ts`))
    );

  await serviceGen();
  return {
    path: dir.root(".output/app/app.js"),
    cwd: dir.root(".output/app"),
    serviceNames: dirs.map((e) => e.name) as string[],
    async build(onDone?: (arg: { isRebuild: boolean }) => void) {
      const result = await bundle({
        incremental: true,
        input: dir.root("app/app.ts"),
        output: dir.root(".output/app/app.js"),
        pkgjson: {
          input: dir.root("app/package.json"),
          output: dir.root(".output/app/package.json"),
        },
        printTimer: true,
        onBeforeDone: onDone,
        async watch({ isRebuild }) {
          if (isRebuild && !marker["*"])
            await runner.restart(dir.root(".output/app/app.js"));
        },
      });

      if (!result) {
        console.log("build app failed");
      }
    },
  };
};
