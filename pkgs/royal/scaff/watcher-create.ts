import { watch } from "chokidar";
import { g } from "../global";

export const watcherCreate = async () => {
  if (g.watcher.create) {
    await g.watcher.create.close();
  }
  g.watcher.create = watch("");
};
