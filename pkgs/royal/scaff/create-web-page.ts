import { basename, join } from "path";
import { readAsync, writeAsync } from "service";
import { walkDir } from "../web/utils";

import { parse } from "@babel/core";
import pluginJsx from "@babel/plugin-syntax-jsx";
import pluginTs from "@babel/plugin-syntax-typescript";
import _traverse from "@babel/traverse";

let reloadPageTimer = 0 as any;
const traverse = (_traverse as any).default as typeof _traverse;
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
    const source = await readAsync(filepath);
    const page = {
      layout: "",
      url: "",
    };

    const parsed = parse(source, {
      sourceType: "module",
      plugins: [pluginJsx, [pluginTs, { isTSX: true }]],
    });

    traverse(parsed, {
      CallExpression: (p) => {
        if (page.url) return;

        const c = p.node;
        if (c.callee.type === "Identifier" && c.callee.name === "page") {
          const arg = c.arguments[0];

          if (arg && arg.type === "ObjectExpression") {
            for (let prop of arg.properties) {
              if (
                prop.type === "ObjectProperty" &&
                prop.key.type === "Identifier" &&
                prop.value.type === "StringLiteral"
              ) {
                if (prop.key.name === "url") {
                  page.url = prop.value.value;
                } else if (prop.key.name === "layout") {
                  page.layout = prop.value.value;
                }
              }
            }
          }
        }
      },
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

      const source = await readAsync(path);
      const parsed = parse(source, {
        sourceType: "module",
        plugins: [pluginJsx, [pluginTs, { isTSX: true }]],
      });

      let layout = "default";
      let url = "";

      traverse(parsed, {
        CallExpression: (p) => {
          if (url) return;

          const c = p.node;
          if (c.callee.type === "Identifier" && c.callee.name === "page") {
            const arg = c.arguments[0];

            if (arg && arg.type === "ObjectExpression") {
              for (let prop of arg.properties) {
                if (
                  prop.type === "ObjectProperty" &&
                  prop.key.type === "Identifier" &&
                  prop.value.type === "StringLiteral"
                ) {
                  if (prop.key.name === "url") {
                    url = prop.value.value;
                  } else if (prop.key.name === "layout") {
                    layout = prop.value.value;
                  }
                }
              }
              // const prop = arg.properties[0]
            }
          }
        },
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
