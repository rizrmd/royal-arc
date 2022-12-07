import { basename, dirname, join, resolve } from "path";
import { apiContext, optimizeImage, optimizeImageConf } from "royal";
import { dirAsync, existsAsync } from "service";
export const _ = {
  url: "/_img/*",
  async api() {
    const { req, res } = apiContext(this);
    const rpath = req.params["*"];
    const upath = join(process.cwd(), "..", "uploads");
    const path = resolve(join(upath, rpath));
    if (path.startsWith(upath)) {
      if (await existsAsync(path)) {
        const conf = optimizeImageConf(req.query);

        const imgpath = join(
          dirname(path),
          "img",
          `${conf.w}x${conf.h}-${conf.fit}`,
          basename(path),
        );
        await dirAsync(dirname(imgpath));
        try {
          if (!await existsAsync(imgpath)) {
            await optimizeImage(path, imgpath, conf);
          }
          await res.sendFile(imgpath);
        } catch (e) {
          console.log(e);
          await res.sendFile(path);
        }
        return;
      }
    }
    res.sendStatus(404);
    res.send({ "response": "not found" });
  },
};
