import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { dir } from "dir";

type Config = {
  ports: Record<string, number>;
};

export const configRPC = {
  _path: "",
  _raw: null as null | Config,
  get ports() {
    if (this._raw === null) {
      this._path = join(process.cwd(), "rpc.json");
      if (existsSync(join(process.cwd(), "base"))) {
        this._path = dir.root(".output/app/rpc.json");
      }

      if (existsSync(this._path)) {
        const json = readFileSync(this._path, "utf-8");
        this._raw = JSON.parse(json);
      }
    }
    const config = this._raw as Config;

    return new Proxy(
      {},
      {
        get: (target, p: string, receiver) => {
          return config.ports[p];
        },
        set: (target, p: string, newValue, receiver) => {
          config.ports[p] = newValue;
          writeFileSync(this._path, JSON.stringify(this._raw, null, 2));
          return true;
        },
      }
    ) as Config["ports"];
  },
};
