import { runner } from "bundler";
import { dir } from "dir";
import { existsAsync } from "fs-jetpack";

export const prepareDB = async (name: string, changes?: Set<string>) => {
  if (!changes || changes.has(dir.root(`app/${name}/main.ts`))) {
    await prepareSchema(name);
  }
};

const prepareSchema = async (name: string) => {
  console.log("prepare schema");
  if (!(await existsAsync(dir.root(`app/${name}/prisma/schema.prisma`)))) {
    console.log(`🗄️ Generating schema.prisma`);
    const res = await runner.run({
      cwd: dir.root(`app/${name}`),
      path: "pnpm",
      args: ["prisma", "init"],
      onData(e) {},
    });
  }
};
