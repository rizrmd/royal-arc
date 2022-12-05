import { apiContext } from "royal";
export const _ = {
  url: "/moko",
  async api(name: string) {
    const ctx = apiContext(this);

    ctx.res.redirect('http://localhost:4500/x')
    return { hello: name || "" };
  },
};
