import { watch } from "chokidar";
import { stat } from "fs/promises";
import { basename, join } from "path";
import { createWebLayout, reloadWebLayout } from "./create-web-layout";
import {
  createWebPage,
  reloadWebPage,
  reloadWebPageSingle,
} from "./create-web-page";

export const watcherWeb = (path: string) => {
  const name = basename(path);

  const pagePath = join(path, "src", "base", "page");
  const layoutPath = join(path, "src", "base", "layout");
  const w = watch([
    pagePath,
    layoutPath,
  ], { ignoreInitial: true });
 
  w.on("all", async (e, filePath) => {
    if (filePath.startsWith(layoutPath)) {
      if (e === "add" && filePath.endsWith(".tsx")) {
        await createWebLayout(filePath);
      }
      await reloadWebLayout(layoutPath);
    } else if (filePath.startsWith(pagePath)) {
      if (e === "add" && filePath.endsWith(".tsx")) {
        if (((await stat(filePath)).size) === 0) {
          await createWebPage(filePath);
        }
      }

      if (e === "change") {
        reloadWebPageSingle(pagePath, filePath);
      } else {
        await reloadWebPage(pagePath);
      }
    }
  });
};
