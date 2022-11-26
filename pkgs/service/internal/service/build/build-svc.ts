import { _names, _path } from "gen";
import { createReadStream } from "fs";
import { join, sep } from "path";
import picocolors from "picocolors";
import { buildSvcNode } from "./build-svc-node";

export const buildSvc = async (name: _names, outPath: string) => {
  const cwdsplit = process.cwd().split(sep);
  const root = (
    cwdsplit.includes(".output")
      ? cwdsplit.slice(0, cwdsplit.length - 2)
      : cwdsplit
  ).join(sep);
  const indexPath = join(root, _path[name]);
  const fline = await readFirstLine(indexPath);
  let runtime = "node";
  if (!fline.startsWith("#!/usr/bin/env")) {
    console.log(
      picocolors.yellow(`WARNING:`),
      `Assuming runtime is node in ${
        _path[name]
      }\n       ➥ Please put "#!/usr/bin/env node" at first line of that file.`,
    );
  } else {
    runtime = fline.split(`#!/usr/bin/env`).pop()?.trim() || "node";
  }

  if (runtime === "node") {
    return await buildSvcNode(name, outPath);
  }
};

const readFirstLine = (file: string) => {
  return new Promise<string>((resolve, reject) => {
    const rs = createReadStream(file, { encoding: "utf8" });
    let acc = "";
    let pos = 0;
    let index: number;

    rs.on("data", function (chunk) {
      index = chunk.indexOf("\n");
      acc += chunk;
      index !== -1 ? rs.close() : (pos += chunk.length);
    });
    rs.on("close", function () {
      resolve(acc.slice(0, acc.indexOf("\n")));
    });
    rs.on("error", function (err) {
      reject(err);
    });
  });
};
