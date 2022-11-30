import { build } from "esbuild";
import { writeAsync } from "../export";
import { join } from "path";
import * as importMap from "./util/esbuild-map";
export const generateBase = async () => {
  const template = `\
#!/usr/bin/env node
/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌  
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•  
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪  
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀ 
*/

const getRuntime = () => {
  if (typeof process !== "undefined") {
    if (process.isBun) return "bun";
    else return "node";
  }
  return "deno";
};

(async () => {
  switch (getRuntime()) {
    case "bun":
      {
        throw new Error("Base for bun is not ready yet");
      }
      break;
    case "deno":
      {
        throw new Error("Base for deno is not ready yet");
      }
      break;
    case "node":
      {

/*!!*--node--*!!*/

      }
      break;
  }
})();`;

  importMap.load({
    imports: {
      "esbuild": "./pkgs/service/node_modules/esbuild/lib/main.js",
      "chokidar": "./pkgs/service/node_modules/chokidar/index.js",
    },
  });
  const res = await build({
    entryPoints: [join(__dirname, "node.ts")],
    write: false,
    bundle: true,
    platform: "node",
    format: "iife",
    nodePaths: [join(__dirname, "..", "node_modules")],
    "external": ["esbuild"],
    plugins: [importMap.plugin()],
  });
  const src = template.replace("/*!!*--node--*!!*/", res.outputFiles[0].text);
  await writeAsync(join(__dirname, "..", "..", "..", "base"), src);
};

generateBase();
