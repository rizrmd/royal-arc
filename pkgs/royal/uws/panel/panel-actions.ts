import cuid from "cuid";
import { g } from "../../global";
import { plog } from "../tools";
import { panelBuild } from "./panel-build";
import { sendForkMsg } from "./panel-to-service";

export const PanelActions = {
  async login(secret: string) {
    const pass = g.config[g.serverName].boot.panel?.password;
    if (pass === secret) {
      return { sid: cuid.slug() };
    } else {
      return {};
    }
  },
  async verify(sid: string) {
    plog(sid);
  },
  async getStdOut() {
    return g.panelStdOut;
  },
  async getCurrent() {
    return g.mode;
  },
  async getConfig() {
    return g.config[g.serverName];
  },
  async getPublishInfo() {
    return {
      publishTo: '',
      percent: 0,
      desc: '',
    }
  },
  async getProcessTree() {
    // return await service.root.tree()
  },
  async build(to: typeof g.mode) {
    // return await service.root.build(to);
  },
  async listServices() {
    return (await sendForkMsg("list-services")) as Record<
      string,
      Record<string, true>
    >;
  },
};
