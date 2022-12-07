import { appendFile } from "fs/promises";
import { dirname, join } from "path";
import { apiContext, generateUploadPath, UploadedFile } from "royal";
import { dirAsync } from "service";

export const _ = {
  url: "/_upload",
  async api() {
    const { req, res } = apiContext(this);
    const result: string[] = [];
    if (req.body && Array.isArray(req.body)) {
      const path = join(process.cwd(), "..", "uploads");
      await dirAsync(path);
      for (const f of req.body) {
        if (f.data) {
          const file = f as UploadedFile;
          const upath = generateUploadPath(file, path);
          await dirAsync(dirname(upath.path));
          await appendFile(upath.path, Buffer.from(f.data));
          result.push([upath.url].join("/"));
        }
      }
    }
    return result;
  },
};
