import { basename } from "path";
import { watcherWeb } from "./watcher-web";

export const watcherAttach = (path: string) => {
  const name = basename(path);

  if (name.startsWith("web")) {
    watcherWeb(name)
  }

  return path;
};
