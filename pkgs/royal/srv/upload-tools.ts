import { extname, join } from "path";
import { UploadedFile } from "./global-ex";
import { format } from "date-fns";

export const generateUploadPath = (file: UploadedFile, path: string) => {
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
