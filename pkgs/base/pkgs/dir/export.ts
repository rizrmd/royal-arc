import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";

export const globalize = <T>(name: string, defaultValue: T) => {
  const g = global as any;
  if (typeof g[name] === "undefined") {
    g[name] = defaultValue;
  }

  return g[name] as T;
};

export const dir = new Proxy(
  {},
  {
    get(_target, p) {
      if (p === "path") {
        return (arg: string) => {
          return join(process.cwd(), ...arg.split("/"));
        };
      }

      if (p === "root") {
        return (arg: string) => {
          if (
            existsSync(join(cwd(), "base")) &&
            existsSync(join(cwd(), ".parcelrc"))
          ) {
            return join(process.cwd(), ...arg.split("/"));
          }

          return join(process.cwd(), "..", "..", ...arg.split("/"));
        };
      }
    },
  }
) as {
  root: (arg: string) => string;
  path: (arg: string) => string;
};
