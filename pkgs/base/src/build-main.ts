import { bundle, runner } from "bundler";
import { dir } from "dir";
import { existsAsync } from "fs-jetpack";

(async () => {
  process.removeAllListeners("warning");

  const mainPath = dir.root(".output/.cache/base/main.js");

  await bundle({
    input: dir.root("pkgs/base/src/main.ts"),
    output: mainPath,
  });

})();
