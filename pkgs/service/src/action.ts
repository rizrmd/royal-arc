import { SERVICE_NAME } from "./types";
import { runner } from "bundler";
import { dir } from "dir";
import chalk from "chalk";

export const action = {
  start(arg: { name: SERVICE_NAME; multiInstance?: boolean }) {
    return new Promise<boolean>(async (resolve) => {
      const running = await runner.run({
        path: dir.path(`${arg.name}/index.js`),
        cwd: process.cwd(),
        onMessage(e: string) {
          if (e === `::RUNNING|${arg.name}::`) {
            resolve(running);
          }
        },
      });

      if (!running) {
        console.log(
          `${chalk.red(`Failed`)} to start ${chalk.cyan(
            arg.name
          )}: Service not found`
        );
      }
    });
  },
  async restart(arg: { name: SERVICE_NAME; pid?: string }) {
    return await runner.restart(dir.path(`${arg.name}/index.js`));
  },
};
