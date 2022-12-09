import { g } from "royal";
import { current } from "service";

//coba test comment
export const action = () => ({
  port() {
    return g.ports[current.serviceName];
  },
});
