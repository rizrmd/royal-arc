import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";

import { readdirSync, statSync } from "fs";
import { dirname, resolve } from "path";

export const globalize = <T extends object>(
  name: string,
  defaultValue: T,
  init?: (g: T) => Promise<void>
) => {
  const g = global as any;
  if (typeof g[name] === "undefined") {
    g[name] = defaultValue;
  }

  if (init) {
    init(g[name]);
  }

  return g[name] as T;
};

export const dir = new Proxy(
  {},
  {
    get(_target, p) {
      if (p === "path") {
        return (arg: string = "") => {
          return join(process.cwd(), ...(arg || "").split("/"));
        };
      }

      if (p === "root") {
        return (arg: string = "") => {
          if (existsSync(join(cwd(), "base"))) {
            return join(process.cwd(), ...arg.split("/"));
          }

          return join(process.cwd(), "..", "..", ...arg.split("/"));
        };
      }
    },
  }
) as {
  root: (arg?: string) => string;
  path: (arg?: string) => string;
};

export const ascend = function (
  start: string,
  callback: (directory: string, files: string[]) => string | false | void
) {
  let dir = resolve(".", start);
  let tmp,
    stats = statSync(dir);

  if (!stats.isDirectory()) {
    dir = dirname(dir);
  }

  while (true) {
    tmp = callback(dir, readdirSync(dir));
    if (tmp) return resolve(dir, tmp);
    dir = dirname((tmp = dir));
    if (tmp === dir) break;
  }
};

export const ascendFile = async (dir: string, untilFoundFile: string) => {
  return new Promise<string>((resolve) => {
    ascend(dir, (dir, files) => {
      if (files.includes(untilFoundFile)) {
        resolve(join(dir, untilFoundFile));
        return dir;
      }
    });
  });
};
