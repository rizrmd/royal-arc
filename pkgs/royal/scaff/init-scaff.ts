import { basename, join } from "path";
import { listAsync } from "service";
import { g } from "../global";
import { createNewDB } from "./create-db";
import { isDirectory } from "./util/is-directory";
import { watcherAttach } from "./watcher-attach";
import { createNew } from "./watcher-create";

const excludes = ["boot", "royal", "service"];

export const initScaff = async () => {
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
          await createNew(path);
        }
        watcherAttach(path);
      }
    }
  }
};
