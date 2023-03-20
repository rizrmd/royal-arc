import { runner } from "bundler";
import chalk from "chalk";
import { dir } from "dir";
import { existsAsync } from "fs-jetpack";
import { createRPC } from "rpc";
import { createService } from "service";
import type PRISMA from "../../../../app/db/node_modules/.gen/index";
import { SERVICE_NAME } from "../../src/types";
import { dbAction } from "./action";
import { glbdb } from "./glbdb";

export const createDB = (arg: { name: SERVICE_NAME }) => {
  const { name } = arg;

  createService(name, async ({ enableStdout }) => {
    const prisma = (await import(
      dir.path(`${name}/node_modules/.gen/index.js`)
    )) as typeof PRISMA;

    glbdb.prisma = new prisma.PrismaClient();
    await glbdb.prisma.$connect();

    await createRPC(`svc.${name}`, dbAction);

    enableStdout();

    const schemaPath = dir.path(`${name}/prisma/schema.prisma`);
    if (!(await existsAsync(schemaPath))) {
      console.log(
        `🚩 DB schema not found: ${chalk.cyan(
          schemaPath.substring(dir.root().length + 1)
        )}`
      );
    } else {
      const genExists = await existsAsync(
        dir.path(`${name}/node_modules/.gen`)
      );
      let shouldGenerate = false;

      if (!genExists) {
        shouldGenerate = true;
      }

      if (shouldGenerate) {
        console.log(`Generating prisma: ${chalk.cyan(`${name}`)}`);
        await runner.run({
          path: "pnpm",
          args: ["prisma", "generate"],
          cwd: dir.path(name),
          onData(e) {
            process.stdout.write(e);
          },
        });
      }
    }
  });
};
