import { runner } from "bundler";
import { watcher } from "bundler/src/watch";
import { addExitCallback } from "catch-exit";
import chalk from "chalk";
import padEnd from "lodash.padend";
import { action } from "../../service/src/action";
import { connectRPC } from "rpc";
import { buildApp } from "./builder/app";
import { buildService } from "./builder/service";
import { commitHook } from "./commit-hook";
import { upgradeHook } from "./upgrade";
import { versionCheck } from "./version-check";
import { vscodeSettings } from "./vscode";
import { setupWatchers } from "./watcher/all";

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
    versionCheck({ timeout: 3000 });

    const onExit = async () => {
      await watcher.dispose();
    };
    addExitCallback(() => {});
    setupWatchers(args, onExit);

    const rpc = await connectRPC<typeof action>("root");

    const app = await buildApp({ watch: true });
    await Promise.all(
      app.serviceNames.map(
        async (e) => await buildService(e, { watch: true, app, rpc })
      )
    );

    await runner.run({ path: app.path, cwd: app.cwd });
  }
};

baseMain();
