import { bundle } from "bundler";
import { dir } from "dir";

(async () => {
  const basePath = dir.root("pkgs/base/main.js");
  if (
    await bundle({
      input: dir.root("pkgs/base/src/main.ts"),
      output: basePath,
      incremental: false,
    })
  ) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
