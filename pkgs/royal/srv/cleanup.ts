import { _names } from "gen";
import { us_listen_socket_close } from "uWebSockets.js";
import { ex } from "./global-ex";

export const cleanupExpress = (current: {
  serviceName: _names;
  pid: string;
}) => {
  return new Promise<Error | void>((resolve) => {
    if (ex.socket) {
      try {
        us_listen_socket_close(ex.socket);
        resolve();
      } catch (e) {
        resolve(e);
      }
    } else {
      resolve();
    }
  });
};
