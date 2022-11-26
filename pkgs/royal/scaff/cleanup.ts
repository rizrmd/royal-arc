import { g } from "../global";

export const stopAllWatcher = async () => {
  const pending: Promise<any>[] = [];
  if (g.watchers) {
    for (const w of g.watchers) {
      pending.push(w.close());
    }
  }
  await Promise.all(pending);
};
