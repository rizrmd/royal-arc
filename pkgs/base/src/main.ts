import { runner } from "bundler";
import { watcher } from "bundler/src/watch";
import { addExitCallback } from "catch-exit";
import chalk from "chalk";
import padEnd from "lodash.padend";
import { action as RootAction } from "../../service/src/action";
import { connectRPC, createRPC } from "rpc";
import { buildApp } from "./builder/app";
import { buildService } from "./builder/service";
import { commitHook } from "./commit-hook";
import { upgradeHook } from "./upgrade";
import { versionCheck } from "./version-check";
import { vscodeSettings } from "./vscode";
import { setupWatchers } from "./watcher/all";
import { existsAsync } from "fs-jetpack";
import { action, baseGlobal } from "./action";

export const baseMain = async () => {
  process.removeAllListeners("warning");
  vscodeSettings();

  const args = process.argv.slice(2);

  if (await commitHook(args)) return;
  if (await upgradeHook(args)) return;

  console.log(`── ${padEnd(chalk.yellow(`BASE`) + " ", 47, "─")}`);

  if (
    args.includes("build") ||
    args.includes("deploy") ||
    args.includes("prod") ||
    args.includes("staging")
  ) {
  } else {
    const onExit = async () => {
      await watcher.dispose();
    };
    addExitCallback(() => {});
    setupWatchers(args, onExit);

    await createRPC("base", action);
    const rootRPC = await connectRPC<typeof RootAction>("root", {
      waitConnection: false,
    });
    baseGlobal.rootRPC = rootRPC;

    const app = await buildApp({ watch: true });
    baseGlobal.app = app;

    let cacheFound = false;
    if (await existsAsync(app.path)) {
      console.log(`\n🌟 Running ${chalk.cyan(`cached`)} app`);
      await runner.run({
        path: app.path,
        cwd: app.cwd,
        runningMarker(e) {
          if (e.trim() === "::RUNNING::") return true;
          process.stdout.write(e);
          return false;
        },
      });
      cacheFound = true;
    }

    let bannerPrinted = false;
    const onDone = cacheFound
      ? (arg: { isRebuild: boolean }) => {
          if (!bannerPrinted) {
            console.log();
            console.log(
              `── ${padEnd(
                chalk.magenta(
                  arg.isRebuild ? `REBUILD` : `BUILD`
                ) + " ",
                47,
                "─"
              )}`
            );
            bannerPrinted = true;
          }
        }
      : undefined;

    await Promise.all([
      app.build(onDone),
      ...app.serviceNames.map(
        async (e) =>
          await buildService(e, { watch: true, app, rpc: rootRPC, onDone })
      ),
    ]);
    versionCheck({ timeout: 3000 });

    if (!cacheFound) {
      await runner.run({
        path: app.path,
        cwd: app.cwd,
        runningMarker(e) {
          if (e.trim() === "::RUNNING::") return true;
          process.stdout.write(e);
          return false;
        },
      });
    } else {
      console.log(`\n🌟 Running ${chalk.cyan(`latest`)} app`);
      await runner.restart(app.path);
    }
  }
};

baseMain();
