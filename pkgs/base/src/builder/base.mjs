import { buildSync } from "esbuild";
import { readFile } from "fs/promises";
import { join } from "path";

(async () => {
  const base = join(process.cwd(), "pkgs", "base");
  try {
    const pkg = JSON.parse(await readFile(join(base, "package.json"), "utf-8"));
    buildSync({
      entryPoints: [join(base, "src", "main.ts")],
      outfile: join(base, "main.js"),
      platform: "node",
      format: "iife",
      bundle: true,
      sourcemap: true,
      external: ['esbuild', ...pkg.external],
    });
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
  // const basePath = dir.root("pkgs/base/main.js");
  // if (
  //   await bundle({
  //     input: dir.root("pkgs/base/src/main.ts"),
  //     output: basePath,
  //     incremental: false,
  //   })
  // ) {
  //   process.exit(0);
  // } else {
  //   process.exit(1);
  // }
})();
