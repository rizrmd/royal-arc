import chalk from "chalk";
import padEnd from "lodash.padend";
import { commitHook } from "./commit-hook";
import { upgradeHook } from "./upgrade";
import { vscodeSettings } from "./vscode";

export const baseMain = async () => {
  await vscodeSettings();

  const args = process.argv.slice(2);

  if (await commitHook(args)) return;
  if (await upgradeHook(args)) return;

  console.log(`── ${padEnd(chalk.yellow(`BASE`) + " ", 47, "─")}`);
};
