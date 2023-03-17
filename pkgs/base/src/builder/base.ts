import { bundle } from "bundler";
import { dir } from "dir";
import { writeAsync } from "fs-jetpack";
import { dirname, join } from "path";

(async () => {
  const basePath = dir.root(".output/.cache/base/main.js");
  if (
    await bundle({
      input: dir.root("pkgs/base/src/main.ts"),
      output: basePath,
      incremental: false,
      pkgjson: join(dirname(basePath), "package.json"),
    })
  ) {
    await writeAsync(
      join(dirname(basePath), "pnpm-workspace.yaml"),
      `
packages:
  - ./*`
    );

    process.exit(0);
  } else {
    process.exit(1);
  }
})();
