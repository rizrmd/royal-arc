import fs from "fs/promises";
import path from "path";

const isBare = (str: string) => {
  if (
    str.startsWith("/") || str.startsWith("./") || str.startsWith("../") ||
    str.substr(0, 7) === "http://" || str.substr(0, 8) === "https://"
  ) {
    return false;
  }
  return true;
};

const isString = (str: string) => typeof str === "string";

const validate = (map: any) =>
  Object.keys(map.imports).map((key) => {
    const value = map.imports[key];

    if (isBare(value)) {
      throw Error(
        `Import specifier can NOT be mapped to a bare import statement. Import specifier "${key}" is being wrongly mapped to "${value}"`,
      );
    }

    return { key, value };
  });

const fileReader = (pathname = "") =>
  new Promise((resolve, reject) => {
    const filepath = path.normalize(pathname);
    fs.readFile(filepath).then((file: Buffer) => {
      try {
        const obj = JSON.parse(file.toString("utf-8"));
        resolve(validate(obj));
      } catch (error) {
        reject(error);
      }
    }).catch(reject);
  });

const CACHE = new Map();

export async function load(importMaps: { imports: Record<string, string> }) {
  const maps = Array.isArray(importMaps) ? importMaps : [importMaps];

  const mappings = maps.map((item) => {
    if (isString(item)) {
      return fileReader(item);
    }
    return validate(item);
  });

  await Promise.all(mappings).then((items) => {
    items.forEach((item: any) => {
      item.forEach((obj: any) => {
        CACHE.set(obj.key, obj.value);
      });
    });
  });
}

export function clear() {
  CACHE.clear();
}

export function plugin() {
  return {
    name: "importMap",
    setup(build: any) {
      build.onResolve({ filter: /.*?/ }, (args: any) => {
        if (CACHE.has(args.path)) {
          return {
            path: CACHE.get(args.path),
            namespace: args.path,
            external: true,
          };
        }
        return {};
      });
    },
  };
}
