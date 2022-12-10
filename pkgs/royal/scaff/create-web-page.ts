import { basename, join } from "path";
import { writeAsync } from "service";
import { walkDir } from "../web/utils";

import * as swc from "@swc/core";
import { parseWebPage } from "./util/create-web-page-parser";

const pageOutput = {} as Record<string, Record<string, any>>;

export const createWebPage = async (path: string) => {
  const name = basename(path).substring(0, basename(path).length - 4);
  const src = `\
import { page } from "types/content";
import { useLocal } from "web-utils";

export default page({
  url: "/${name}",
  component: ({}) => {
    return <div>Halo</div>;
  },
});
  `;

  await writeAsync(path, src);
};

export const reloadWebPageSingle = async (
  basedir: string,
  filepath: string,
) => {
  if (!pageOutput[basedir]) pageOutput[basedir] = {};
  const root = await join(basedir, "..", "..", "..");
  const pageOut = join(basedir, "..", "..", "..", "types", "page.ts");

  try {
    const page = {
      layout: "",
      url: "",
    };

    await parseWebPage(filepath, ({ type, value }) => {
      if (type === "url") page.url = value;
      if (type === "layout") page.layout = value;
    });

    let pathNoExt = filepath.endsWith(".tsx")
      ? filepath.substring(0, filepath.length - 4)
      : filepath;

    const name = pathNoExt
      .substring(basedir.length + 1)
      .replace(/[\/\\]/gi, ".");

    if (page.url === "") {
      page.url = "/";
    }

    const layout = page.layout || "default";
    const expected = `["${page.url}", "${layout}", () => import('..${
      filepath
        .substring(root.length, filepath.length - 4)
        .replace(/\\/gi, "/")
    }')]`;

    if (expected !== pageOutput[basedir][name]) {
      pageOutput[basedir][name] = expected;

      const output = `
// @ts-nocheck
export default {
    ${
        Object.entries(pageOutput[basedir])
          .map((arg: any) => {
            const [key, value] = arg;
            return `'${key}':${value},`;
          })
          .join("\n  ")
      }
  }`;

      await writeAsync(pageOut, output);
    }
  } catch (e: any) {
    console.log(
      `Error while saving \n${
        filepath.substring(
          root.length + 1,
        )
      }:\n\n${e} `,
    );
  }
};

export const reloadWebPage = async (basedir: string) => {
  const list = await walkDir(basedir);
  const root = await join(basedir, "..", "..", "..");
  const pageOut = join(basedir, "..", "..", "..", "types", "page.ts");
  pageOutput[basedir] = {};

  for (let path of list) {
    try {
      let pathNoExt = path.endsWith(".tsx")
        ? path.substring(0, path.length - 4)
        : path;

      const name = pathNoExt
        .substring(basedir.length + 1)
        .replace(/[\/\\]/gi, ".");

      let layout = "default";
      let url = "";

      await parseWebPage(path, ({ type, value }) => {
        if (type === "url" && !url) url = value;
        if (type === "layout") layout = value;
      });

      if (url === "") {
        url = "/";
      }
      pageOutput[basedir][name] = `["${url}", "${layout}", () => import('..${
        path
          .substring(root.length, path.length - 4)
          .replace(/\\/gi, "/")
      }')]`;
    } catch (e) {
    }
  }

  const output = `
// @ts-nocheck
  export default {
  ${
    Object.entries(pageOutput[basedir])
      .map((arg: any) => {
        const [key, value] = arg;
        return `'${key}':${value},`;
      })
      .join("\n  ")
  }
}`;
  await writeAsync(pageOut, output);
};
