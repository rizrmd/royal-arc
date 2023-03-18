import ParcelWatcher, {
  subscribe,
  SubscribeCallback,
  AsyncSubscription,
} from "@parcel/watcher";

type SingleWatch = {
  dir: string;
  event?: SubscribeCallback;
  markAs?: string;
  ignore?: ParcelWatcher.Options["ignore"];
};

export const watcher = {
  _watches: new Set<Promise<AsyncSubscription>>(),
  marker: {} as Record<string, true | Set<string>>,
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
          if (item.markAs) {
            if (!err) {
              for (const c of changes) {
                if (c.type === "update") {
                  if (!watcher.marker[item.markAs])
                    watcher.marker[item.markAs] = new Set();

                  const marker = watcher.marker[item.markAs];
                  if (marker) {
                    if (marker instanceof Set) {
                      marker.add(c.path);
                    } else if (marker === true) {
                      delete watcher.marker[item.markAs];
                    }
                  }
                }
              }
            }
          }
          if (item.event) return await item.event(err, changes);
        },
        {
          ignore: item.ignore ? item.ignore : ["node_modules", "*/**"],
        }
      )
    );
  },
};
