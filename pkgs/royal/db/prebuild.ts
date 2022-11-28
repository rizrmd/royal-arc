import { stat } from "fs/promises";
import { _path } from "gen";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import {
  copyAsync,
  existsAsync,
  readAsync,
  removeAsync,
  writeAsync,
} from "service";
import { runPnpm } from "service/internal/service/build/run-pnpm";
import { defaultPrismaSrc } from "service/scaff/create-db";
import { isDirectory } from "service/scaff/util/is-directory";

export const preBuildDb = async () => {
  const name = basename(__dirname);
  const mtimeFile = join(__dirname, "mtime.json");
  const mtime = ((await readAsync(mtimeFile, "json")) || {}) as Record<
    string,
    number
  >;
  const root = join(cwd(), "..", "..");
  const base = join(root, dirname(_path[name]));
  const appdir = join(root, "app", name);
  const prisma = { im: [] as string[], ex: [] as string[] };

  if (await isDirectory(appdir)) {
    const nodemod = join(appdir, "node_modules");
    if (!await existsAsync(nodemod)) {
      await runPnpm(["i"], root);
    }

    const genindex = (join(nodemod, ".gen", "index.js"));
    if (!await existsAsync(genindex)) {
      await removeAsync(dirname(genindex));
      await runPnpm(["prisma", "generate"], appdir);
    }

    const dbname = name.replace(/\W/gi, "_");
    const path = dirname(_path[name]);
    prisma.im.push(
      `import type { PrismaClient as _${dbname} } from '../${path}/node_modules/.gen'`,
    );
    const epath = dirname(_path[name]);
    prisma.ex.push(
      `  "${dbname}": { path: "${epath}" } as unknown as _${dbname},`,
    );
  }

  await writeAsync(
    join(root, "gen", "prisma.ts"),
    prisma.im.join("\n") +
      `

export const prisma = {
${prisma.ex.join(",\n")}
}
`,
  );

  const files = [["prisma", "schema.prisma"], [".env"]];
  let prismaGen = false;

  for (const file of files) {
    const fname = join(...file);
    const fromFile = join(base, ...file);
    const toFile = join(__dirname, ...file);
    try {
      const s = await stat(fromFile);
      if (mtime[fname] !== s.mtimeMs) {
        mtime[fname] = s.mtimeMs;
        await copyAsync(fromFile, toFile, { overwrite: true });
        prismaGen = true;
      }
    } catch (_) {
    }
  }
  if (prismaGen) {
    await writeAsync(mtimeFile, mtime);

    const schema = join(__dirname, "prisma", "schema.prisma");
    const sqdb = join(__dirname, "db.sqlite");
    const prismaSrc = await readAsync(schema);
    if (prismaSrc === defaultPrismaSrc) {
      if (!await existsAsync(sqdb)) {
        await runPnpm(["prisma", "db", "push"], __dirname);
      }
    }
    runPnpm(["prisma", "generate"], __dirname);
  }
};
