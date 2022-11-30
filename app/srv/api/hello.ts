import { apiContext } from "royal";

export const _ = {
  url: "/hello/:name?",
  async api(name: string) {
    const ctx = apiContext(this);
    return { hello: name || "" };
  },
};
