import { SERVICE_NAME } from "./types";
import { runner } from "bundler";
import { dir } from "dir";
export const action = {
  async start(arg: { name: SERVICE_NAME; multiInstance?: boolean }) {
    const run = await runner.run({
      path: dir.path(`${arg.name}/index.js`),
      cwd: process.cwd(),
    });
  },
  async restart(arg: { name: SERVICE_NAME; pid?: string }) {
    console.log('kau kan mencintai ku')
  },
};
