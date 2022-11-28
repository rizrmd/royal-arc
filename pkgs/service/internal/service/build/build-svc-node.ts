import { FileSink } from "bun";
import { watch } from "chokidar";
import type { BuildFailure } from "esbuild";
import { _names, _path } from "gen";
import capitalize from "lodash.capitalize";
import { dirname, join, sep } from "path";
import picocolors from "picocolors";
import { g } from "../../global";
import { getRuntime } from "../../rpc/get-runtime";
import { waitExit } from "../../rpc/wait-exit";
import { dirAsync, writeAsync } from "./jetpack";
import { resolveDeps } from "./resolve-deps";

export const buildSvcNode = async (name: _names, outPath: string) => {
  const cwdsplit = process.cwd().split(sep);
  const root = (
    cwdsplit.includes(".output")
      ? cwdsplit.slice(0, cwdsplit.length - 2)
      : cwdsplit
  ).join(sep);

  const tpath = join(outPath, "service", name);
  await dirAsync(tpath);
  const indexPath = join(root, _path[name]);

  const spath = dirname(indexPath);
  const deps = await resolveDeps(spath);

  await writeAsync(join(tpath, "package.json"), {
    name,
    version: "1.0.0",
    type: "module",
    dependencies: deps,
  });

  await new Promise<void>(async (finished) => {
    if (!g.node) {
      g.node = {
        build: {},
        buildTimeout: {},
        recoverError: {},
      };
    }

    let nb = g.node.build[name];
    if (nb && nb.stop) nb.stop();

    const { build } = await import("esbuild");
    const { commonjs } = await import("@hyrious/esbuild-plugin-commonjs");

    const rebuild = async () => {
      try {
        g.node.build[name] = await build({
          bundle: true,
          logLevel: "silent",
          platform: "node",
          format: "esm",
          sourcemap: true,
          incremental: true,
          metafile: true,
          minify: true,
          plugins: [commonjs()],
          entryPoints: [indexPath],
          outfile: join(tpath, "index.js"),
          external: Object.keys(deps),
        });
        finished();
      } catch (e: any) {
        recoverFromError(name, e, rebuild);
      }
    };
    rebuild();
  });
};

export const recoverFromError = async (
  name: _names,
  e: BuildFailure,
  rebuild: () => Promise<void>,
) => {
  if (e && e.errors) {
    printError(e, name);

    const files = e.errors.map((e) => e.location?.file || "").filter((e) => e);

    if (g.node.recoverError[name]) {
      g.node.recoverError[name].kill();
      await waitExit(g.node.recoverError[name]);
    }

    const runtime = getRuntime();
    const cmd = join(
      "node_modules",
      ".bin",
      /^win/.test(process.platform) ? "jiti.cmd" : "jiti",
    );
    if (runtime === "bun") {
      // file watcher is not available in bun
      // so we need nodejs help for this
      g.node.recoverError[name] = Bun.spawn({
        cmd: [
          cmd,
          join(__dirname, "node-watcher.ts"),
        ],
        cwd: process.cwd(),
        stdin: "pipe",
        stdout: "pipe",
      });
      const { stdin, stdout } = g.node.recoverError[name];

      const fstdin = stdin as FileSink;
      for (const file of files) {
        fstdin.write(file + "\n");
      }
      fstdin.write("!!start!!" + "\n");
      const rstdout = stdout as ReadableStream;
      const reader = rstdout.getReader();
      while (true) {
        await reader.read();
        console.log(picocolors.yellow(`Rebuilding ${name}...`));
        break;
      }
      g.node.recoverError[name].kill();
    } else {
      const w = watch(files, {
        disableGlobbing: true,
        ignoreInitial: true,
      });

      await new Promise<void>((done) => {
        w.once("all", async () => {
          await w.close();
          done();
        });
      });
    }

    await waitExit(g.node.recoverError[name]);
    delete g.node.recoverError[name];
    rebuild();
  }
};

const printError = (e: any, svcName?: string) => {
  for (const [idx, line] of Object.entries(e.message.split("\n") as string[])) {
    if (idx === "0") {
      console.log(
        svcName ? `[${picocolors.green(capitalize(svcName))}]` : "",
        picocolors.red(line),
      );
    } else {
      console.log(`  ${line}`);
    }
  }
};
