import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { existsAsync, list } from "service";

export type TSingleConfigEntry = {
  url: string;
  publish_url?: string;
  run_url?: string;
};

export type TSingleConfigOutput = {
  url: string;
  publish_url?: string;
  run_url: string;
};

export type TSingleConfig<K> = Record<string, K>;

export type TBaseConfig<K> = Record<string, {
  dev: TSingleConfig<K>;
  staging?: TSingleConfig<K>;
  prod?: TSingleConfig<K>;
}>;

export const BaseConfig = async (
  arg: TBaseConfig<TSingleConfigEntry>,
): Promise<
  Record<
    keyof TBaseConfig<TSingleConfigEntry>,
    Required<
      TBaseConfig<TSingleConfigOutput>[keyof TBaseConfig<TSingleConfigOutput>]
    >
  >
> => {
  const result = {} as any;

  let web: string[] = [];
  if (await existsAsync(join(cwd(), "monitr"))) {
    web = list(join(cwd(), "client")) || [];

    if (
      existsSync(join(cwd(), "..", "..", "pkgs")) &&
      existsSync(join(cwd(), "..", "..", "app"))
    ) {
      const appList = list(join(cwd(), "..", "..", "app"));
      if (appList) {
        web = [];
        for (let w of appList) {
          if (w.startsWith("web")) {
            web.push(w);
          }
        }
      }
    }
  } else {
    web = list(join(cwd(), "app"))?.filter((e: string) => {
      if (e.startsWith("web")) return true;
    }) || [];
  }

  for (let [serverName, services] of Object.entries(arg)) {
    for (let [mode, service] of Object.entries(services)) {
      if (mode === "boot") continue;
      for (let [serviceName, v] of Object.entries(service)) {
        (service as any)[serviceName] = {
          run_url: v.run_url || v.url,
          publish_url: v.publish_url,
          get url() {
            return v.publish_url || v.run_url || v.url;
          },
        };
      }
    }

    result[serverName] = services;
  }

  return result;
};
