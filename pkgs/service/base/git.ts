import fs from "fs";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import { join } from "path";
import { readAsync, writeAsync } from "../export";

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
        id: commits[0].oid,
        msg: commits[0].commit.message,
      },
    });
  } else {
    const info = await git.getRemoteInfo({
      http,
      url: "https://github.com/rizrmd/royal-arc.git",
    });

    const ver = await readAsync(
      join(process.cwd(), "pkgs", "ver.json"),
      "json",
    ) as {
      commit: { id: string; msg: string };
    };

    if (ver.commit.id !== info.refs.heads.main) {
      console.log(`New version available at: github.com/rizrmd/royal-arc`);
    }
  }
};
