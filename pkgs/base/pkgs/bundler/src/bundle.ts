import Parcel from "@parcel/core";
import { AsyncSubscription, BuildEvent } from "@parcel/types";
import { dir } from "dir";
import { dirAsync, removeAsync } from "fs-jetpack";
import { basename, dirname, join } from "path";

export const bundle = async (arg: {
  input: string;
  output: string;
  incremental?: boolean;
  watch?: (
    watcher: AsyncSubscription,
    err: Error | null | undefined,
    buildEvent?: BuildEvent | undefined
  ) => Promise<void>;
}): Promise<boolean> => {
  const { input, output, watch } = arg;

  const cacheDir = dir.root(
    `.output/.cache/${dirname(input.substring(dir.root("").length + 1))}/cache`
  );
  try {
    await dirAsync(cacheDir);

    const bundler = new Parcel({
      entries: input,
      config: dir.root("pkgs/base/pkgs/bundler/parcel.config.json5"),
      shouldBundleIncrementally: arg.incremental ? arg.incremental : true,
      cacheDir,
      targets: {
        default: {
          distDir: dirname(output),
          distEntry: basename(output),
          sourceMap: true,
          includeNodeModules: true,
          engines: {
            node: ">= 18",
          },
        },
      },
    });

    if (watch) {
      const watcher = await bundler.watch(async (err, event) => {
        if (event) {
          if (event.type === "buildSuccess") {
            await watch(watcher, err, event);
          } else if (event.type === "buildFailure") {
            console.log(
              `Error: ${event.diagnostics.map((e) => e.message).join("\n")}`
            );
            await watcher.unsubscribe();
          }
        }
      });
    } else {
      await bundler.run();
    }
    return true;
  } catch (e: any) {
    await removeAsync(cacheDir);
    console.error(e);
    return false;
  }
};
