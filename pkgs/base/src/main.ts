import { watcher } from "bundler/src/watch";
import { addExitCallback } from "catch-exit";
import chalk from "chalk";
import { dir } from "dir";
import padEnd from "lodash.padend";
import { buildApp } from "./builder/app";
import { buildService } from "./builder/service";
import { commitHook } from "./commit-hook";
import { upgradeHook } from "./upgrade";
import { versionCheck } from "./version-check";
import { vscodeSettings } from "./vscode";
import { scaffoldServiceOnNewDir } from "./watcher/service";

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
 
    if (args.includes("devbase")) {
      watcher.watch({
        dir: dir.root("pkgs/base"),
        ignore: ["pkgs", "node_modules"],
        event: async (err, ev) => {
          if (!err) {
            await onExit();
            process.exit();
          }
        },
      });
    }

    const app = await buildApp({ watch: true });
    await Promise.all(app.serviceNames.map(buildService));

    scaffoldServiceOnNewDir();
  }
};

baseMain();
