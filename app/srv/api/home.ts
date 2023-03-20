import { apiContext } from "service-srv";
export const _ = {
  url: "/home",
  async api() {
    const { req, res } = apiContext(this);

    return "hello world";
  },
};
