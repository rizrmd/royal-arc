import { runner } from "bundler";
import chalk from "chalk";
import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
import { ensurePrisma } from "../../../../../pkgs/service/pkgs/service-db";
export const prepareDB = async (name: string, changes?: Set<string>) => {
  if (!changes || changes.has(dir.root(`app/${name}/main.ts`))) {
    const prisma = await ensurePrisma(name);

    if (!prisma.generated && !!prisma.dburl) {
      console.log(`Generating prisma: ${chalk.cyan(`app/${name}`)}`);
      await runner.run({
        path: "pnpm",
        args: ["prisma", "generate"],
        cwd: dir.root(`app/${name}`),
        onMessage(e) {},
      });

      // di delete biar digenerate sama runtime, supaya pake yg paling baru
      await removeAsync(`.output/app/${name}/node_modules/.gen`);
    }
  }
};
