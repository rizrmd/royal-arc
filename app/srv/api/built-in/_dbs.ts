import { root } from "service";
import { DBArg } from "svc-db/src/glbdb";
import { apiContext } from "service-srv";

export const _ = {
  url: "/_dbs/:dbName/:action",
  async api(dbName: any, action?: string) {
    const { req, res } = apiContext(this);

    const body = (await req.json()) as DBArg;
    try {
      const result = await root.action(dbName as "db").query(body);
      res.json(result);
    } catch (e: any) {
      res.sendStatus(500);
      console.error(e);
      res.json(e);
      console.error(e);
    }
  },
};
