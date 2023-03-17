import { bundle } from "bundler";
import { dir } from "dir";

export const buildService = async (name: string) => {
  if (
    !(await bundle({
      input: dir.root(`app/${name}/main.ts`),
      output: dir.root(`.output/app/${name}/index.js`),
      pkgjson: dir.root(`.output/app/${name}/package.json`),
    }))
  ) {
    console.log(`build service ${name} failed`);
  }
};
