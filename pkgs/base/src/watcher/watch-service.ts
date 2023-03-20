import { SubscribeCallback } from "@parcel/watcher";
import { watcher } from "bundler/src/watch";
import { dir } from "dir";

export const watchService = (name: string, event: SubscribeCallback) => {
  watcher.watch({
    dir: dir.root(`app/${name}`),
    ignore: ["node_modules"],
    event,
  });
};
