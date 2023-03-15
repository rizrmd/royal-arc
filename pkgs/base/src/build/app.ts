import { dir } from "dir";
import { existsSync, readdirSync, statSync } from "fs";
import { writeAsync } from "fs-jetpack";

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

  return { serviceNames: dirs.map((e) => e.name) as string[] };
};
