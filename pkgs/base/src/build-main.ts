import { bundle } from "bundler";
import { dir } from "dir";

(async () => {
  const basePath = dir.root(".output/.cache/base/main.js");

  await bundle({
    input: dir.root("pkgs/base/src/main.ts"),
    output: basePath,
    incremental: false,
  });
})();
