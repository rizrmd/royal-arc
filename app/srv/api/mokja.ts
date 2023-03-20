import { apiContext } from "service-srv";

export const _ = {
  url: "/mokja",
  async api() {
    const { req, res } = apiContext(this);
    return "tanggul langin";
  },
};
