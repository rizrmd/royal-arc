import { apiContext, session } from "royal";
export const _ = {
  url: "/_login",
  async api(username: string, password: string) {
    const { res, req } = apiContext(this);

    const current = session.get(req);
    if (!current) {
      const sdata = await session.new({ username });
      res.sendHeader("set-cookie", `${session.cookieKey}=${sdata.id};`);
      return sdata;
    }
    return current || {};
  },
};
