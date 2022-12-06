import { apiContext, runDB } from "royal";
import { DBArg } from "service";
export const _ = {
  url: "/_dbs/:name/*",
  async api(name: string) {
    const { req, res } = apiContext(this);

    const body = req.body as DBArg;
    try {
      const result = await runDB(name, body);
      res.send(result);
    } catch (e) {
      res.sendStatus(500);
      res.send(e);
      console.error(e);
    }
  },
};
