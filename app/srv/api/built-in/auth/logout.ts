import { apiContext, session } from "royal";
export const _ = {
  url: "/_logout",
  async api(name: string) {
    const { res, req } = apiContext(this);

    const current = session.get(req);
    if (current) {
      res.sendHeader("set-cookie", `${session.cookieKey}=;`);
    }
    return { "status": "logged-out" };
  }, 
};
