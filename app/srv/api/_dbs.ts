import { apiContext } from "royal";
export const _ = {
  url: "/_dbs/",
  async api(name: string) {
    console.log("w wo");
    const ctx = apiContext(this);
    return { hello: name || "" };
  },
}; 
 