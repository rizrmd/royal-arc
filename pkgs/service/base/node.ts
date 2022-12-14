import { spawn } from "child_process";
import { stat } from "fs/promises";
import capitalize from "lodash.capitalize";
import { join } from "path";
import picocolors from "picocolors";
import {
  dirAsync,
  existsAsync,
  listAsync,
  readAsync,
  removeAsync,
} from "../export";
import { buildApp } from "../internal/service/build/build-app";
import { resolveDeps } from "../internal/service/build/resolve-deps";
import { runPnpm } from "../internal/service/build/run-pnpm";
import { generateMeta } from "../internal/service/gen-meta";
import { isRoyalLatest } from "./is-royal-latest";
import { baseUpgrade } from "./upgrade";
import { isEqual } from "./util/is-equal";
import { scaff } from "./util/scaff";

let lastRestart = new Date().getTime();

const main = async () => {
  await removeAsync(join(process.cwd(), "gen"));
  let shouldInstallDep = false;

  try {
    isRoyalLatest();
  } catch (e) {}

  await scaff(
    {
      "package.json": {
        name: "gen",
        version: "0.0.1",
        main: "service.ts",
      },
      "service.ts": `\
  /******************************************************/
  /************* autogenerated - do not edit ************/
  /******************************************************/
  export type _names = "royal";
  export const _path = {
    "royal": "pkgs/royal/index.ts",
  };
  export const _runtime = {
    "royal": "node"
  };
  `,
      "action.ts": `\
  /******************************************************/
  /************* autogenerated - do not edit ************/
  /******************************************************/
  export { action as royal } from "../pkgs/royal/action";
  `,
    },
    join(process.cwd(), "gen")
  );
  await generateMeta(join(process.cwd()));

  if (!(await existsAsync(join(process.cwd(), "node_modules")))) {
    shouldInstallDep = true;
  }

  const args = process.argv.slice(2);

  if (args.includes("deploy")) {
    await removeAsync(join(process.cwd(), ".output", "deploy"));
    await removeAsync(join(process.cwd(), ".output", "deploy.zip"));
  }

  if (args.includes("upgrade")) {
    await baseUpgrade();
    return;
  }

  if (args.length === 0) {
    args.push("debug");
  }

  if (shouldInstallDep) {
    await installDep();
  }

  const { commonjs } = await import("@hyrious/esbuild-plugin-commonjs");
  const appcwd = join(process.cwd(), ".output", "app");

  let printPreBuild = false;
  for (const dir of ["app", "pkgs"].map((e) => join(process.cwd(), e))) {
    const list = await listAsync(dir);
    if (list) {
      for (const item of list) {
        const svcDir = join(dir, item);
        const buildTs = join(dir, item, "build.ts");

        if ((await stat(svcDir)).isDirectory()) {
          if (await existsAsync(buildTs)) {
            if (!printPreBuild) {
              printPreBuild = true;
              process.stdout.write(picocolors.gray(`PreBuild: `));
            }
            process.stdout.write(picocolors.gray(`${capitalize(item)} `));
            await runPnpm(["jiti", "build.ts", "preBuild", ...args], svcDir, {
              silent: false,
            });
          }
        }
      }
    }
  }

  await dirAsync(appcwd);

  const start = async () => {
    const pkgjson = await readAsync(
      join(process.cwd(), ".output", "app", "package.json"),
      "json"
    );
    const ndeps = await resolveDeps(join(process.cwd(), "app"));

    await buildApp(join(process.cwd(), ".output", "app"));

    if (!pkgjson || (pkgjson && !isEqual(pkgjson.dependencies, ndeps))) {
      await runPnpm(["i"], join(process.cwd(), ".output", "app"));
    }

    const res = spawn(
      process.execPath,
      [
        "--enable-source-maps",
        "--no-warnings",
        join(process.cwd(), ".output", "app", "app.js"),
        "base",
        ...args,
      ].filter((e) => e),
      {
        stdio: "inherit",
        cwd: appcwd,
      }
    );

    res.on("exit", (code) => {
      const time = new Date().getTime();
      if (code !== 111) {
        if (time - lastRestart < 2000) return;
        if (code === 222 || code === 55) {
          return;
        }
      }
      start();
      lastRestart = time;
    });
  };

  start();
};

const installDep = () => {
  return new Promise<string>((resolve) => {
    console.log("Installing project dependency");

    runPnpm(["i"], process.cwd()).then(resolve);
  });
};

main();
