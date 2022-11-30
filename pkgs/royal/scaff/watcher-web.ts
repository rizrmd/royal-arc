import { watch } from "chokidar";
import { basename, join } from "path";
import { createWebLayout, reloadWebLayout } from "./create-web-layout";
import { createWebPage, reloadWebPage } from "./create-web-page";

export const watcherWeb = (path: string) => {
  const name = basename(path);

  const pagePath = join(path, "src", "base", "page");
  const layoutPath = join(path, "src", "base", "layout");
  const w = watch([
    pagePath,
    layoutPath,
  ]);

  w.on("all", async (e, filepath) => {
    if (filepath.startsWith(layoutPath)) {
      if (e === "add" && filepath.endsWith(".ts")) {
        await createWebLayout(filepath);
      }
      await reloadWebLayout(layoutPath);
    } else if (filepath.startsWith(pagePath)) {
      if (e === "add" && filepath.endsWith(".ts")) {
        await createWebPage(filepath);
      }
      await reloadWebPage(pagePath);
    }
  });
};
