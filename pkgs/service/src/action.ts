import { SERVICE_NAME } from "./types";
import { runner } from "bundler";
import { dir } from "dir";
export const action = {
  async start(arg: { name: SERVICE_NAME; multiInstance?: boolean }) {
    return await runner.run({
      path: dir.path(`${arg.name}/index.js`),
      cwd: process.cwd(),
      runningMarker(stdout) {
        if (stdout.trim() === "::RUNNING::") {
          return true;
        } else {
          process.stdout.write(stdout);
          return false;
        }
      },
    });
  },
  async restart(arg: { name: SERVICE_NAME; pid?: string }) {
    return await runner.restart(dir.path(`${arg.name}/index.js`));
  },
};
