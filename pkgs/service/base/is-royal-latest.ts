import fs from "fs";
import git from "isomorphic-git";
import fetch from "node-fetch-commonjs";
import { join } from "path";
import { readAsync } from "../export";

export const isRoyalLatest = async () => {
  const cfg = await git.getConfig({
    fs,
    dir: process.cwd(),
    path: "remote.origin.url",
  });
  if (cfg !== "https://github.com/rizrmd/royal-arc.git") {
    try {
      const json = (await (
        await fetch(
          `https://raw.githubusercontent.com/rizrmd/royal-arc/main/pkgs/ver.json`
        )
      ).json()) as any;
      const ver = (await readAsync(
        join(process.cwd(), "pkgs", "ver.json"),
        "json"
      )) as {
        commit: { id: string; msg: string };
      };

      if (ver.commit.id !== json.commit.id) {
        console.log(`\n
New version available at: https://github.com/rizrmd/royal-arc
 ❯ ${json.commit.msg}
To upgrade, please run:
 ❯ node base upgrade\n\n`);
      }
    } catch (e) {}
  }
};
