import { dirname, join, sep } from "path";
import { dirAsync, existsAsync, writeAsync } from "service";

export const scaff = async (
  arg: Record<string, string | object>,
  root: string,
) => {
  let shouldInstallDep = false;
  for (const [k, v] of Object.entries(arg)) {
    if (!k) continue;

    const path = join(root, k.replace(/\//ig, sep));
    await dirAsync(dirname(root));
    if (!await existsAsync(path)) {
      await writeAsync(path, v);
      shouldInstallDep = true;
    }
  } 

  return shouldInstallDep;
};
