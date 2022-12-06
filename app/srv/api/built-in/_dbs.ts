import { apiContext, runDB } from "royal";
import { DBArg } from "service";
export const _ = {
  url: "/_dbs/:dbName...:action",
  async api(dbName: string, action: string) {
    const { req, res } = apiContext(this);

    const body = req.body as DBArg;
    try {
      const result = await runDB(dbName, body);
      res.send(result);
    } catch (e) {
      res.sendStatus(500);
      res.send(e);
      console.error(e);
    }
  },
};
