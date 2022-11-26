import { startCreateWatcher } from "./watcher-create";
import { startConfWatcher } from "./watcher-conf";
import { webWatcherLayout } from "./watcher-web-layout";
import { webWatcherPage } from "./watcher-web-page";

export const devMode = async () => {
  await startCreateWatcher();
  await startConfWatcher();
  await webWatcherLayout();
  await webWatcherPage();
};
