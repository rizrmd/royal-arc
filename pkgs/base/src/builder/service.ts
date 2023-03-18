import { bundle, runner } from "bundler";
import { dir } from "dir";
import { action } from "../../../service/src/action";
import { RPCActionResult } from "rpc/src/types";

export const buildService = async (
  name: string,
  arg: {
    watch: boolean;
    app: { path: string; cwd: string };
    rpc: RPCActionResult<typeof action>;
  }
) => {
  const app = arg.app;
  const rpc = arg.rpc;
  if (
    !(await bundle({
      input: dir.root(`app/${name}/main.ts`),
      output: dir.root(`.output/app/${name}/index.js`),
      pkgjson: dir.root(`.output/app/${name}/package.json`),
      watch: arg.watch
        ? async (w, e, b) => {
            if (b && b.type === "buildSuccess" && runner.list[app.path]) {
              // todo: told app to restart this service
              rpc.restart(name as any)
            }
          }
        : undefined,
    }))
  ) {
    console.log(`build service ${name} failed`);
  }
};
