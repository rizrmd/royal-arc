import { spawn, spawnSync } from "child_process";
import chalk from "chalk";
import fs from "fs";
import path, { dirname } from "path";
import { shouldInstall } from "./src/should-install";
import { dir } from "dir";

const g = globalThis as unknown as {
  pkgRunner: Set<string>;
};

if (!g.pkgRunner) {
  g.pkgRunner = new Set();
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
  preventRun: false,
  isRunning: (cwd?: string) => g.pkgRunner.has(cwd || ""),
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
    paths: string[] | string,
    arg?: { cwd?: undefined | string; silent?: boolean }
  ) {
    const _arg = arg ? arg : { cwd: undefined, silent: false };
    if (pkg.preventRun) return;

    if (g.pkgRunner.has(_arg.cwd || "")) {
      console.log(
        "Install deps still running ",
        chalk.green(
          dirname((_arg.cwd || "").substring(process.cwd().length + 1))
        )
      );
      return;
    }

    g.pkgRunner.add(_arg.cwd || "");

    if (!Array.isArray(paths)) {
      await new Promise<void>((resolve) => {
        const child = spawn("pnpm", ["i"], {
          stdio: "inherit",
          cwd: _arg.cwd || process.cwd(),
        });
        child.on("exit", () => {
          g.pkgRunner.delete(_arg.cwd || "");
          resolve();
        });
      });
    } else {
      const dirs = await scanDir(paths);
      let mustInstall = new Set<string>();
      const all = await Promise.all(
        dirs.map((e) => [e, shouldInstall(e, arg?.silent)])
      );
      for (const [e, i] of all) {
        if (await i) {
          mustInstall.add(e as string);
        }
      }

      if (mustInstall.size > 0) {
        console.log(
          `\n${chalk.magenta("Installing")} deps:\n ${chalk.blue("➥")}`,
          [...mustInstall]
            .map((e) =>
              chalk.green(dirname(e.substring(process.cwd().length + 1)))
            )
            .join(" ")
        );

        await new Promise<void>((resolve) => {
          const child = spawn("pnpm", ["i"], {
            stdio: "inherit",
            cwd: _arg.cwd || process.cwd(),
          });
          child.on("exit", () => {
            g.pkgRunner.delete(_arg.cwd || "");
            resolve();
          });
        });
      } else {
        g.pkgRunner.delete(_arg.cwd || "");
      }
    }
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
