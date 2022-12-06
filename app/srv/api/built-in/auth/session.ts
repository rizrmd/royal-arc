import { apiContext, session } from "royal";
export const _ = {
  url: "/_session",
  async api(name: string) {
    const { req } = apiContext(this);
    return session.get(req) || {};
  },
};
