import { apiContext } from "royal";
export const _ = {
  url: "/_pdf",
  async api(name: string) {
    const ctx = apiContext(this);
    return { hello: name || "" };
  },
};
