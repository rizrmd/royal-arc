import { SERVICE_NAME } from "./types";
import { runner } from "bundler";

export const action = {
  async start(arg: { name: SERVICE_NAME; multiInstance?: boolean }) {
    console.log(arg, process.cwd());
  },
};
