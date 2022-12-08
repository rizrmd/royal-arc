import { spawn } from "child_process";
import { join } from "path";
import { existsAsync } from "service";
import { runPnpm } from "service/internal/service/build/run-pnpm";
import { g } from "../global";
import { getWebDirs } from "./utils";

export const viteServe = async () => {
  for (const [webName, dir] of Object.entries(await getWebDirs())) {
    const viteCmd = /^win/.test(process.platform)
      ? join(dir, "node_modules", ".bin", "vite.cmd")
      : join(dir, "node_modules", ".bin", "vite");

    if (!await existsAsync(viteCmd)) {
      if (!await existsAsync(join(dir, "node_modules"))) {
        await runPnpm(["i"], dir);
      } else {
        continue;
      }
    }

    const vite = spawn(
      viteCmd,
      {
        cwd: dir,
        env: {
          ...process.env,
          FORCE_COLOR: "1",
        },
      },
    );
    g.vite[webName] = { child: vite, streaming: false, host: "" };

    const stream = (e: Buffer) => {
      if (g.vite[webName].streaming) {
        process.stdout.write(e);
        return;
      }
      const data = e.toString("utf-8");
      const lines = data.split("\n");
      for (let lineraw of lines) {
        const line = lineraw?.replace(
          /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
          "",
        ); // remove color

        if (line.trim()) {
          if (line.indexOf("Network:") >= 0) {
            setTimeout(() => {
              g.vite[webName].streaming = true;
            }, 1000);
          }
          if (line.indexOf("Local: ") >= 0) {
            const urlraw = line.split("Local: ")[1].trim().split(" ").shift();
            if (urlraw) {
              g.vite[webName].host = urlraw;

              const url = new URL(urlraw);
              g.ports[webName] = parseInt(url.port);
            }
          }
        }
      }
    };
    vite.stdout.on("data", stream);
    vite.stderr.on("data", stream);
  }
};
