import { apiContext } from "royal";
export const _ = {
  url: "/_dbs/:name/*",
  async api(name: string) {
    const { req, res } = apiContext(this);

    console.log(req.params);
  },
};
