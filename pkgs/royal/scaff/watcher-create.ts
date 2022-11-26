import { watch } from "chokidar";
import { basename, join } from "path";
import { green } from "picocolors";
import { listAsync, root } from "service";
import { runPnpm } from "service/internal/service/build/run-pnpm";
import { g } from "../global";
import { createNewDB } from "./create-db";
import { createNewSrv } from "./create-srv";
import { createNewSvc } from "./create-svc";
import { createNewWeb } from "./create-web";
import { isDirectory } from "./util/is-directory";
const excludes = ["boot", "royal", "service", "service"];

const status = {
  creating: false,
};

export const startCreateWatcher = async () => {
  const dir = ["app", "pkgs"];
  for (const d of dir) {
    for (const f of (await listAsync(join(g.root, d))) || []) {
      const path = join(g.root, d, f);
      if (
        f !== "node_modules" &&
        !f.startsWith(".") &&
        !f.startsWith("workspace:") &&
        !excludes.includes(f) &&
        (await isDirectory(path))
      ) {
        const files = (await listAsync(path)) || [];
        if (files.length === 0) {
          createNew(f, path);
        }
      }
    }
  }
  const w = watch(
    dir.map((e) => join(g.root, e)),
    { ignoreInitial: true, depth: 0 },
  );
  w.on("addDir", (path) => {
    const f = basename(path);
    createNew(f, path);
  });
  w.on("unlinkDir", async (p) => {
    await root.boot.stop();
  });
  g.watchers.push(w);
};

const createNew = async (f: string, path: string) => {
  if (status.creating) {
    return;
  }
  status.creating = true;
  const name = basename(path);

  console.log("Creating service:", green(f));

  if (f.startsWith("web")) {
    await createNewWeb(path);
    return;
  } else if (f.startsWith("db")) {
    await createNewDB(path);
    await runPnpm(["i", "prisma"], path);
    await runPnpm(["prisma", "generate"], path);
    await root.boot.genMeta();
  } else {
    if (f.startsWith("srv")) {
      await createNewSrv(path);
    } else {
      await createNewSvc(path);
    }
    await runPnpm(["i"], path);
    console.log(`Service ${name} created.`);

    await root.boot.genMeta();
  }
  process.exit(111);
};
