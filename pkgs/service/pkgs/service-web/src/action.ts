import { web } from "./glbweb";
import { initSSR } from "./ssr";

export const webAction = {
  refresh: async (name: string) => {
    await initSSR();
    web.ws.forEach((ws) => {
      ws.send("hmr");
    });
  },
};
