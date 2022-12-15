import { join } from "path";
import picocolors from "picocolors";
import { removeAsync, writeAsync } from "service";
import { buildAll } from "service/internal/service/build/build-all";
import { buildApp } from "service/internal/service/build/build-app";
import { zip } from "zip-a-folder";
import { g } from "../global";
import { reloadDb } from "../scaff/create-db";
import { reloadWeb } from "../scaff/create-web";
import { viteBuild } from "../web/build";
import fetch from "node-fetch";
import { stat } from "fs/promises";
import { createReadStream } from "fs";
import { DeployKey } from "../../../config";
export const deploy = async () => {
  const target = join(process.cwd(), "..", "deploy");
  console.log(`\n\n── BUILD: ${picocolors.magenta(g.mode.toUpperCase())}`);

  await buildApp(target);
  await reloadWeb();
  await buildAll(target, true);
  await viteBuild(target);
  await reloadDb(target);

  await writeAsync(join(target, "conf.json"), {
    mode: g.mode,
  });
  await zip(target, target + ".zip");
  await removeAsync(target);

  try {
    const conf = g.config[g.serverName][g.mode];
    console.log(
      `── UPLOAD ${picocolors.magenta(g.mode.toUpperCase())}: ${conf.srv.url}`,
    );
    await uploadDeployed(target);
  } catch (e) {
    console.log(`Upload failed: ${e.message}`);
  }

  // request exit, do not restart...
  process.exit(55);
};

const uploadDeployed = async (target: string) => {
  const conf = g.config[g.serverName][g.mode];

  if (conf && conf.srv) {
    const srv = new URL(conf.srv.url);

    let pathname = srv.pathname;
    if (srv.pathname.endsWith("/")) {
      pathname = srv.pathname.substring(0, srv.pathname.length - 1);
    }
    pathname += "/_deploy";
    srv.pathname = pathname;

    const readStream = createReadStream(target + ".zip");
    const fileSize = (await stat(target + ".zip")).size;

    const res = await fetch(srv.toString(), {
      method: "POST",
      headers: {
        "Content-length": fileSize + "",
        "Deploy-Key": encodeURIComponent(DeployKey)
      },
      body: readStream, // Here, stringContent or bufferContent would also work
    });
    console.log(await res.text(), srv.toString());
  } else {
    console.log(
      `Failed to deploy, configuration for "${g.mode}.srv" not found in config.ts`,
    );
  }
};
