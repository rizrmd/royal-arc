import { FileSink } from "bun";
import { build, BuildFailure } from "esbuild";
import { _names, _path } from "gen";
import { dirname, join, sep } from "path";
import picocolors from "picocolors";
import { g } from "../../global";
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
    dependencies: deps,
  });

  await new Promise<void>(async (finished) => {
    if (!g.node) {
      g.node = {
        build: {},
        buildTimeout: {},
        watch: {},
      };
    }

    let nb = g.node.build[name];
    if (nb && nb.stop) nb.stop();

    const rebuild = async () => {
      g.node.build[name] = await build({
        bundle: true,
        logLevel: "silent",
        platform: "node",
        sourcemap: true,
        incremental: true,
        metafile: true,
        minify: true,
        entryPoints: [indexPath],
        outfile: join(tpath, "index.js"),
        external: Object.keys(deps),
      });
      finished();
    };
    try {
      rebuild();
    } catch (e: any) {
      recoverFromError(name, e, rebuild);
    }
  });
};

const recoverFromError = async (
  name: _names,
  e: BuildFailure,
  rebuild: () => Promise<void>,
) => {
  printError(e);

  if (e && e.errors) {
    const files = e.errors.map((e) => e.location?.file || "").filter((e) => e);

    if (g.node.watch[name]) {
      g.node.watch[name].kill();
      await g.node.watch[name].exited;
    }

    g.node.watch[name] = Bun.spawn({
      cmd: [
        join(
          "node_modules",
          ".bin",
          /^win/.test(process.platform) ? "jiti.cmd" : "jiti",
        ),
        join(__dirname, "node-watcher.ts"),
      ],
      cwd: process.cwd(),
      stdin: "pipe",
      stdout: "pipe",
    });
    const { stdin, stdout } = g.node.watch[name];

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

    g.node.watch[name].kill();
    await g.node.watch[name].exited;
    delete g.node.watch[name];
    rebuild();
  }
};

const printError = (e: any) => {
  for (const [idx, line] of Object.entries(e.message.split("\n") as string[])) {
    if (idx === "0") {
      console.log(picocolors.red(line));
    } else {
      console.log(`  ${line}`);
    }
  }
};
