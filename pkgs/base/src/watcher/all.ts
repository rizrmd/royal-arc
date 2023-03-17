import { watcher } from "bundler/src/watch";
import { dir } from "dir";
import { scaffoldServiceOnNewDir } from "./service";

export const setupWatchers = (args: string[], onExit: () => Promise<void>) => {
  if (args.includes("devbase")) {
    ["pkgs/base", "pkgs/service"].map((e) => {
      watcher.watch({
        dir: dir.root(e),
        ignore: ["pkgs/*/node_modules", "node_modules"],
        event: async (err, ev) => {
          if (!err) {
            await onExit();
            process.exit();
          }
        },
      });
    });
  }

  scaffoldServiceOnNewDir();
};
