import { listAsync } from "service";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

export const walkDir = async function (directory: string) {
  let fileList: string[] = [];
  try {
    const files = await readdir(directory);
    for (const file of files) {
      const p = join(directory, file);
      if ((await stat(p)).isDirectory()) {
        fileList = [...fileList, ...(await walkDir(p))];
      } else {
        fileList.push(p);
      }
    }
  } catch (e) {}

  return fileList;
};

export const getWebDirs = async () => {
  const dirs = ["app", "pkgs"];
  const result = {} as Record<string, string>;
  for (const name of dirs) {
    const dir = join(cwd(), "..", "..", name);
    const dirs = await listAsync(dir);
    if (dirs) {
      for (const webName of dirs) {
        if (
          (webName === "royal-panel" || webName.startsWith("web")) &&
          (await stat(join(dir, webName))).isDirectory()
        ) {
          result[webName] = join(dir, webName);
        }
      }
    }
  }
  return result;
};
