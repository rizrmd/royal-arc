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

  const { build } = await import("esbuild");
  // const { commonjs } = await import("@hyrious/esbuild-plugin-commonjs");

  await build({
    bundle: true,
    logLevel: "silent",
    platform: "node",
    format: "cjs",
    entryPoints: [join(appDir, "app.ts")],
    outfile: join(targetDir, "app.js"),
    external: [...Object.keys(deps), "esbuild"],
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
const { existsSync } = require("fs");
const { join } = require("path");
const { spawnSync } = require("child_process");
if (!existsSync(join(process.cwd(), "node_modules"))) {
  spawnSync(
    /^win/.test(process.platform) ? "pnpm.cmd" : "pnpm",
    ["i"],
    {
      stdio: "inherit",
    },
  );
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
