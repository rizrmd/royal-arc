import { SERVICE_NAME } from "./types";
import { runner } from "bundler";
import { dir } from "dir";
import chalk from "chalk";

export const action = {
  async start(arg: { name: SERVICE_NAME; multiInstance?: boolean }) {
    const running = await runner.run({
      path: dir.path(`${arg.name}/index.js`),
      cwd: process.cwd(),
      onMessage(stdout) {
        if (stdout.trim() === `::RUNNING|${arg.name}::`) return true;
        return false;
      },
    });

    if (!running) {
      console.log(
        `${chalk.red(`Failed`)} to start ${chalk.cyan(
          arg.name
        )}: Service not found`
      );
    }

    return running;
  },
  async restart(arg: { name: SERVICE_NAME; pid?: string }) {
    return await runner.restart(dir.path(`${arg.name}/index.js`));
  },
};
