import { basename } from "path";
import { watcherSrv } from "./watcher-srv";
import { watcherWeb } from "./watcher-web";

export const watcherAttach = async (path: string) => {
  const name = basename(path);

  if (name.startsWith("web")) {
    watcherWeb(path);
  }

  if (name.startsWith("srv")) {
    watcherSrv(path);
  }

  return path;
};
