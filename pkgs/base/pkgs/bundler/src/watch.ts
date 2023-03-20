import ParcelWatcher, {
  subscribe,
  SubscribeCallback,
  AsyncSubscription,
} from "@parcel/watcher";

type SingleWatch = {
  dir: string;
  event?: SubscribeCallback;
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
  watch(item: SingleWatch) {
    this._watches.add(
      subscribe(
        item.dir,
        async (err, changes) => {
          if (item.event) return await item.event(err, changes);
        },
        {
          ignore: item.ignore ? item.ignore : ["node_modules", "*/**"],
        }
      )
    );
  },
};
