import { format } from "date-fns";
import { appendFile } from "fs/promises";
import { extname, join } from "path";
import { apiContext, UploadedFile } from "royal";
import { dirAsync } from "service";

export const _ = {
  url: "/_upload",
  async api(name: string) {
    const { req, res } = apiContext(this);
    const result: string[] = [];
    if (req.body && Array.isArray(req.body)) {
      const path = join(process.cwd(), "..", "uploads");
      await dirAsync(path);
      for (const f of req.body) {
        if (f.data) {
          const file = f as UploadedFile;
          const upath = generateUploadPath(file, path);
          await appendFile(upath.path, Buffer.from(f.data));
          result.push([upath.url].join("/"));
        } 
      } 
    }
    return result;
  },
};

const generateUploadPath = (file: UploadedFile, path: string) => {
  const date = new Date();
  const subdir = join(
    format(date, "yyyy-LL").toLowerCase(),
    format(date, "dd"),
  );
  const uniqueSuffix = Date.now() + "-" +
    Math.round(Math.random() * 1E9);

  const filename = file.name + "-" + uniqueSuffix +
    extname(file.filename);

  let mode = "_file";
  if (file.type.includes("image")) {
    mode = "_img";
  }

  return {
    url: [`/${mode}`, subdir, filename].join("/"),
    path: join(path, subdir, filename),
  };
};
