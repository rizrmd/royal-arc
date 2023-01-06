//@ts-ignore
import * as runtime from "../../node_modules/react/jsx-runtime";

import { modifyProps } from "../core/modify-props";
const r = runtime as any;
const w = window as any;

export const Fragment = r.Fragment;

export const jsx = function (...args: any[]) {
  return r.jsx(...modifyProps(...args));
};

export const jsxs = function (...args: any[]) {
  return r.jsxs(...modifyProps(...args));
};

w.Fragment = Fragment;
w.jsx = jsx;
w.jsxs = jsxs;
