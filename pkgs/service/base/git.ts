import fs from "fs";
import git from "isomorphic-git";
import { join } from "path";
import { readAsync, writeAsync } from "../export";
import fetch from "node-fetch";

export const gitMark = async () => {
  const cfg = await git.getConfig({
    fs,
    dir: process.cwd(),
    path: "remote.origin.url",
  });
  if (cfg === "https://github.com/rizrmd/royal-arc.git") {
    let commits = await git.log({
      fs,
      dir: process.cwd(),
      depth: 1,
      ref: "main",
    });

    await writeAsync(join(process.cwd(), "pkgs", "ver.json"), {
      commit: {
        id: Math.round(Date.now() / 1000),
        msg: commits[0].commit.message,
      },
    });
  } else {
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
  Old ID: ${ver.commit.id}
  New ID: ${json.commit.id}`);
    }
  }
};
