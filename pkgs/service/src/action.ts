import { SERVICE_NAME } from "./types";
import { runner } from "bundler/runner";
import { dir } from "dir";
import chalk from "chalk";
import { svc } from "./global";
import { connectRPC } from "rpc";

export const rootAction = {
  async start(arg: { name: SERVICE_NAME; pid: string }) {
    const running = await runner.run({
      path: dir.path(`${arg.name}/index.js`),
      args: [arg.pid],
      cwd: dir.path(),
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
  async identify({
    name,
    pid,
    definition,
  }: {
    name: SERVICE_NAME;
    pid: string;
    definition: Record<string, "object" | "function" | "proxy">;
  }) {
    svc.definitions[`${name}.${pid}`] = definition;
    svc.rpc[`${name}.${pid}`] = await connectRPC(`${name}.${pid}`);
  },
};
