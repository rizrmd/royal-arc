import { watch } from "chokidar";
import { basename, join } from "path";
import { g } from "../global";
import { createNewWeb, reloadWeb } from "./create-web";
import picocolors from "picocolors";
import { createNewDB } from "./create-db";
import { runPnpm } from "service/internal/service/build/run-pnpm";
import { root } from "service";
import { createNewSrv } from "./create-srv";
import { createNewSvc } from "./create-svc";
import { watcherAttach } from "./watcher-attach";

const status = {
  creating: false,
};

export const watcherCreate = async () => {
  if (g.watcher.create) {
    await g.watcher.create.close();
  }
  const dir = ["app", "pkgs"];
  const w = watch(
    dir.map((e) => join(g.root, e)),
    { ignoreInitial: true, depth: 0 },
  );
  w.on("addDir", async (path) => {
    await createNew(path);
    await reloadWeb();
    process.exit(111);
  });
  w.on("unlinkDir", async (p) => {
    await root.boot.stop();
  });
  g.watcher.create = w;
};

export const createNew = async (path: string) => {
  if (status.creating) {
    return;
  }
  status.creating = true;
  const name = basename(path);

  console.log("Creating service:", picocolors.green(name));

  if (name.startsWith("web")) {
    await createNewWeb(path);
    return;
  } else if (name.startsWith("db")) {
    await createNewDB(path);
    await runPnpm(["i", "prisma"], path);
    await runPnpm(["prisma", "generate"], path);
    await root.boot.genMeta();
  } else {
    if (name.startsWith("srv")) {
      await createNewSrv(path);
    } else {
      await createNewSvc(path);
    }
    await runPnpm(["i"], path);
    console.log(`Service ${name} created.`);

    await root.boot.genMeta();
  }

  status.creating = false;
};
