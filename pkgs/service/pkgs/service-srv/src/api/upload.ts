import { extname, join } from "path";
import { format } from "date-fns";

export type UploadedFile = {
  data: ArrayBuffer;
  name: string;
  filename: string;
  type: string;
};

export const generateUploadPath = (
  file: { name: string; filename: string; type: string },
  path: string
) => {
  const date = new Date();
  const subdir = join(
    format(date, "yyyy-LL").toLowerCase(),
    format(date, "dd")
  );
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const filename = file.name + "-" + uniqueSuffix + extname(file.filename);

  let mode = "_file";
  if (file.type.includes("image")) {
    mode = "_img";
  }

  return {
    url: [`/${mode}`, subdir, filename].join("/"),
    path: join(path, subdir, filename),
  };
};
