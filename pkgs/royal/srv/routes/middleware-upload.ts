import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { extname, join } from "path";
import { format } from "date-fns";
import { dirAsync } from "service";

const g = global as unknown as {
  multerPath: string;
  multerDate: string;
  multerInstance: ReturnType<typeof multer>;
};

export const middlewareUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (g.multerDate !== format(new Date(), "dd MMM yyyy")) {
    const date = new Date();
    g.multerPath = join(
      process.cwd(),
      "..",
      "uploads",
      format(date, "yyyy-LL").toLowerCase(),
      format(date, "dd"),
    );

    await dirAsync(g.multerPath);
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, g.multerPath);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(
          null,
          file.fieldname + "-" + uniqueSuffix +
            extname(file.originalname),
        );
      },
    });
    g.multerInstance = multer({ storage });
  }
  const upload = g.multerInstance.any();

  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    next();
  });
};
