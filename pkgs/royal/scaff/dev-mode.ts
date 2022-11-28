import { startCreateWatcher } from "./watcher-create";
import { startConfWatcher } from "./watcher-conf";
import { webWatcherLayout } from "./watcher-web-layout";
import { webWatcherPage } from "./watcher-web-page";
import { startAPIWatcher } from "./watcher-api";

export const devMode = async () => {
  await startCreateWatcher();
  await startConfWatcher();
  startAPIWatcher();
  await webWatcherLayout();
  await webWatcherPage();
};
