import { bundle } from "bundler";
import { runner } from "bundler/runner";
import { watcher } from "bundler/watch";
import chalk from "chalk";
import { dir } from "dir";
import { existsAsync, removeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname, join } from "path";
import { scanDir } from "pkg";
import { connectRPC, createRPC } from "rpc";
import { action as RootAction } from "../../service/src/action";
import { action, baseGlobal } from "./action";
import { bundleService } from "./builder/service";
import { attachCleanUp } from "./cleanup";
import { commitHook } from "./commit-hook";
import { prepareApp } from "./scaffold/app";
import { upgradeHook } from "./upgrade";
import { versionCheck } from "./version-check";
import { vscodeSettings } from "./vscode";
import { setupWatchers } from "./watcher/all";

const args = process.argv.slice(2);

export const baseMain = async () => {
  process.removeAllListeners("warning");
  attachCleanUp();
  vscodeSettings();

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

    baseGlobal.rpc = {
      service: await connectRPC<typeof RootAction>("root", {
        waitConnection: false,
      }),
    };

    const app = await prepareApp();

    const onExit = async () => {
      await watcher.dispose();
      if (app) await runner.stop(app.output);
    };
    setupWatchers(args, onExit);

    baseGlobal.app = app;

    let cacheFound = false;
    // if (await runCached()) {
    //   cacheFound = true;
    // }

    await bundle({
      input: app.input,
      output: app.output,
      pkgjson: {
        input: dir.root("app/package.json"),
        output: dir.root(".output/app/package.json"),
      },
    });

    await Promise.all(
      app.serviceNames.map(async (e) => await bundleService(e, { watch: true }))
    );

    versionCheck({ timeout: 3000 });

    if (!cacheFound) {
      console.log("");
      // await runner.run({
      //   path: app.output,
      //   cwd: app.cwd,
      // });
      setTimeout(() => {}, 9900000);
    } else {
      console.log(`\n🌟 Running ${chalk.cyan(`latest`)} app\n`);
      await runner.restart(app.output);
    }
  }
};

const runCached = async () => {
  const app = baseGlobal.app;
  if ((await existsAsync(app.output)) && !args.includes("nocache")) {
    console.log(`\n🌟 Running ${chalk.cyan(`cached`)} app\n`);
    await runner.run({
      path: app.output,
      cwd: app.cwd,
    });
    return true;
  }
  return false;
};

baseMain();
