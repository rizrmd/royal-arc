import { connectRPC } from "rpc";
import { webAction } from "service-web/src/action";
import { Parcel } from "@parcel/core";
import { dir } from "dir";
import chalk from "chalk";
import padEnd from "lodash.padend";

export const postBuildWeb = (name: string) => {
  connectRPC<typeof webAction>(`svc.${name}`, { waitConnection: true }).then(
    async (rpc) => {
      let entry = await rpc.getEntry();
      if (entry.startsWith("./")) entry = entry.substring(2);

      try {
        let bundler = new Parcel({
          entries: dir.root(`app/${name}/${entry}`),
          defaultConfig: dir.root(
            `pkgs/base/src/builder/service/postbuild/parcel.config.json`
          ),
          shouldAutoInstall: true,
          targets: {
            web: {
              distDir: dir.root(`.output/app/${name}/public`),
            },
          },
        });

        let first = false;
        const t0 = performance.now();
        await bundler.watch((err, ev) => {
          if (!err && ev && ev.type === "buildSuccess") {
            const parcel = `\n${chalk.magenta(`Parcel `)} ${padEnd(
              chalk.green(name),
              22
            )}`;

            if (!first) {
              first = true;
              console.log(
                `${parcel} ${formatDuration(performance.now() - t0, 1)}`
              );
            } else {
              console.log(`${parcel} ${formatDuration(ev.buildTime)}`);
            }
          } else {
            console.log(err);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  );
};

const formatDuration = (ms: number, pad?: number) => {
  if (ms > 1000) {
    return `${padEnd((ms / 1000).toFixed(3) + "", pad || 6, " ")} s`;
  } else {
    return `${padEnd(ms.toFixed(2) + "", pad || 6, " ")} ms`;
  }
};
