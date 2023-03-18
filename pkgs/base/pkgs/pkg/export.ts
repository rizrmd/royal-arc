import { spawn, spawnSync } from "child_process";
import chalk from "chalk";
import fs from "fs";
import path, { dirname } from "path";
import { shouldInstall } from "./src/should-install";
import { dir } from "dir";

const g = globalThis as unknown as {
  pkgRunning: Set<Promise<void>>;
};

if (!g.pkgRunning) {
  g.pkgRunning = new Set();
}

const getModuleVersion = (name: string) => {
  const res = spawnSync("pnpm", ["why", "-r", name], {
    cwd: dir.root(""),
    env: process.env,
  });
  const out = res.output.filter((e) => !!e);
  try {
    return out.toString().split(`${name} `)[1].split("\n")[0].split(" ")[0];
  } catch (e) {
    return "";
  }
};

export const pkg = {
  produce(pkg: { name: string; version: string; external?: string[] }) {
    const dependencies: Record<string, string> = {};

    if (pkg.external) {
      for (const f of pkg.external) {
        dependencies[f] = getModuleVersion(f);
      }
    }

    return { name: pkg.name, version: pkg.version, dependencies };
  },
  async install(
    path: string,
    arg?: {
      cwd?: undefined | string;
      silent?: boolean;
      onInstall?: () => void;
      onInstallDone?: () => void;
    }
  ) {
    const _arg = arg ? arg : { cwd: undefined, silent: false };
    const silent = _arg.silent === true ? true : false;

    if (g.pkgRunning.size > 0) {
      await Promise.all([...g.pkgRunning.values()]);
    }

    const prom = new Promise<void>(async (resolve) => {
      const install = await shouldInstall(path, silent);
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
