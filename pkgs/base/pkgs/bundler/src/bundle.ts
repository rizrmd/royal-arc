import Parcel from "@parcel/core";
import { AsyncSubscription, BuildEvent } from "@parcel/types";
import { ascendFile, dir } from "dir";
import { dirAsync, readAsync, removeAsync } from "fs-jetpack";
import { basename, dirname, join } from "path";
import { pkg } from "pkg";

export const bundle = async (arg: {
  input: string;
  output: string;
  incremental?: boolean;
  pkgjson?: string;
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

    const genPkgJson = async () => {
      if (arg.pkgjson) {
        const oldpkg = await ascendFile(input, "package.json");
        pkg.produce(await readAsync(oldpkg, "json"));
      }
    };

    if (watch) {
      const watcher = await bundler.watch(async (err, event) => {
        if (event) {
          if (event.type === "buildSuccess") {
            await genPkgJson();
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
      await genPkgJson();
    }
    return true;
  } catch (e: any) {
    await removeAsync(cacheDir);
    console.error(e);
    return false;
  }
};
