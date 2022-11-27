import { spawnSync } from "child_process";
import { join } from "path";
import picocolors from "picocolors";
import { existsAsync, moveAsync, removeAsync } from "service";
import { getWebDirs } from "./utils";

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
      await moveAsync(
        join(dir, "build"),
        join(target),
      );
    }
  }
};
