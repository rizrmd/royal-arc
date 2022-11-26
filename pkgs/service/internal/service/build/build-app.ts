import { build } from "esbuild";
import { join, sep } from "path";
import { dirAsync, readAsync, writeAsync } from "./jetpack";
import { resolveDeps } from "./resolve-deps";

export const buildApp = async (
  targetDir: string,
) => {
  const cwdsplit = process.cwd().split(sep);
  const root = (
    cwdsplit.includes(".output")
      ? cwdsplit.slice(0, cwdsplit.length - 2)
      : cwdsplit
  ).join(sep);
  const appDir = join(root, "app");
  await dirAsync(targetDir);

  const deps = await resolveDeps(appDir);

  for (let [k, v] of Object.entries(deps)) {
    if (v.startsWith(".") || v.startsWith("workspace:")) {
      delete deps[k];
    }
  }

  await writeAsync(join(targetDir, "package.json"), {
    name: "app",
    version: "1.0.0",
    dependencies: deps,
  });

  await build({
    bundle: true,
    logLevel: "silent",
    platform: "node",
    entryPoints: [join(appDir, "app.ts")],
    outfile: join(targetDir, "app.js"),
    external: Object.keys(deps),
  });

  const src = await readAsync(join(targetDir, "app.js"));

  await writeAsync(
    join(targetDir, "app.js"),
    `\
/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌  
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•  
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪  
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀ 
*/
const { existsSync } = require('fs')
const { join } = require('path')
if (!existsSync(join(process.cwd(), 'node_modules'))) {
  Bun.spawnSync({
    cmd: ['pnpm', 'i'],
    stdout: 'inherit',
    stderr: 'inherit',
  })
  console.log('Dependencies installed, please run "bun app.js"')
  process.exit(0)
}
if (process.argv0) {
  console.log('You should run app.js using bun, e.g: "bun app.js"')
  process.exit(0)
}
${src}`,
  );

  await writeAsync(
    join(targetDir, "pnpm-workspace.yaml"),
    `\
  packages:
    - "./service/**"

  `,
  );

  return join(targetDir, "app.js");
};
