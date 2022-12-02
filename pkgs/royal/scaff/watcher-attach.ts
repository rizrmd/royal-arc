import { basename, join } from "path";
import { reloadWebLayout } from "./create-web-layout";
import { reloadWebPage } from "./create-web-page";
import { watcherSrv } from "./watcher-srv";
import { watcherWeb } from "./watcher-web";

export const watcherAttach = async (path: string) => {
  const name = basename(path);

  if (name.startsWith("web")) {
    watcherWeb(path);
    const layoutPath = join(path, "src", "base", "layout");
    const pagePath = join(path, "src", "base", "page");
    await reloadWebLayout(layoutPath);
    await reloadWebPage(pagePath);
  }

  if (name.startsWith("srv")) {
    watcherSrv(path);
  }

  return path;
};
