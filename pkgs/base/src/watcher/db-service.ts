import { watcher } from "bundler/src/watch";
import { dir } from "dir";

export const watchDBService = (name: string) => {
  watcher.watch({
    dir: dir.root(`app/${name}`),
    ignore: ["node_modules"],
    markChangesAs: name,
  });
};
