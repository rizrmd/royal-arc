import { watch } from "chokidar";
import { _names, _path } from "gen";
import { dirname, join } from "path";
import { root } from "service";
import { g } from "./global";
import { startService } from "./service";

export const action = () => ({
  watchAndStart(name: _names) {
    const dir = join(g.root, dirname(_path[name]));
    const w = watch(dir, { ignoreInitial: true });

    g.watchers.push(w);
    w.on("all", async (_, path) => {
      if (path.startsWith(join(dir, "node_modules"))) return;
      const idx = g.watchers.findIndex((e) => e === w);
      if (idx >= 0) {
        g.watchers.splice(idx, 1);
      }
      await w.close();

      await root.service.stopAll(name, 'Watch n Start');
      await startService(name);
    });
  },
});
