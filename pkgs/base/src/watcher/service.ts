import { watcher } from "bundler/src/watch";
import chalk from "chalk";
import { dir } from "dir";
import { readAsync, writeAsync } from "fs-jetpack";
import { readdir, stat } from "fs/promises";
import { basename, join } from "path";
import { pkg } from "pkg";
export const scaffoldServiceOnNewDir = () => {
  watcher.watch([
    {
      dir: dir.root("app"),
      event: async (err, changes) => {
        if (!err) {
          for (const c of changes) {
            if (c.type === "delete") {
              console.log(
                `Removing service: ${chalk.red(basename(c.path))}`
              );
              await pkg.install(dir.root(""));
            } else if (c.type === "create") {
              const s = await stat(c.path);

              if (s.isDirectory() && (await readdir(c.path)).length === 0) {
                console.log(
                  `Scaffolding new service: ${chalk.blue(basename(c.path))}`
                );

                const files = await readdir(
                  dir.root("pkgs/template/pkgs/service")
                );
                for (const f of files) {
                  if (f !== "node_modules") {
                    const src = await readAsync(
                      dir.root(`pkgs/template/pkgs/service/${f}`),
                      "utf8"
                    );

                    await writeAsync(
                      join(c.path, f),
                      (src || "").replace(/template_service/g, basename(c.path))
                    );
                  }
                }

                await pkg.install(dir.root(""));
              }
            }
          }
        }
      },
    },
  ]);
};
