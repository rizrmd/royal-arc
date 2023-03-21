import { runner } from "bundler/runner";
import { watcher } from "bundler/watch";
import chalk from "chalk";
import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname, join } from "path";
import { pkg, scanDir } from "pkg";
import { connectRPC, createRPC } from "rpc";
import { action as RootAction } from "../../service/src/action";
import { action, baseGlobal } from "./action";
import { buildApp } from "./builder/app";
import { buildService } from "./builder/service";
import { commitHook } from "./commit-hook";
import { upgradeHook } from "./upgrade";
import { vscodeSettings } from "./vscode";
import { setupWatchers } from "./watcher/all";

export const baseMain = async () => {
  process.removeAllListeners("warning");
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

    const app = await buildApp({ watch: true });

    const onExit = async () => {
      await watcher.dispose();
      if (app) await runner.stop(app.path);
    };
    setupWatchers(args, onExit);

    baseGlobal.app = app;

    let cacheFound = false;

    await pkg.install(dir.root(), {
      cwd: dirname(dir.root()),
    });

    // if ((await existsAsync(app.path)) && !args.includes("nocache")) {
    //   console.log(`\n🌟 Running ${chalk.cyan(`cached`)} app\n`);
    //   await runner.run({
    //     path: app.path,
    //     cwd: app.cwd,
    //   });
    //   cacheFound = true;
    // }

    let bannerPrinted = false;
    const onDone = cacheFound
      ? (arg: { isRebuild: boolean }) => {
          if (!bannerPrinted) {
            if (cacheFound) {
              console.clear();
            }
            console.log(
              `── ${padEnd(
                chalk.magenta(arg.isRebuild ? `REBUILD` : `BUILD`) + " ",
                47,
                "─"
              )}`
            );
            bannerPrinted = true;
          }
        }
      : undefined;

    await app.build(onDone);
    for (const e of app.serviceNames) {
      await buildService(e, {
        watch: true,
        app,
        rpc: rootRPC,
        onDone,
        restart: onExit,
      });
    }
  }
};

baseMain();
