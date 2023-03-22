import { runner } from "bundler/runner";
import { watcher } from "bundler/watch";
import chalk from "chalk";
import { dir } from "dir";
import { existsAsync, removeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname, join } from "path";
import { pkg, scanDir } from "pkg";
import { connectRPC, createRPC } from "rpc";
import { action as RootAction } from "../../service/src/action";
import { action, baseGlobal } from "./action";
import { prepareApp } from "./scaffold/app";
import { bundleService } from "./builder/service";
import { attachCleanUp } from "./clean-up";
import { commitHook } from "./commit-hook";
import { upgradeHook } from "./upgrade";
import { versionCheck } from "./version-check";
import { vscodeSettings } from "./vscode";
import { setupWatchers } from "./watcher/all";
import { bundle } from "bundler";

export const baseMain = async () => {
  process.removeAllListeners("warning");
  attachCleanUp();
  vscodeSettings();

  const args = process.argv.slice(2);

  if (await commitHook(args)) return;
  if (await upgradeHook(args)) return;

  if (args.includes("clean")) {
    console.log("Cleaning node_modules");
    const dirs = await scanDir([dir.root()]);
    await removeAsync(dir.root(".output"));
    await Promise.all(
      dirs.map((e) => removeAsync(join(dirname(e), "node_modules")))
    );
    await removeAsync(dir.root("node_modules"));
    return;
  }

  console.log(`── ${padEnd(chalk.yellow(`BASE`) + " ", 47, "─")}`);

  if (
    args.includes("build") ||
    args.includes("deploy") ||
    args.includes("prod") ||
    args.includes("staging")
  ) {
  } else {
    await createRPC("base", action, { isMain: true });

    const rootRPC = await connectRPC<typeof RootAction>("root", {
      waitConnection: false,
    });
    baseGlobal.rootRPC = rootRPC;

    const app = await prepareApp();

    const onExit = async () => {
      await watcher.dispose();
      if (app) await runner.stop(app.output);
    };
    setupWatchers(args, onExit);

    baseGlobal.app = app;

    let cacheFound = false;

    // if ((await existsAsync(app.path)) && !args.includes("nocache")) {
    //   console.log(`\n🌟 Running ${chalk.cyan(`cached`)} app\n`);
    //   await runner.run({
    //     path: app.path,
    //     cwd: app.cwd,
    //   });
    //   cacheFound = true;
    // }

    await bundle({ input: app.input, output: app.output });
    for (const name of app.serviceNames) {
      await bundle({
        input: dir.root(`app/${name}/main.ts`),
        output: dir.root(`.output/app/${name}/index.js`),
        pkgjson: {
          input: dir.root(`app/${name}/package.json`),
          output: dir.root(`.output/app/${name}/package.json`),
        },
      });
    }

    versionCheck({ timeout: 3000 });

    if (!cacheFound) {
      console.log("");
      await runner.run({
        path: app.output,
        cwd: app.cwd,
      });
    } else {
      console.log(`\n🌟 Running ${chalk.cyan(`latest`)} app\n`);
      await runner.restart(app.output);
    }
  }
};

baseMain();
