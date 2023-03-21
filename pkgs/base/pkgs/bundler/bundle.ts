import chalk from "chalk";
import { ascendFile, dir } from "dir";
import { readAsync, writeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname } from "path";
import { pkg } from "pkg";

export const bundle = async (arg: {
  input: string;
  output: string;
  incremental?: boolean;
  pkgjson?: { input: string; output?: string };
  printTimer?: boolean;
  onBeforeDone?: (arg: { isRebuild: boolean }) => any;
  watch?: (arg: { isRebuild: boolean; installDeps: boolean }) => Promise<void>;
}): Promise<boolean> => {
  try {
    const { context } = await import("esbuild");

    const { input, output, printTimer, watch, pkgjson } = arg;

    const printableName = chalk.cyan(
      dirname(input.substring(dir.root("").length + 1))
    );
    const tag = `Built ${padEnd(printableName, 23, " ")}`;
    if (printTimer) console.time(tag);

    let externalJson: any = { dependencies: {} };
    if (pkgjson) {
      let json = await readAsync(pkgjson.input, "json");
      if (pkgjson.output) {
        externalJson = pkg.extractExternal(json);
        await writeAsync(pkgjson.output, externalJson);
      }
      await pkg.install(pkgjson.input, {
        cwd: dirname(pkgjson.input),
        silent: true,
        onInstall() {
          console.log(`Installing ${printableName} deps...`);
        },
        onInstallDone() {},
      });
    }

    let isRebuild = false;
    const external = [
      "esbuild",
      ...Object.keys(externalJson.dependencies).filter(
        (e) => !["esbuild"].includes(e)
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

                  if (arg.onBeforeDone) await arg.onBeforeDone({ isRebuild });
                  if (printTimer) console.timeEnd(tag);
                  try {
                    await watch({ isRebuild, installDeps });
                  } catch (e) {
                    console.error(JSON.stringify(e));
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
