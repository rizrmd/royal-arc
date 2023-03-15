import Parcel from "@parcel/core";
import { BuildEvent, AsyncSubscription } from "@parcel/types";
import { join } from "path";
import { dir } from "dir";
import { IPty, spawn } from "node-pty";

const g = globalThis as unknown as {
  runs: Record<string, IPty>;
};

if (!g.runs) g.runs = {};

export const listRunning = () => {
  return g.runs;
};

export const run = (arg: {
  path: string;
  args?: string[];
  onData?: (e: string) => unknown;
  onStop?: (e: { exitCode: number; signal?: number | undefined }) => unknown;
  cwd: string;
}) => {
  const { path, onData, args, cwd, onStop } = arg;
  g.runs[path] = spawn(
    "node",
    ["--enable-source-maps", path, ...(args || [])],
    { cwd: cwd }
  );

  if (onData) g.runs[path].onData(onData);
  if (onStop) g.runs[path].onExit(onStop);

  return {
    stop: () => {
      g.runs[path].kill();
      delete g.runs[path];
    },
    restart: () => {
      g.runs[path].kill();
      g.runs[path].onExit(() => {
        run(arg);
      });
    },
  };
};

export const bundle = async (arg: {
  input: string;
  output: string;
  watch?: (
    watcher: AsyncSubscription,
    err: Error | null | undefined,
    buildEvent?: BuildEvent | undefined
  ) => Promise<void>;
}) => {
  const { input, output, watch } = arg;
  try {
    const bundler = new Parcel({
      entries: input,
      config: join(process.cwd(), ".parcelrc"),
      shouldBundleIncrementally: true,
      cacheDir: dir.root(
        `.output/.cache/${input.substring(dir.root("").length + 1)}`
      ),
      targets: {
        default: {
          distDir: output,
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
    }
  } catch (e: any) {
    console.log(
      `Error: ${e.diagnostics[0].codeFrames[0].codeHighlights
        .map((e: any) => e.message)
        .join("\n")}`
    );
  }
};
