import { FPadding } from "../../../panel/field/padding";

export const extractPadding = (padding?: FPadding) => {
  const p = (padding || {}) as FPadding;

  return `${p.t || "0px"} ${p.r || "0px"} ${p.b || "0px"} ${p.l || "0px"}`;
};
