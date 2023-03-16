import Parcel from "@parcel/core";
import { BuildEvent, AsyncSubscription } from "@parcel/types";
import { basename, dirname, join } from "path";
import { dir } from "dir";
import { IPty, spawn } from "node-pty";
import { dirAsync, removeAsync } from "fs-jetpack";

const g = globalThis as unknown as {
  runs: Record<string, IPty & { arg: any }>;
};

if (!g.runs) g.runs = {};

export const runner = {
  get list() {
    return g.runs;
  },
  async restart(path: keyof typeof g.runs) {
    g.runs[path].kill();
    g.runs[path].onExit(() => {
      runner.run(g.runs[path].arg);
    });
  },
  async stop(path: keyof typeof g.runs) {
    g.runs[path].kill();
    delete g.runs[path];
  },
  async run(arg: {
    path: string;
    args?: string[];
    onData?: (e: string) => unknown;
    onStop?: (e: { exitCode: number; signal?: number | undefined }) => unknown;
    cwd: string;
  }) {
    try {
      const { path, onData, args, cwd, onStop } = arg;

      g.runs[path] = spawn(
        process.execPath,
        ["--enable-source-maps", path, ...(args || [])],
        { cwd: cwd }
      ) as any;

      g.runs[path].arg = arg;

      if (onData) g.runs[path].onData(onData);
      else g.runs[path].onData((e) => process.stdout.write(e));

      if (onStop) g.runs[path].onExit(onStop);

      return true;
    } catch (e) {
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;

export const bundle = async (arg: {
  input: string;
  output: string;
  incremental?: boolean;
  watch?: (
    watcher: AsyncSubscription,
    err: Error | null | undefined,
    buildEvent?: BuildEvent | undefined
  ) => Promise<void>;
}) => {
  const { input, output, watch } = arg;
  try {
    const cacheDir = dir.root(
      `.output/.cache/${dirname(
        input.substring(dir.root("").length + 1)
      )}/cache`
    );
    await dirAsync(cacheDir);

    const bundler = new Parcel({
      entries: input,
      config: join(process.cwd(), ".parcelrc"),
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
  } catch (e: any) {
    console.error(e);
  }
};
