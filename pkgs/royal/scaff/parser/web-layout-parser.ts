import * as swc from "@swc/core";
import { readAsync, writeAsync } from "service";
import Visitor from "../swc/visitor";

type ParseWebLayoutCallback = (
  arg:
    | {
        type: "name";
        value: string;
      }
    | {
        type: "ssr";
        value: boolean;
      }
) => void;

export const parseWebLayout = async (
  path: string,
  cb: ParseWebLayoutCallback
) => {
  let source = (await readAsync(path)) || "";
  class Traverse extends Visitor {
    visitCallExpression(c: swc.CallExpression): swc.Expression {
      if (c.callee.type === "Identifier" && c.callee.value === "layout") {
        const arg = c.arguments[0];
        if (arg && arg.expression.type === "ObjectExpression") {
          for (let prop of arg.expression.properties) {
            if (
              prop.type === "KeyValueProperty" &&
              prop.key.type === "Identifier"
            ) {
              cb({ type: "name", value: prop.key.value });
              if (prop.key.value === "ssr") {
                cb({ type: "ssr", value: true });
              }
            }
          }
        }
      }
      return super.visitCallExpression(c);
    }
  }
  const parsed = await swc.parse(source, {
    syntax: "typescript",
    tsx: true,
    target: "es2022",
    script: true,
  });

  new Traverse().visitModule(parsed);
};
