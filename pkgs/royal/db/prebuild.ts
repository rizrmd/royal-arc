import { stat } from "fs/promises";
import { _path } from "gen";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import {
  copyAsync,
  dirAsync,
  existsAsync,
  readAsync,
  removeAsync,
  writeAsync,
} from "service";
import { runPnpm } from "service/internal/service/build/run-pnpm";
import { defaultPrismaSrc } from "../scaff/create-db";
import { isDirectory } from "../scaff/util/is-directory";

export const preBuildDb = async () => {
  const name = basename(cwd());
  const mtimeFile = join(cwd(), "mtime.json");
  const mtime = ((await readAsync(mtimeFile, "json")) || {}) as Record<
    string,
    number
  >;

  const root = join(cwd(), "..", "..");
  const base = join(root, dirname(_path[name]));
  const appdir = join(root, "app", name);
  const outdir = join(root, ".output", "app", "service", name);
  const prisma = { im: [] as string[], ex: [] as string[] };

  if (await isDirectory(appdir)) {
    const nodemod = join(appdir, "node_modules");
    if (!await existsAsync(nodemod)) {
      await runPnpm(["i"], root);
    }

    const genpkg = (join(nodemod, ".gen", "package.json"));

    const genindex = (join(nodemod, ".gen", "index.js"));
    if (!await existsAsync(genindex)) {
      await removeAsync(dirname(genindex));
      await runPnpm(["prisma", "generate"], appdir);
    }

    if (await existsAsync(genpkg)) {
      const pkg = await readAsync(genpkg, "json");
      if (pkg && pkg.name !== "prisma-gen") {
        pkg.name = "prisma-gen";
        await writeAsync(genpkg, pkg);
      }
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

  await dirAsync(join(outdir, "prisma"));

  const appschema = await readAsync(
    join(appdir, "prisma", "schema.prisma"),
  );
  let outschema = "";
  let generateSchema = false;

  if (!await existsAsync(join(outdir, "prisma"))) {
    await copyAsync(join(appdir, "prisma"), join(outdir, "prisma"), {
      overwrite: true,
    });
    outschema = appschema;
    await runPnpm(["prisma", "generate"], outdir, { silent: false });
  } else {
    outschema = await readAsync(
      join(outdir, "prisma", "schema.prisma"),
    );
  }

  if (outschema && outschema.indexOf("file:../db.sqlite") >= 0) {
    if (!await existsAsync(join(outdir, "db.sqlite"))) {
      generateSchema = true;

      await runPnpm(["prisma", "db", "push"], outdir, { silent: false });
    }
  }

  if (appschema !== outschema) {
    await copyAsync(join(appdir, "prisma"), join(outdir, "prisma"), {
      overwrite: true,
    });

    generateSchema = true;
  }

  if (generateSchema) {
    await runPnpm(["prisma", "generate"], outdir, { silent: false });
  }
  if (await existsAsync(join(appdir, ".env"))) {
    await copyAsync(join(appdir, ".env"), join(outdir, ".env"), {
      overwrite: true,
    });
  }
};
