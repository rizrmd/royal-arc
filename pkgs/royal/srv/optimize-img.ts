import get from "lodash.get";
import sharp, { FitEnum } from "sharp";

export const optimizeImage = async (
  path: string,
  target: string,
  conf: {
    w: number;
    h: number;
    fit: keyof FitEnum;
  }
) => {
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
    await sharp(path)
      .resize({
        withoutEnlargement: true,
        width: conf.w,
        height: conf.h,
        fit: conf.fit,
      })
      .toFormat("jpeg", { progressive: true, quality: 70 })
      .toFile(target);
  } else if (path.endsWith(".png")) {
    await sharp(path)
      .resize({
        withoutEnlargement: true,
        width: conf.w,
        height: conf.h,
        fit: conf.fit,
      })
      .toFormat("png", { progressive: true, quality: 70 })
      .toFile(target);
  } else if (path.endsWith(".gif")) {
    await sharp(path)
      .resize({
        withoutEnlargement: true,
        width: conf.w,
        height: conf.h,
        fit: conf.fit,
      })
      .toFormat("gif")
      .toFile(target);
  }
};

export const optimizeImageConf = (opt: any) => {
  return {
    w: parseInt(get(opt, "w") || "1920"),
    h: parseInt(get(opt, "h") || "1440"),
    fit: get(opt, "fit") || "cover",
  };
};
