import { _names } from "gen";
import { ex } from "./global-ex";

export const cleanupExpress = (current: {
  serviceName: _names;
  pid: string;
}) => {
  return new Promise<Error | void>((resolve) => {
    if (ex.server && ex.server.listening) {
      ex.server.close(resolve);
    } else {
      resolve();
    }
  });
};