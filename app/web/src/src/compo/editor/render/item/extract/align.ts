import { FAlign } from "../../../panel/field/align";

export const extractAlign = (align?: FAlign) => {
  if (!align) {
    align = {
      v: "top",
      h: "left",
    };
  }

  if (!align.v) align.v = "top";
  if (!align.h) align.h = "left";

  return css`
    .txt-box {
      display: flex;
      flex: 1;
      flex-direction: row;
      ${align.v === "top" &&
      css`
        align-items: flex-start;
      `}
      ${align.v === "middle" &&
      css`
        align-items: center;
      `}
      ${align.v === "bottom" &&
      css`
        align-items: flex-end;
      `}
      ${align.h === "left" &&
      css`
        justify-content: flex-start;
      `}
        ${align.h === "center" &&
      css`
        justify-content: center;
      `}
      ${align.h === "right" &&
      css`
        justify-content: flex-end;
      `}
    }
  `;
};
