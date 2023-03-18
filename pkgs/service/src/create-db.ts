import { runner } from "bundler";
import chalk from "chalk";
import { dir } from "dir";
import { existsAsync } from "fs-jetpack";
import { createService } from "./create-service";
import { SERVICE_NAME } from "./types";

export const createDB = (arg: { name: SERVICE_NAME }) => {
  const { name } = arg;
  createService(name, async ({ ready }) => {
    ready();
    const schemaPath = dir.path(`${name}/prisma/schema.prisma`);
    if (!(await existsAsync(schemaPath))) {
      console.log(
        `🚩 DB schema not found: ${chalk.cyan(
          schemaPath.substring(dir.root().length + 1)
        )}`
      );
    } else {
      await runner.run({
        path: "pnpm",
        args: ["prisma", "generate"],
        cwd: dir.path(name),
        onData(e) {
          process.stdout.write(e);
        },
      });
    }
  });
};
