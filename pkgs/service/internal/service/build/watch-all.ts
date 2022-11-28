import { watch } from "chokidar";
import { BuildIncremental } from "esbuild";
import { _names } from "gen";
import { join } from "path";
import { root } from "../../../export";
import { g } from "../../global";
import { buildSvc } from "./build-svc";
import { recoverFromError } from "./build-svc-node";

const cwd = process.cwd();

export const watchAll = async () => {
  for (const [k, v] of Object.entries(g.node.build)) {
    rewatch(k as _names);
  }
};

const rewatch = (name: _names, files?: string[]) => {
  const b = g.node.build[name];
  if (b.metafile) {
    const w = watch(
      files ? files : Object.keys(b.metafile.inputs).map((e) => join(cwd, e)),
      {
        ignoreInitial: true,
        disableGlobbing: true,
      },
    );
    w.once("all", async () => {
      let inc: BuildIncremental = null as any;
      await new Promise<void>((done) => {
        const rebuild = async () => {
          try {
            inc = await b.rebuild();
            done();
          } catch (e: any) {
            recoverFromError(name, e, rebuild);
          }
        };
        rebuild()
      });

      if (inc && inc.metafile) {
        w.close();
        const files = Object.keys(inc.metafile.inputs).map((e) => join(cwd, e));
        rewatch(name, files);
        await root.service.stopAll(name, "Hot Reload");
      }
    });
  }
};
