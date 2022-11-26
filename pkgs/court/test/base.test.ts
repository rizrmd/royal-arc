import { spawn } from "bun";
import { describe, expect, it } from "bun:test";
import { join } from "path";
import { dir } from "../util/dir";

describe("base", () => {
  it("spawn app and it does not die in 300ms", async () => {
    const child = spawn({
      cmd: ["node", join(dir.root, "base")],
    });
    //wait 300ms then kill
    let killedNormally = false;
    setTimeout(() => {
      if (!child.killed) {
        killedNormally = true;
        child.kill();
      }
    }, 300);
    const code = await child.exited;
    if (!killedNormally) {
      expect(code).toBe(0);
    }
  });

  it("should generate gen module", async () => {
    //TODO: write test for this
  });
});
