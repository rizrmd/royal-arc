import { statSync } from "fs";
import { existsAsync, removeAsync } from "service";
import { readFile } from "fs/promises";
import padEnd from "lodash.padend";
import { join } from "path";
import { cwd } from "process";
import { zip } from "zip-a-folder";
import config from "../../../../config";
// import { build } from '../../build'
import { g } from "../../global";
import { plog } from "../tools";

export const panelBuild = async (to: typeof g.mode) => {
  try {
    // g.publishTo = to
    const buildDir = join(cwd(), "..", "build");
    const buildZip = join(cwd(), "..", "build.zip");

    plog("\n\nPublishing: Dev → " + capitalize(to));

    if (!(await existsAsync(buildZip))) {
      progress(5, "Cleaning Build Dir");
      if (await existsAsync(buildDir)) {
        await removeAsync(buildDir);
      }

      await removeAsync(buildZip);

      progress(10, "Building Production");
      // await build(buildDir, join(cwd(), '..', '..'), to)

      progress(40, "Compressing Build");
      await zip(buildDir, buildZip);
      await removeAsync(buildDir);
    }

    const stats = statSync(buildZip);
    const fileSizeInBytes = stats.size;
    const fileSizeInMb = Math.round((fileSizeInBytes / (1024 * 1024)) * 10) /
      10;
    progress(50, `Sending Deploy File: ${fileSizeInMb}Mb`);

    const _conf = (await config)[g.serverName];
    const _to = to as keyof typeof _conf;
    let puburl = (_conf[_to] as any).boot.url;
    puburl = puburl.endsWith("/") ? puburl : `${puburl}/`;

    try {
      const st = await readFile(buildZip);
      // await request(`${puburl}api/receive-deploy`, {
      //   body: st,
      //   throwOnError: true,
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/zip",
      //     "content-length": st.length.toString(),
      //   },
      // });
      await removeAsync(buildZip);
    } catch (e: any) {
      console.log(e.message);
    }
    plog(` ➤ Local build finished`);

    // g.publishTo = ''
  } catch (e) {
    // g.publishTo = ''

    plog(e);
  }
};

export const progress = (percent: number, desc: string) => {
  // g.progress.percent = percent
  // g.progress.desc = desc

  plog(`Deploying ${padEnd(percent + "%", 3, " ")} ${desc}`);
  panelBroadcast({
    type: "publish",
    // name: g.buildMode,
    // publishTo: g.publishTo,
    percent,
    desc,
  });
};

export const panelBroadcast = (
  args: Record<string, any> & { type: string },
) => {
  if (g.panelWS) {
    try {
      for (let ws of g.panelWS) {
        ws.send(JSON.stringify(args));
      }
    } catch (e) {
      console.log(e);
    }
  }
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}
