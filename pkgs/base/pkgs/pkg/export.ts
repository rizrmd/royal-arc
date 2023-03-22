import { spawn, spawnSync } from "child_process";
import chalk from "chalk";
import fs from "fs";
import path, { dirname } from "path";
import { shouldInstall } from "./src/should-install";
import { dir } from "dir";
import { readAsync } from "fs-jetpack";

const g = globalThis as unknown as {
  pkgRunning: Set<Promise<void>>;
  allPkgs: Record<
    string,
    {
      dependencies: Record<string, string>;
      devDependencies?: Record<string, string>;
    }
  >;
};

if (!g.pkgRunning) {
  g.pkgRunning = new Set();
}

const getModuleVersion = async (name: string) => {
  if (!g.allPkgs) {
    g.allPkgs = {};
    const dirs = await scanDir([dir.root()]);
    await Promise.all(
      dirs.map(async (e) => {
        try {
          const res = await readAsync(e, "json");
          g.allPkgs[e] = res;
        } catch (e) {}
      })
    );
  }

  for (const pkg of Object.values(g.allPkgs)) {
    if (pkg.dependencies) {
      for (const [k, v] of Object.entries(pkg.dependencies)) {
        if (k === name) return v;
      }
    }
    if (pkg.devDependencies) {
      for (const [k, v] of Object.entries(pkg.devDependencies)) {
        if (k === name) return v;
      }
    }
  }
};

export const pkg = {
  async extractExternal(pkg: {
    name: string;
    version: string;
    external?: string[];
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  }) {
    const dependencies: Record<string, string> = {};

    if (pkg.external) {
      for (const f of pkg.external) {
        const v = await getModuleVersion(f);
        if (v) dependencies[f] = v;

        if (f === "*") {
          if (pkg.dependencies) {
            for (const [k, v] of Object.entries(pkg.dependencies)) {
              if (!v.startsWith("workspace:")) {
                dependencies[k] = v;
              }
            }
          }

          if (pkg.devDependencies) {
            for (const [k, v] of Object.entries(pkg.devDependencies)) {
              if (!v.startsWith("workspace:")) {
                dependencies[k] = v;
              }
            }
          }
        }
      }
    } else {
      if (pkg.dependencies) {
        for (const [k, v] of Object.entries(pkg.dependencies)) {
          if (!v.startsWith("workspace:")) {
            dependencies[k] = v;
          }
        }
      }

      if (pkg.devDependencies) {
        for (const [k, v] of Object.entries(pkg.devDependencies)) {
          if (!v.startsWith("workspace:")) {
            dependencies[k] = v;
          }
        }
      }
    }

    return { name: pkg.name, version: pkg.version, dependencies };
  },
  async install(
    path: string,
    arg?: {
      cwd?: undefined | string;
      silent?: boolean;
      onInstall?: () => any;
      onInstallDone?: () => any;
      deep?: boolean;
    }
  ) {
    const _arg = arg ? arg : { cwd: undefined, silent: false };
    const silent = _arg.silent === true ? true : false;

    if (g.pkgRunning.size > 0) {
      await Promise.all([...g.pkgRunning.values()]);
    }

    const prom = new Promise<void>(async (resolve) => {
      let install = false;

      if (arg?.deep) {
        const dirs = await scanDir([path]);
        const templateDir = dir.root("pkgs/template");
        for (const e of dirs) {
          if (!e.startsWith(templateDir)) {
            if (await shouldInstall(e)) {
              install = true;
              break;
            }
          }
        }
      } else {
        install = await shouldInstall(path, silent);
      }

      if (install) {
        if (arg?.onInstall) await arg.onInstall();
        if (!silent)
          console.log(
            `\n${chalk.magenta("Installing")} deps:\n ${chalk.blue("➥")}`,
            [path]
              .map((e) =>
                chalk.green(dirname(e.substring(process.cwd().length + 1)))
              )
              .join(" ")
          );

        const child = spawn("pnpm", ["i"], {
          stdio: silent ? "ignore" : "inherit",
          cwd: _arg.cwd || process.cwd(),
          shell: true,
        });
        child.on("exit", () => {
          g.pkgRunning.delete(prom);

          if (arg?.onInstallDone) arg.onInstallDone();
          resolve();
        });
      } else {
        resolve();
      }
    });
    g.pkgRunning.add(prom);
    return await prom;
  },
};

export const scanDir = async (paths: string[]) => {
  const pkgs: string[] = [];
  for (const path of paths) {
    for await (const p of walk(path)) {
      if (p.endsWith("package.json")) {
        pkgs.push(p);
      }
      if (p.endsWith("node_modules")) break;
    }
  }
  return pkgs;
};

async function* walk(dir: string): any {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      if (!entry.endsWith("node_modules")) {
        yield* await walk(entry);
      }
    } else if (d.isFile()) yield entry;
  }
}
