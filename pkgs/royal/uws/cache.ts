import mime from "mime-types";
import { join } from "path";
import { readAsync } from "service";
import { walkDir } from "../web/utils";

export const fillCache = async (dir: string) => {
  const files = await walkDir(dir);
  const cache = {};
  for (const file of files) {
    let mode = "buffer" as any;
    if (
      [".js", ".css", ".html", ".json"].filter((e) => file.endsWith(e)).length >
      0
    ) {
      mode = "utf8";
    }

    cache[file.substring(dir.length)] = {
      src: await readAsync(file, mode),
      mime: mime.lookup(file),
    };
  }

  cache['/'] = cache[join(dir, "index.html").substring(dir.length)];
  cache[''] = cache[join(dir, "index.html").substring(dir.length)];
  return cache;
};
