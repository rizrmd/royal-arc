import { useEffect } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../../../base/global/editor";
import { FFont } from "../../../panel/field/font";

export const extractFont = (font?: FFont) => {
  const ed = useGlobal(EditorGlobal);
  if (!font) return undefined;

  if (!isSSR) {
    // load font.json gunakan window agar tidak berat

    const frame = ed.frm;

    if (frame) {
      if (frame.contentWindow) {
        let weight = "";
        let fontName = "";
        if (font.weight.length > 0) {
          weight = `:wght@${font.weight.join(";")}`;
        }

        if (font.name !== "") {
          fontName = font.name.replace(/ /g, "+");
        }
        const _href = `https://fonts.googleapis.com/css2?family=${fontName}${weight}&display=swap`;

        if (ed.fontFamily) {
          const checkFont = ed.fontFamily.filter(
            (val: any, i: number) => val.name === font.name
          );

          if (checkFont.length === 0) {
            ed.fontFamily = [...ed.fontFamily, font];

            const link = frame.contentWindow.document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = _href;
            frame.contentWindow.document.head.appendChild(link);
          }
        }
      }
    }
  }

  return css`
    ${font.name &&
    css`
      font-family: ${font.name};
    `}
  `;
};
