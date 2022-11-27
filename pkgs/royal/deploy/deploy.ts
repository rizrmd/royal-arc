import { join } from "path";
import picocolors from "picocolors";
import { removeAsync, writeAsync } from "service";
import { buildAll } from "service/internal/service/build/build-all";
import { g } from "../global";
import { viteBuild } from "../web/build";
import { zip } from "zip-a-folder";

export const deploy = async () => {
  const target = join(process.cwd(), "..", "deploy");
  console.log(`\n\n── BUILD: ${picocolors.magenta(g.mode.toUpperCase())}`);
  await buildAll(target, true);
  await viteBuild(target);

  await writeAsync(join(target, "conf.json"), {
    mode: g.mode,
  });
  await zip(target, target + ".zip");
  await removeAsync(target);

  process.exit(55);
};
