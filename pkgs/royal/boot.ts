import { _names, _path } from "gen";
import camelCase from "lodash.camelcase";
import padEnd from "lodash.padend";
import picocolors, { green } from "picocolors";
import { cwd } from "process";
import { root } from "service";
import { DeployKey } from "../../config";
import { TSingleConfig, TSingleConfigOutput } from "./config";
import { getDeployKey } from "./deploy/key";
import { g } from "./global";
import { stopAllWatcher } from "./scaff/cleanup";
import { devMode } from "./scaff/dev-mode";
import { startServices, stopServices } from "./service";
import { plog } from "./uws/tools";
import { createUWS } from "./uws/uws-creator";
import { viteBuild } from "./web/build";
import { viteServe } from "./web/serve";

export const boot = async () => {
  g.outpath = cwd();
  g.servers = {};
  g.ports = {};
  g.serverWS = new WeakMap();
  g.panelStdOut = "";
  if (!g.vite) {
    g.vite = {};
  }

  await stopAllWatcher();

  const conf = g.config[g.serverName][g.mode];
  const urls = {} as Record<string, URL>;
  const servers = {} as Record<string, Record<string, URL>>;
  if (!conf) {
    console.log(`Config for ${g.mode} not found!`);
    console.log("All services stopped!");
    return;
  }
  for (let [k, v] of Object.entries(conf)) {
    const url = new URL(v.run_url);
    if (url.protocol === "https:") {
      console.log(
        `ERROR: Cannot listen to ${v.run_url}. SSL is not developed yet.`,
      );
      process.exit(0);
    }

    if (!_path[k as _names] && !k.startsWith("web")) {
      console.log(
        picocolors.yellow(` › WARNING:`),
        `Skipping ${k} config, service not found`,
      );
      continue;
    }

    const key = `${url.protocol}//${url.host}`;
    if (!servers[key]) {
      servers[key] = {};
    }
    servers[key][k] = url;

    urls[k] = url;
  }

  await ensurePorts(conf, servers);

  if (g.isRestarted) {
    for (let _name of Object.keys(_path)) {
      const name = _name as _names;
      try {
        await root.boot.buildSvc(name, process.cwd());
      } catch (e) {
        console.log(`Failed to rebuild services:`, e);
      }
    }
  }

  if (g.execFromBase) {
    if (g.mode === "dev") {
      await devMode();
      await viteServe();
    } else {
      await viteBuild();
    }
  }

  if (g.isRestarted) {
    await stopServices("Hot Reload");
  }
  await startServices();

  console.log(green(`Royal `));
  let i = 0;
  for (let [host, urls] of Object.entries(servers)) {
    const urlkeys = Object.keys(urls);
    if (urlkeys.filter((e) => e.startsWith("srv")).length > 0) {
      if (urlkeys.length === 1) {
        const url = urls[urlkeys[0]];
        const char = `∙─`;
        plog(
          ` ${picocolors.cyan(char)} ${
            padEnd(
              capitalize(camelCase(urlkeys[0]).replace(/([A-Z])/g, " $1")),
              18,
              ".",
            )
          }: ${picocolors.magenta(url.toString())}`,
        );
        continue;
      }
    }
    g.servers[host] = await createUWS(new URL(host), urls, i);
    i++;
  }
};

const ensurePorts = async (
  conf: TSingleConfig<TSingleConfigOutput>,
  servers: Record<string, Record<string, URL>>,
) => {
  const confkey = Object.keys(conf);
  let askForPort = confkey.length;
  if (askForPort > 0) {
    for (let i = 0; i < askForPort; i++) {
      const k = confkey[i];

      for (let [_, urls] of Object.entries(servers)) {
        const names = Object.keys(urls);
        if (
          names.length === 1 &&
          names[0] === k &&
          k.startsWith("srv")
        ) {
          g.ports[k] = parseInt(urls[names[0]].port);
          break;
        }
      }

      if (!g.ports[k]) {
        g.ports[k] = await root.boot.getPort();
      }
    }
  }

  return g.ports;
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}
