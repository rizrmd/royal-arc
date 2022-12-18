import { apiContext, deployUploaded } from "royal";
import { DeployKey } from "../../../../config";

export const _ = {
  url: "/_deploy",
  async api() {
    const { req } = apiContext(this);

    if (req.headers["deploy-key"] !== encodeURIComponent(DeployKey)) {
      return { status: "unauthorized" };
    }

    if (req.body) {
      await deployUploaded(req.body);
    }
    return { status: "ok" };
  },
};
