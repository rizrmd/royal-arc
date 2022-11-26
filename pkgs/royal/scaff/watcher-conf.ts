import { watch } from "chokidar";
import { join } from "path";
import { g } from "../global";

export const startConfWatcher = async () => {
  const w = watch(join(g.root, "config.ts"), { ignoreInitial: true });
  w.on("change", async () => {
    process.exit(111);
  });
  g.watchers.push(w);
};
