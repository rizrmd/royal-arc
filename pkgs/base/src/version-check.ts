import chalk from "chalk";
import { format } from "date-fns";
import { dir } from "dir";
import { readAsync } from "fs-jetpack";

export const versionCheck = async () => {
  //check version on dev
  const version = await readAsync(dir.root("pkgs/version.json"), "json");
  fetch(`https://raw.githubusercontent.com/avolut/royal/main/pkgs/version.json`)
    .then(async (res) => {
      const remoteVersion = await res.json();
      setTimeout(async () => {
        try {
          if (remoteVersion.ts > version.ts) {
            console.log(`
📣 New version available: ${chalk.cyan(
              `v${format(new Date(remoteVersion.ts), "1.Md.hm")}`
            )} 
${chalk.reset(`
To upgrade, please run: 
  > ${chalk.underline(chalk.green(`node base upgrade`))}

If somehow upgrade failed you can rollback using
  > ${chalk.red(`node base rollback`)}
`)}
────────────────────────────────────────
`);
          } else {
            console.log(
              `\n👌 Royal is in latest version [ v${format(
                new Date(remoteVersion.ts),
                "1.Md.hm"
              )} ]\n`
            );
          }
        } catch (e) {}
      }, 5000);
    })
    .catch(() => {});
};
