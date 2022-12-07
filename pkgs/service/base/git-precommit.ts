import fs from "fs";
import git from "isomorphic-git";
import { join } from "path";
import { writeAsync } from "../export";

(async () => {
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
  }
})();
