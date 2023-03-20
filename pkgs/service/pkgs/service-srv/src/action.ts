import { glbsrv } from "./glbsrv";

export const srvAction = {
  serverPort: async () => {
    return glbsrv.port;
  },
  publicURL: async () => {
    return glbsrv.serverURL;
  },
};
