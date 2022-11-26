import { FileSink } from "bun";
import { spawn } from "child_process";
import { build, BuildFailure } from "esbuild";
import { _names, _path } from "gen";
import { dirname, join, sep } from "path";
import picocolors from "picocolors";
import { current } from "../../../export";
import { g } from "../../global";
import { dirAsync, existsAsync, writeAsync } from "./jetpack";
import { resolveDeps } from "./resolve-deps";
import { runPnpm } from "./run-pnpm";

const preBuildScript = {} as Record<string, true>;
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

  const buildFile = join(spath, "build.ts");
  if (await existsAsync(buildFile)) {
    if (!preBuildScript[name]) {
      await new Promise<void>(async (finished) => {
        const rebuild = async () => {
          try {
            await build({
              bundle: true,
              logLevel: "silent",
              platform: "node",
              sourcemap: true,
              entryPoints: [buildFile],
              outfile: join(tpath, "build.js"),
            });
            preBuildScript[name] = true;
            finished();
          } catch (e: any) {
            console.log(
              `Build failed: ${buildFile.substring(root.length + 1)}`,
            );
            recoverFromError(name, e, rebuild);
          }
        };
        rebuild();
      });
    }

    if (preBuildScript[name]) {
      Bun.spawnSync({
        cmd: [
          "node",
          "--enable-source-maps",
          "--no-warnings",
          join(tpath, "build.js"),
          "preBuild",
        ],
        cwd: process.cwd(),
        stdout: "inherit",
        stderr: "inherit",
      });
    }
  }
  await new Promise<void>(async (finished) => {
    const rebuild = async () => {
      try {
        const b = g.node.build[name];
        if (b) {
          if (b.rebuild) {
            await b.rebuild();
          }
        } else {
          const rebuild = () => {
            let i = 0;
            if (!g.svc || !g.svc[name]) return;

            console.log(
              picocolors.gray(
                ` › File changed on service ${dirname(_path[name])}`,
              ),
            );
            for (const [_, svc] of Object.entries(g.svc[name])) {
              if (svc.ws) {
                // kill all except first pid
                // tell first pid to restart itself (111)
                svc.ws.send(
                  JSON.stringify(
                    i === 0
                      ? {
                        type: "event",
                        event: "kill",
                        code: 111,
                      }
                      : {
                        type: "event",
                        event: "kill",
                      },
                  ),
                );
              }
              i++;
            }
          };

          g.node.build[name] = await build({
            bundle: true,
            logLevel: "silent",
            platform: "node",
            sourcemap: true,
            watch: {
              onRebuild: async (err, res) => {
                if (
                  !await existsAsync(join(dirname(indexPath)))
                ) {
                  if (
                    res &&
                    res.stop
                  ) {
                    res.stop();
                  }
                  return;
                }

                if (err) {
                  console.log(
                    `Build failed: ${indexPath.substring(root.length + 1)}`,
                  );
                  printError(err);
                  return;
                }

                clearTimeout(g.node.buildTimeout[name]);
                g.node.buildTimeout[name] = setTimeout(rebuild, 300);
              },
            },
            minify: true,
            entryPoints: [indexPath],
            outfile: join(tpath, "index.js"),
            external: Object.keys(deps),
          });
        }
        finished();
      } catch (e: any) {
        console.log(`Build failed: ${indexPath.substring(root.length + 1)}`);
        recoverFromError(name, e, rebuild);
      }
    };
    rebuild();
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
