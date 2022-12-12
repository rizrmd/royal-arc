import * as swc from "@swc/core";
import { readAsync, writeAsync } from "service";
import Visitor from "../swc/visitor";

type ParseWebPageCallback = (
  arg: {
    type: "url";
    value: string;
  } | {
    type: "layout";
    value: string;
  } | {
    type: "gen";
    value: string;
  },
) => void;

export const parseWebPage = async (path: string, cb: ParseWebPageCallback) => {
  let source = await readAsync(path);

  const scopeGen = [] as { start: number; end: number }[];
  const findGen = (c: swc.MemberExpression) => {
    for (let span of scopeGen) {
      if (c.span.start >= span.start && c.span.end <= span.end) return false;
    }
    if (c.object.type === "MemberExpression") {
      if (
        c.object.object.type === "Identifier" && c.object.object.value === "gen"
      ) {
        return true;
      }
      return findGen(c.object);
    }
    return false;
  };

  let generated = false;
  class Traverse extends Visitor {
    visitMemberExpression(c: swc.MemberExpression): swc.Expression {
      const offset = parsed.span.start;

      if (!generated) {
        if (findGen(c)) {
          scopeGen.push(c.span);
          generated = true;
          const first = source.substring(0, c.span.start - offset);
          const last = source.substring(c.span.end - offset);
          writeAsync(path, `${first}${`(<div>Haloha</div>)`}${last}`);
        }
      }

      return super.visitMemberExpression(c);
    }
    visitCallExpression(c: swc.CallExpression): swc.Expression {
      if (c.callee.type === "Identifier" && c.callee.value === "page") {
        const arg = c.arguments[0];
        if (arg && arg.expression.type === "ObjectExpression") {
          for (let prop of arg.expression.properties) {
            if (
              prop.type === "KeyValueProperty" &&
              prop.key.type === "Identifier" &&
              prop.value.type === "StringLiteral"
            ) {
              if (prop.key.value === "url") {
                cb({ type: "url", value: prop.value.value });
              } else if (prop.key.value === "layout") {
                cb({ type: "layout", value: prop.value.value });
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
