import { basename, join } from "path";
import { writeAsync } from "service";
import { walkDir } from "../web/utils";
import { parseWebGen } from "./parser/web-gen-parser";

export const createWebGen = async (filepath: string) => {
};

export const reloadWebGen = async () => {
  
};

export const reloadWebGenSingle = async (genpath: string) => {
  const gens: any = {};
  const list = await walkDir(genpath);

  for (const path of list) {
    let pathNoExt = path.endsWith(".ts")
      ? path.substring(0, path.length - 3)
      : path;

    const name = pathNoExt
      .substring(genpath.length + 1)
      .replace(/[\/\\]/gi, ".");

    const paramsCount = await parseWebGen(path);
  }

  await writeAsync(
    join(process.cwd(), "gen", "web.gen.ts"),
    `
import { extendGen } from "../pkgs/royal/web/gen";
import { _ as web_cols } from "../app/web/src/gen/cols";

export default {
  web: {
    cols: extendGen(
      {} as {
        [k in Parameters<typeof web_cols>[0]]: any;
      },
    ),
  },
};
  `,
  );
};
