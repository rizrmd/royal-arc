import chalk from "chalk";
import { spawn } from "child_process";
import { dir } from "dir";
import { readAsync, removeAsync } from "fs-jetpack";
import { join } from "path";
import { baseGlobal } from "../../../action";
import { traverse } from "../../../scaffold/parser/traverse";

export const postRunWeb = async (name: string) => {
  const src = await readAsync(dir.root(`app/${name}/main.ts`), "utf8");

  let entry = "";
  if (src) {
    await traverse(src, (parent) => ({
      visitObjectExpression(n) {
        for (const p of n.properties) {
          if (
            p.type === "KeyValueProperty" &&
            p.key.type === "Identifier" &&
            p.key.value === "entry" &&
            p.value.type === "StringLiteral"
          ) {
            entry = p.value.value;
          }
        }
        return parent.visitObjectExpression(n);
      },
    }));
  }

  if (entry) {
    await removeAsync(dir.root(`.output/app/${name}/public`));
    const args = [
      join(..."node_modules/parcel/lib/bin.js".split("/")),
      baseGlobal.mode === "dev" ? "watch" : "build",
      entry,
      baseGlobal.mode === "dev" ? "--no-hmr" : "",
      "--dist-dir",
      dir.root(`.output/app/${name}/public`),
    ].filter((e) => e);
    const parcel = spawn("node", args, {
      cwd: dir.root(`app/${name}`),
      stdio: ["ignore", "inherit", "inherit"],
    });
    baseGlobal.parcels.add(parcel);

    if (baseGlobal.mode !== "dev") {
      await new Promise((resolve) => {
        parcel.on("exit", resolve);
      });
    }
  } else {
    console.error(
      `${chalk.red(`ERROR:`)} Property ${chalk.cyan(
        `entry`
      )} not found in: ${chalk.green(`app/${name}/main.ts`)}`
    );
  }
};
