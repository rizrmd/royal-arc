import chalk from "chalk";
import { ascendFile, dir } from "dir";
import { context } from "esbuild";
import { readAsync, removeAsync, writeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname } from "path";
import { pkg } from "pkg";

export const bundle = async (arg: {
  input: string;
  output: string;
  incremental?: boolean;
  pkgjson?: string;
  pkgcwd?: string;
  printTimer?: boolean;
  onBeforeDone?: (arg: { isRebuild: boolean }) => any;
  watch?: (arg: { isRebuild: boolean; installDeps: boolean }) => Promise<void>;
}): Promise<boolean> => {
  const { input, output, printTimer, watch } = arg;

  try {
    const printableName = chalk.green(
      dirname(input.substring(dir.root("").length + 1))
    );
    const tag = `Built ${padEnd(printableName, 25, " ")}`;
    if (printTimer) console.time(tag);

    const pkgFile = await ascendFile(input, "package.json");
    let json = pkg.produce(await readAsync(pkgFile, "json"));

    await pkg.install(pkgFile, {
      cwd: arg.pkgcwd || dirname(pkgFile),
      silent: true,
      onInstall() {
        console.log(`Installing ${printableName} deps...`);
      },
      onInstallDone() {
        console.log(`Dependency ${printableName} installed`);
      },
    });

    let isRebuild = false;
    const external = [
      "esbuild",
      "node-pty",
      ...Object.keys(json.dependencies).filter(
        (e) => !["esbuild", "node-pty"].includes(e)
      ),
    ];

    return new Promise<boolean>(async (resolve) => {
      const ctx = await context({
        entryPoints: [input],
        outfile: output,
        bundle: true,
        sourcemap: true,
        format: "cjs",
        platform: "node",
        external,
        plugins: [
          {
            name: "bundle",
            setup(build) {
              build.onEnd(async () => {
                if (watch) {
                  let installDeps = false;
                  await pkg.install(pkgFile, {
                    cwd: arg.pkgcwd || dirname(pkgFile),
                    silent: true,
                    onInstall() {
                      console.log(`Installing ${printableName} deps...`);
                    },
                    onInstallDone() {
                      console.log(`Dependency ${printableName} installed`);
                      installDeps = true;
                    },
                  });

                  if (installDeps) {
                    const pkgFile = await ascendFile(input, "package.json");
                    json = pkg.produce(await readAsync(pkgFile, "json"));
                  }

                  await outputPkgJson(json, arg.pkgjson);
                  if (arg.onBeforeDone) await arg.onBeforeDone({ isRebuild });
                  if (printTimer) console.timeEnd(tag);
                  try {
                    await watch({ isRebuild, installDeps });
                  } catch (e) {
                    console.error(e);
                  }
                  if (!isRebuild) resolve(true);
                } else {
                  if (!isRebuild) resolve(true);
                }

                isRebuild = true;
              });
            },
          },
        ],
      });

      if (watch) {
        await ctx.watch();
      } else {
        resolve(true);
      }
    });
  } catch (e: any) {
    return false;
  }
};

const outputPkgJson = async (json: any, pkgjson?: string) => {
  if (pkgjson) {
    await writeAsync(pkgjson, json);
    await pkg.install(pkgjson, {
      cwd: dirname(pkgjson),
    });
  }
};
