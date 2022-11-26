import { join, sep } from "path";
import { existsAsync, readAsync } from "./jetpack";

export const resolveDeps = async (
  path: string,
  cache?: Record<string, string>,
) => {
  const pkg = await readAsync(join(path, "package.json"), "json");
  const loaded = { ...cache };

  if (!pkg) {
    throw new Error(`File not found: ${join(path, "package.json")}`);
  }
  loaded[path] = pkg.version || "1.0.0";

  const deps: Record<string, string> = {
    ...pkg.dependencies,
  };

  for (let [k, v] of Object.entries(deps)) {
    if (v.startsWith("workspace:")) {
      delete deps[k];
      const wkpath = await getWorkspace(k);
      if (wkpath && !loaded[wkpath]) {
        const rdeps = await resolveDeps(wkpath, loaded);
        for (const [k, v] of Object.entries(rdeps)) {
          loaded[k] = v;
        }
      }
    } else if (v.startsWith(".")) {
      delete deps[k];
      if (!loaded[join(path, v)]) {
        const rdeps = await resolveDeps(join(path, v), loaded);
        for (const [k, v] of Object.entries(rdeps)) {
          loaded[k] = v;
        }
      }
    }
  }

  const final = { ...loaded, ...deps };
  if (!cache) {
    for (const key of Object.keys(final)) {
      if (key.startsWith(join(path, "..", ".."))) delete final[key];
    }
  }
  return final;
};

const getWorkspace = async (name: string) => {
  const dirs = ["pkgs", "app"];
  const cwdsplit = process.cwd().split(sep);
  const root = (
    cwdsplit.includes(".output")
      ? cwdsplit.slice(0, cwdsplit.length - 2)
      : cwdsplit
  ).join(sep);
  for (const dir of dirs) {
    if (await existsAsync(join(root, dir, name))) {
      return join(root, dir, name);
    }
  }
  return false;
};
