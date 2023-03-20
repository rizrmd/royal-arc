import { apiContext } from "service-srv";

export const _ = {
  url: "/fakfa",
  async api() { 
    const { req, res } = apiContext(this);
    return "tanggul";
  },
};  