import { g } from "royal";
import { current } from "service";

export const action = () => ({
  port() {
    return g.ports[current.serviceName];
  },
});
