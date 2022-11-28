import { build } from "esbuild";
import { writeAsync } from "../export";
import { join } from "path";

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

  const res = await build({
    entryPoints: [join(__dirname, "node.ts")],
    write: false,
    bundle: true,
    platform: "node",
    format: "iife",
    nodePaths: [join(__dirname, "..", "node_modules")],
    "external": ["esbuild"],
  });
  const src = template.replace("/*!!*--node--*!!*/", res.outputFiles[0].text);
  await writeAsync(join(__dirname, "..", "..", "..", "base"), src);
};

generateBase();
