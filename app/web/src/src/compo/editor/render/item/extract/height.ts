import { FHeight } from "../../../panel/field/height";
import { IContent } from "../../../panel/item/_type";

export const extractHeight = (item: IContent, h?: FHeight) => {
  if (!h) return;

  if (h.type === "full") {
    if (item.type === "section") {
      return css`
        height: 100vh;
        align-items: flex-start;
      `;
    } else if (item.type === "item") {
      return css`
        align-self: stretch;
      `;
    } else {
      return css`
        height: 100%;
      `;
    }
  }

  const value = h.value?.replace(/[^0-9]/gi, "");

  if (h.type === "percent") {
    if (item.type === "section") {
      return css`
        height: ${value}vh;
      `;
    } else {
      return css`
        height: ${value}%;
      `;
    }
  }

  if (h.type === "px") {
    return css`
      height: ${value}px;
    `;
  }
};
