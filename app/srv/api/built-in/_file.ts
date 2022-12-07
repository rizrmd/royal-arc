import { join, resolve } from "path";
import { apiContext } from "royal";
import { existsAsync } from "service";
export const _ = {
  url: "/_file/*",
  async api() {
    const { req, res } = apiContext(this);
    const rpath = req.params["*"];
    const upath = join(process.cwd(), "..", "content", "upload");
    const path = resolve(join(upath, rpath));
    if (path.startsWith(upath)) {
      if (await existsAsync(path)) {
        await res.sendFile(path);
        return;
      }
    }
    res.sendStatus(404);
    res.send({ "response": "not found" });
  },
};
