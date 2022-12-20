import { spawnSync } from "child_process";
import { join } from "path";
import picocolors from "picocolors";
import { existsAsync, moveAsync, readAsync, removeAsync, writeAsync } from "service";
import { replaceBodyDev } from "../uws/tools";
import { getWebDirs } from "./utils";
import config from "../../../config";
import { g } from "../global";

export const viteBuild = async (targetDir?: string) => {
  for (const [webName, dir] of Object.entries(await getWebDirs())) {
    const viteCmd = /^win/.test(process.platform)
      ? join(dir, "node_modules", ".bin", "vite.cmd")
      : join(dir, "node_modules", ".bin", "vite");

    if (!await existsAsync(viteCmd)) break;

    console.log(`\n── ${picocolors.green(webName.toUpperCase())} › Building`);
    spawnSync(
      viteCmd,
      ["build", "--clearScreen=false"],
      {
        cwd: dir,
        env: {
          ...process.env,
          FORCE_COLOR: "1",
        },
        stdio: "inherit",
      },
    );
    console.log(`── ${picocolors.green(webName.toUpperCase())} › Done`);
    console.log("\n");
    const targetDefault = join(dir, "..", "..", ".output", "app");
    const target = join(targetDir || targetDefault, "client", webName);
    if (await existsAsync(target)) {
      await removeAsync(target);
    }
    if (await existsAsync(join(dir, "build"))) {
      const indexHtml = await readAsync(join(dir, "build", "index.html"));

      const conf = (await config)[g.serverName][g.mode];
      const srvurl = conf["srv"] ? conf["srv"].url : conf[webName].url;
      await writeAsync(
        join(dir, "build", "index.html"),
        replaceBodyDev(
          indexHtml,
          conf[webName].url,
          srvurl,
        ),
      );

      await moveAsync(
        join(dir, "build"),
        join(target),
      );
    }
  }
};
