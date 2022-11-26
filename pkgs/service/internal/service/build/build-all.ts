import { _names, _path } from "gen";
import capitalize from "lodash.capitalize";
import { join } from "path";
import picocolors, { green, magenta } from "picocolors";
import { g } from "../../global";
import { buildApp } from "./build-app";
import { buildSvc } from "./build-svc";
import { dirAsync, removeAsync } from "./jetpack";
import { runPnpm } from "./run-pnpm";

export const buildAll = async () => {
  const mode = g.mode;
  if (mode !== "dev") {
    const cwd = process.cwd();
    process.chdir(join(process.cwd(), ".."));
    await removeAsync(cwd);
    await dirAsync(cwd);
    process.chdir(cwd);
  }

  const pending: Promise<any>[] = [];
  Bun.write(Bun.stdout, `Building: ` + picocolors.blue("App"));
  pending.push(buildApp(process.cwd()));

  for (const [_name] of Object.entries(_path)) {
    const name = _name as _names;
    Bun.write(Bun.stdout, " " + picocolors.green(capitalize(name)));
    pending.push(buildSvc(name, process.cwd()));
  }
  console.log("");

  await Promise.all(pending);
  await (runPnpm(["i"], process.cwd()));

  console.log("");
};
