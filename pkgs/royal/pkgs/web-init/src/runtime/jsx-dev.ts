//@ts-ignore
import * as runtime from "../../node_modules/react/cjs/react-jsx-dev-runtime.development";
import { modifyProps } from "../core/modify-props";
const r = runtime as any;

export const Fragment = r.Fragment;

export const jsxDEV = function (...args: any[]) {
  return r.jsxDEV(...modifyProps(...args));
};

export const jsxs = function (...args: any[]) {
  return r.jsxs(...modifyProps(...args));
};
