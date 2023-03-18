import chalk from "chalk";
import { existsAsync, readAsync, writeAsync } from "fs-jetpack";
import { dirname, join } from "path";

export const shouldInstall = async (path: string, silent: boolean = false) => {
  const dir = dirname(path);
  let pkg = {} as any;
  try {
    let pkg = await readAsync(path, "json");
  } catch (e) {}
  
  let shouldInstall = false;
  await Promise.all(
    ["dependencies", "devDependencies"].map(async (e) => {
      if (!pkg[e]) return;
      for (const [k, v] of Object.entries(pkg[e])) {
        if (!(await existsAsync(join(dir, "node_modules", k)))) {
          if (silent === false) {
            console.log(
              `module ${chalk.cyan(k)} not found in ${join(
                dir,
                "node_modules"
              ).substring(process.cwd().length + 1)}`
            );
          }
          shouldInstall = true;
        }
        if (v === "*") {
          try {
            const res = await fetch(
              `https://data.jsdelivr.com/v1/packages/npm/${k}/resolved`
            );
            const json = await res.json();
            pkg[e][k] = json.version;
            if (silent === false) {
              console.log(
                `found ${k} = "*" in ${path.substring(
                  process.cwd().length + 1
                )}`
              );
            }

            shouldInstall = true;
          } catch (e) {}
        }
      }
    })
  );

  if (shouldInstall) {
    await writeAsync(path, pkg, { jsonIndent: 2 });
  }
  return shouldInstall;
};
