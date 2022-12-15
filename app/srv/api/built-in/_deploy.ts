import { apiContext } from "royal";
import { DeployKey } from "../../../../config";

export const _ = {
  url: "/_deploy",
  async api() {
    const { req, res } = apiContext(this);

    if (req.headers["deploy-key"] !== encodeURIComponent(DeployKey)) {
      return { status: "unauthorized" };
    }

    if (req.body) {
      console.log(req.body);
    }
    return { status: "ok" };
  },
};
