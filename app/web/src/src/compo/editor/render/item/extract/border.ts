import { FBorder } from "../../../panel/field/border";

export const extractBorder = (border?: FBorder) => {
  const b = (border || {}) as FBorder;

  if (!b) return undefined;

  return css`
    border-style: solid;
    border-color: ${b.color};
    ${b.t &&
    css`
      border-top-width: ${b.t};
    `}
    ${b.b &&
    css`
      border-bottom-width: ${b.b};
    `}
    ${b.r &&
    css`
      border-right-width: ${b.r};
    `}
      ${b.l &&
    css`
      border-left-width: ${b.l};
    `}
  `;
};
