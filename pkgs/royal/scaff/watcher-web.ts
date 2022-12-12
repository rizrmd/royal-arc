import { watch } from "chokidar";
import { basename, join } from "path";
import { createWebLayout, reloadWebLayoutSingle } from "./scaff-web-layout";
import { createWebPage, reloadWebPageSingle } from "./scaff-web-page";

export const watcherWeb = (path: string) => {
  const webName = basename(path);

  const pagePath = join(path, "src", "base", "page");
  const layoutPath = join(path, "src", "base", "layout");
  const genPath = join(path, "src", "gen");
  const w = watch([
    pagePath,
    layoutPath,
    genPath,
  ], { ignoreInitial: true });

  w.on("all", async (e, filePath) => {
    switch (true) {
      case filePath.startsWith(layoutPath):
        {
          if (e === "add" && filePath.endsWith(".tsx")) {
            await createWebLayout(filePath);
          }

          await reloadWebLayoutSingle(webName);
        }
        break;
      case filePath.startsWith(pagePath):
        {
          if (e === "add" && filePath.endsWith(".tsx")) {
            await createWebPage(filePath);
          }

          await reloadWebPageSingle(webName);
        }
        break;
      case filePath.startsWith(genPath):
        {
          // if (e === "add" && filePath.endsWith(".ts")) {
          //   if (((await stat(filePath)).size) === 0) {
          //     await createWebGen(filePath);
          //   }
          // }

          // await reloadWebGen();
        }
        break;
    }
  });
};
