import { FSWatcher, watch } from "chokidar";
import { BuildIncremental, Metafile } from "esbuild";
import { stat } from "fs/promises";
import { _names, _path } from "gen";
import capitalize from "lodash.capitalize";
import padEnd from "lodash.padend";
import { dirname } from "path";
import { join } from "path";
import picocolors from "picocolors";
import { existsAsync, root } from "../../../export";
import { g } from "../../global";
import { recoverFromError } from "./build-svc-node";
import { runPnpm } from "./run-pnpm";

const cwd = process.cwd();

export const watchAll = async () => {
  for (const [k, v] of Object.entries(g.node.build)) {
    rewatch(k as _names);
  }
};
const rewatch = (name: _names, files?: string[]) => {
  const b = g.node.build[name];
  if (b.metafile) {
    const fls = files
      ? files
      : Object.keys(b.metafile.inputs).map((e) => join(cwd, e));
    const w = watch(
      fls,
      {
        ignoreInitial: true,
        disableGlobbing: true,
      },
    );
    (w as any).files = fls;
    w.on("all", async (e, path) => {
      if (path.startsWith(join(cwd, "..", "..", "gen"))) {
        return;
      }

      console.log(
        `${picocolors.magenta(padEnd(capitalize(e), 6, " "))} ${
          picocolors.green(` › ` + padEnd(capitalize(name), 13, " "))
        } ${path.substring(join(process.cwd(), "..", "..").length + 1)}`,
      );

      await rebuild({ name, b, w: w as any, path });
    });
  }
};

const rebuild = async <T extends _names>({ name, b, w, path }: {
  name: T;
  b: typeof g.node.build[T];
  w: FSWatcher & { files: string[] };
  path: string;
}) => {
  let inc: BuildIncremental = null as any;

  const dir = dirname(_path[name]);
  const svcDir = join(process.cwd(), "..", "..", dir);
  const buildTs = join(svcDir, "build.ts");
  if (await existsAsync(buildTs)) {
    const output = await runPnpm(["jiti", "build.ts", "preBuild"], svcDir);
    try {
      const ignore = JSON.parse(output) as string[];
      for (const p of ignore) {
        if (path.startsWith(p)) {
          return;
        }
      }
    } catch (e) {
    }
  }

  await new Promise<void>((done) => {
    const rebuild = async () => {
      try {
        inc = await b.rebuild();
        done();
      } catch (e: any) {
        recoverFromError(name, e, rebuild);
      }
    };
    rebuild();
  });

  if (inc && inc.metafile) {
    w.close();
    const files = Object.keys(inc.metafile.inputs).map((e) => join(cwd, e));
    rewatch(name, files);
    // console.clear();
    await root.service.stopAll(name, "Hot Reload");
  }
};
