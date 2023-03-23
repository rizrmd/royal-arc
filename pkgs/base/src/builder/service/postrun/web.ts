import { dir } from "dir";
import padEnd from "lodash.padend";
import { connectRPC } from "rpc";
import { webAction } from "service-web/src/action";
import { spawn } from "child_process";
import { baseGlobal } from "../../../action";
import { join } from "path";
import { removeAsync } from "fs-jetpack";

export const postRunWeb = (name: string) => {
  connectRPC<typeof webAction>(`svc.${name}`, { waitConnection: true }).then(
    async (rpc) => {
      let entry = await rpc.getEntry();

      await removeAsync(dir.root(`.output/app/${name}/public`));
      const args = [
        join(..."node_modules/parcel/lib/bin.js".split("/")),
        "watch",
        entry,
        "--no-hmr",
        "--dist-dir",
        dir.root(`.output/app/${name}/public`),
      ];
      baseGlobal.parcels.add(
        spawn("node", args, {
          cwd: dir.root(`app/${name}`),
          stdio: ["ignore", "inherit", "inherit"],
        })
      );
    }
  );
};
