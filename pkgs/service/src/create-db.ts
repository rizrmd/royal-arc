import { createService } from "./create-service";
import { SERVICE_NAME } from "./types";
import { existsAsync, readAsync } from "fs-jetpack";
import { dir } from "dir";
import { runner } from "bundler";
import chalk from "chalk";

export const createDB = (arg: { name: SERVICE_NAME; url: string }) => {
  const { name, url } = arg;
  createService(name, async ({ ready }) => {
    ready();
    if (url) {
      let shouldGenerateSchema = false;
      const schemaPath = dir.path(`${name}/prisma/schema.prisma`);
      if (!(await existsAsync(schemaPath))) {
        console.log(
          `🚩 DB schema not found: ${chalk.cyan(
            schemaPath.substring(dir.root().length + 1)
          )}`
        );
      } else {
        const schemaSrc = await readAsync(schemaPath, "utf8");
        shouldGenerateSchema = true;
      }

      if (shouldGenerateSchema) {
        await runner.run({
          path: "pnpm",
          args: ["prisma", "generate"],
          cwd: dir.path(name),
          onData(e) {
            process.stdout.write(e);
          },
        });
      }
    } else {
      console.log(
        `🚩 Database URL is empty: ${chalk.cyan(`app/${name}/main.ts`)}`
      );
    }
  });
};
