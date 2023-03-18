import { runner } from "bundler";
import { dir } from "dir";
import { copyAsync, existsAsync } from "fs-jetpack";

export const prepareDB = async (name: string, changes?: Set<string>) => {
  if (!changes || changes.has(dir.root(`app/${name}/main.ts`))) {
    await prepareSchema(name);
  }
};

const prepareSchema = async (name: string) => {
  if (await existsAsync(dir.root(`app/${name}/prisma/schema.prisma`))) {
    await runner.run({
      path: "pnpm",
      args: ["prisma", "generate"],
      cwd: dir.root(`app/${name}`),
      onData(e) {},
    });

    await copyAsync(
      dir.root(`app/${name}/prisma`),
      dir.root(`.output/app/${name}/prisma`),
      { overwrite: true }
    );

    if (await existsAsync(dir.root(`app/${name}/.env`))) {
      await copyAsync(
        dir.root(`app/${name}/.env`),
        dir.root(`.output/app/${name}/.env`),
        { overwrite: true }
      );
    }
  }
};
