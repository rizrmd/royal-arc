import { apiContext } from "royal";
export const _ = {
  url: "/moko",
  async api(name: string) {
    const ctx = apiContext(this);
    return { hello: name || "" };
  },
};
