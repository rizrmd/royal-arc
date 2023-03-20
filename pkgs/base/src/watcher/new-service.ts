import { watcher } from "bundler/watch";
import chalk from "chalk";
import { dir } from "dir";
import { readAsync, removeAsync, writeAsync } from "fs-jetpack";
import { readdir, stat } from "fs/promises";
import { basename, join } from "path";
import { pkg } from "pkg";
import { serviceGen } from "../appgen/service";

export const watchNewService = () => {
  watcher.watch({
    dir: dir.root("app"),
    event: async (err, changes) => {
      if (!err) {
        for (const c of changes) {
          const name = basename(c.path);

          if (c.type === "delete") {
            console.log(`Removing service: ${chalk.red(name)}`);
            await removeAsync(dir.root(`.output/app/${name}`));
            await serviceGen();
            process.exit(99);
          } else if (c.type === "create") {
            const s = await stat(c.path);

            if (s.isDirectory() && (await readdir(c.path)).length === 0) {
              console.log(`Scaffolding new service: ${chalk.blue(name)}`);

              let root = "pkgs/template/pkgs/service";
              if (name.startsWith("db")) {
                root = "pkgs/template/pkgs/db";
              }
              const files = await readdir(dir.root(root));

              for (const f of files) {
                if (f !== "node_modules") {
                  const src = await readAsync(dir.root(`${root}/${f}`), "utf8");

                  await writeAsync(
                    join(c.path, f),
                    (src || "").replace(/template_service/g, name)
                  );
                }
              }

              await serviceGen();

              process.exit(99);
            }
          }
        }
      }
    },
  });
};
