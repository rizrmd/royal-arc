import { _names, _path } from "gen";
import capitalize from "lodash.capitalize";
import picocolors from "picocolors";
import { getRuntime } from "../../rpc/get-runtime";
import { rawLog } from "../../rpc/raw-log";
import { buildApp } from "./build-app";
import { buildSvc } from "./build-svc";
import { runPnpm } from "./run-pnpm";

export const buildAll = async (targetDir?: string, skipDep?: boolean) => {
  const target = targetDir || process.cwd();

  const pending: Promise<any>[] = [];
  rawLog(`Building: ` + picocolors.blue("App"));
  pending.push(buildApp(target));

  for (const [_name] of Object.entries(_path)) {
    const name = _name as _names;
    rawLog(" " + picocolors.green(capitalize(name)));
    pending.push(buildSvc(name, target));
  }
  console.log("");

  await Promise.all(pending);
  if (skipDep) {
    await (runPnpm(["i"], process.cwd()));
  }
  console.log("");
};
