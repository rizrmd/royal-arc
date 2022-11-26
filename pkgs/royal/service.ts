import { _names, _path } from "gen";
import picocolors from "picocolors";
import { root } from "service";
import { TSingleConfig, TSingleConfigOutput } from "./config";
import { SrvParams } from "./export";
import { g } from "./global";

export const stopServices = async (reason?: string) => {
  const conf = g.config[g.serverName][g.mode];
  const pendingSrv: Record<string, true> = {};
  for (let [_name, _] of Object.entries(_path)) {
    const name = _name as _names;
    if (name.startsWith("db")) {
      await stopService(name, reason);
    } else if (name.startsWith("srv")) {
      pendingSrv[name] = true;
    }
  }

  for (let [_name, _] of Object.entries(conf)) {
    const name = _name as _names;
    if (name.startsWith("web")) continue;
    const svc = _path[name];
    if (svc) {
      if (name.startsWith("srv")) {
        delete pendingSrv[name];
        await stopService(name, reason);
      } else {
        await root.service.start(name);
      }
    }
  }
};

export const startServices = async () => {
  try {
    const conf = g.config[g.serverName][g.mode];
    const pendingSrv: Record<string, true> = {};
    for (let [_name, _] of Object.entries(_path)) {
      const name = _name as _names;
      if (name.startsWith("db")) {
        await startService(name);
      } else if (name.startsWith("srv")) {
        pendingSrv[name] = true;
      }
    }

    for (let [_name, _] of Object.entries(conf)) {
      const name = _name as _names;
      if (name.startsWith("web")) continue;
      const svc = _path[name];
      if (svc) {
        if (name.startsWith("srv")) {
          delete pendingSrv[name];
          await startService(name);
        } else {
          await root.service.start(name);
        }
      }
    }
 
    if (Object.keys(pendingSrv).length > 0) {
      console.log(
        picocolors.yellow("WARNING:"),
        `Service ${Object.keys(pendingSrv)} not started, config not found`,
      );
    }
  } catch (_) {}
};
export const startService = async (name: _names) => {
  return await root.service.start(name, {
    current: { serviceName: name, pid: name },
    global: {
      config: g.config,
      mode: g.mode,
      serverName: g.serverName,
      ports: g.ports,
      deployKey: g.deployKey,
    },
  } as SrvParams);
};

export const stopService = async (name: _names, reason?: string) => {
  return await root.service.stopAll(name, reason);
};
