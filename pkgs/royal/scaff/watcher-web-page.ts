import { parse } from "@babel/core";
import pluginJsx from "@babel/plugin-syntax-jsx";
import pluginTs from "@babel/plugin-syntax-typescript";
import traverse from "@babel/traverse";
import { watch } from "chokidar";
import { readFile, writeFile } from "fs/promises";
import { basename, join } from "path";
import { existsAsync } from "service";
import { g } from "../global";
import { getWebDirs, walkDir } from "../web/utils";

export const webWatcherPage = async () => {
  for (const [name, dir] of Object.entries(await getWebDirs())) {
    const dirPath = join(dir, "src", "base", "page");

    if (await existsAsync(dirPath)) {
      g.watchers.push(
        watch(join(dir, "src", "base", "page"), { ignoreInitial: true }).on(
          "all",
          (event, path) => reloadPage.bind(name)(event, path, dir),
        ),
      );
    }
  }
};

const clientDir = (name: string, cdir: string) => ({
  root: cdir,
  page: join(cdir, "src", "base", "page"),
  pageOut: join(cdir, "types", "page.ts"),
});

let reloadPageTimer = 0 as any;
const pageOutput = {} as Record<string, Record<string, any>>;

const reloadPage = async function (
  this: string,
  event: string,
  path: string,
  cdir: string,
) {
  if (event === "addDir") return;
  if (event === "add" && !(await readFile(path, "utf-8"))) {
    await writeFile(
      path,
      `\
import { page } from 'types/content'

export default page({
  url: '/${basename(path).substring(0, basename(path).length - 4)}',
  component: ({}) => {
    return <div>Halo</div>
  }
})`,
    );
  }

  if (event !== "unlink" && event !== "unlinkDir" && event !== "add") {
    await generatePageSingle(this, path, cdir);
    return;
  }

  clearTimeout(reloadPageTimer);
  reloadPageTimer = setTimeout(async () => {
    await generatePageAll(this, cdir);
  }, 500);
};

export const generatePageAll = async (web: string, cdir: string) => {
  const list = await walkDir(clientDir(web, cdir).page);
  pageOutput[web] = {};

  for (let path of list) {
    try {
      let pathNoExt = path.endsWith(".tsx")
        ? path.substring(0, path.length - 4)
        : path;

      const name = pathNoExt
        .substring(clientDir(web, cdir).page.length + 1)
        .replace(/[\/\\]/gi, ".");

      const source = await readFile(path, "utf-8");
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
      pageOutput[web][name] = `["${url}", "${layout}", () => import('..${
        path
          .substring(clientDir(web, cdir).root.length, path.length - 4)
          .replace(/\\/gi, "/")
      }')]`;
    } catch (e) {}
  }

  const output = `
  // @ts-nocheck
    export default {
    ${
    Object.entries(pageOutput[web])
      .map((arg: any) => {
        const [key, value] = arg;
        return `'${key}':${value},`;
      })
      .join("\n  ")
  }
  }`;
  await writeFile(clientDir(web, cdir).pageOut, output);
};

const generatePageSingle = async (web: string, path: string, cdir: string) => {
  if (!pageOutput[web]) pageOutput[web] = {};

  try {
    const source = await readFile(path, "utf-8");
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

    let pathNoExt = path.endsWith(".tsx")
      ? path.substring(0, path.length - 4)
      : path;

    const name = pathNoExt
      .substring(clientDir(web, cdir).page.length + 1)
      .replace(/[\/\\]/gi, ".");

    if (page.url === "") {
      page.url = "/";
    }

    const layout = page.layout || "default";
    const expected = `["${page.url}", "${layout}", () => import('..${
      path
        .substring(clientDir(web, cdir).root.length, path.length - 4)
        .replace(/\\/gi, "/")
    }')]`;

    if (expected !== pageOutput[web][name]) {
      pageOutput[web][name] = expected;

      const output = `\
/******************************************************/
/************* autogenerated - do not edit ************/
/******************************************************/

// @ts-nocheck
export default {
  ${
        Object.entries(pageOutput[web])
          .map((arg: any) => {
            const [key, value] = arg;
            return `'${key}':${value},`;
          })
          .join("\n  ")
      }
}`;

      await writeFile(clientDir(web, cdir).pageOut, output);
    }
  } catch (e: any) {
    console.log(
      `Error while saving \n${
        path.substring(
          clientDir(web, cdir).root.length + 1,
        )
      }:\n\n${e} `,
    );
  }
};
