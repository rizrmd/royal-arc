import ParcelWatcher, {
  subscribe,
  SubscribeCallback,
  AsyncSubscription,
} from "@parcel/watcher";

type SingleWatch = {
  dir: string;
  event: SubscribeCallback;
  ignore?: ParcelWatcher.Options["ignore"];
};

export const watcher = {
  _watches: new Set<Promise<AsyncSubscription>>(),
  async dispose() {
    await Promise.all(
      [...this._watches.values()].map(async (e) => {
        (await e).unsubscribe();
      })
    );
  },
  watch(dirs: SingleWatch[] | SingleWatch) {
    const _dirs = Array.isArray(dirs) ? dirs : [dirs];

    for (const item of _dirs) {
      this._watches.add(
        subscribe(item.dir, item.event, {
          ignore: item.ignore ? item.ignore : ["node_modules", "*/**"],
        })
      );
    }
  },
};
