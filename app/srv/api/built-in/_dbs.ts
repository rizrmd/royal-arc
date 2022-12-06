import { apiContext, runDB } from "royal";
export const _ = {
  url: "/_dbs/:name/*",
  async api(name: string) {
    const { req, res } = apiContext(this);
    await runDB(name, req, res);
  },
};
