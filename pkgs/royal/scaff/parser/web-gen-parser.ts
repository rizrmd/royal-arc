import * as swc from "@swc/core";
import { ArrowFunctionExpression, ExportDeclaration } from "@swc/core";
import { readAsync } from "service";

export const parseWebGen = async (filepath: string) => {
  let source = await readAsync(filepath);

  const parsed = await swc.parse(source, {
    syntax: "typescript",
    tsx: true,
    target: "es2022",
    script: true,
  });

  let fn: ArrowFunctionExpression;
  parsed.body.filter((e: ExportDeclaration) => {
    if (
      e.type === "ExportDeclaration" &&
      e.declaration.type === "VariableDeclaration"
    ) {
      for (const d of e.declaration.declarations) {
        if (d.id.type === "Identifier" && d.id.value === "_") {
          fn = d.init as ArrowFunctionExpression;
          return true;
        }
      }
    }
    return false;
  });

  if (fn) {
    return fn.params.length;
  }
};
