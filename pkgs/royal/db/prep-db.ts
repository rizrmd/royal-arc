import { stat } from "fs/promises";
import { join } from "path";
import { existsAsync, readAsync, removeAsync } from "service";
import { runPnpm } from "service/internal/service/build/run-pnpm";
import { defaultPrismaSrc } from "../scaff/create-db";

export const gdb = global as unknown as {
  prisma: any;
};

export const prepareDb = async (name: string) => {
  const cwd = join(process.cwd(), "service", name);
  const genpath = join(cwd, "node_modules", ".gen");
  const schema = join(cwd, "prisma", "schema.prisma");

  if (!(await existsAsync(genpath))) {
    if (!(await existsAsync(schema))) {
      throw new Error(
        `schema.prisma not found! ${schema}`,
      );
    }

    if (await readAsync(schema) === defaultPrismaSrc) {
      try {
        if ((await stat(join(cwd, "db.sqlite"))).size === 0) {
          await runPnpm(["prisma", "db", "push"], cwd);
        }
      } catch (e) {
        await runPnpm(["prisma", "db", "push"], cwd);
      }
    }

    await runPnpm(["prisma", "generate"], cwd);
  } else {
    try {
      if ((await stat(join(cwd, "db.sqlite"))).size === 0) {
        await runPnpm(["prisma", "db", "push"], cwd);
      }
    } catch (e) {
      await runPnpm(["prisma", "db", "push"], cwd);
    }

    const idxSrc = await readAsync(join(genpath, "index.js"));
    if (idxSrc === "export {}") {
      await removeAsync(genpath);
      await runPnpm(["prisma", "generate"], cwd);
    }
  }
};
