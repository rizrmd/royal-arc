import { FBg } from "../../../panel/field/bg";

export const extractBg = (bg?: FBg) => {
  if (!bg) return undefined;

  return css`
    ${bg.color &&
    css`
      background-color: ${bg.color};
    `}
    ${bg.img &&
    css`
      background-image: url('${serverurl}${bg.img.src}');
      background-size: ${["cover", "contain"].includes(bg.img.size)
        ? bg.img.size
        : "100% 100%"};
    `}
  `;
};
