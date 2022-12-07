import fs from "fs";
import git from "isomorphic-git";
import { join } from "path";
import { readAsync, writeAsync } from "../export";
import fetch from "node-fetch";

export const isRoyalLatest = async () => {
  const cfg = await git.getConfig({
    fs,
    dir: process.cwd(),
    path: "remote.origin.url",
  });
  if (cfg !== "https://github.com/rizrmd/royal-arc.git") {
    const json = await (await fetch(
      `https://raw.githubusercontent.com/rizrmd/royal-arc/main/pkgs/ver.json`,
    )).json() as any;
    const ver = await readAsync(
      join(process.cwd(), "pkgs", "ver.json"),
      "json",
    ) as {
      commit: { id: string; msg: string };
    };

    if (ver.commit.id !== json.commit.id) {
      console.log(`\
New version available at: https://github.com/rizrmd/royal-arc
❯ ${json.commit.msg}`);
    }
  }
};
