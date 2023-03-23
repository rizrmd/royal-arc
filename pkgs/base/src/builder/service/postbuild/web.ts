import { connectRPC } from "rpc";
import { webAction } from "service-web/src/action";
import { Parcel } from "@parcel/core";
import { dir } from "dir";
import chalk from "chalk";

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
        setTimeout(() => {
          if (!first) {
            console.log(`\n✨ Parcel ${chalk.green(name)} building... `);
          }
        }, 2000);
        await bundler.watch((err, ev) => {
          if (!err && ev && ev.type === "buildSuccess") {
            if (!first) {
              first = true;
              console.log(
                `✨ Parcel ${chalk.green(name)} ${formatDuration(
                  performance.now() - t0
                )}`
              );
            } else {
              console.log(
                `✨ Parcel ${chalk.green(name)}  ${formatDuration(
                  ev.buildTime
                )}`
              );
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

const formatDuration = (ms: number) => {
  if (ms > 1000) {
    return `${(ms / 1000).toFixed(3)}s`;
  } else {
    return `${ms.toFixed(2)}ms`;
  }
};
