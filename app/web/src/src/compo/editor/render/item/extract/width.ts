import { FWidth } from "../../../panel/field/width";
import { IContent } from "../../../panel/item/_type";

export const extractWidth = (item: IContent, w?: FWidth) => {
  if (!w) {
    if (item.type === "item") w = { type: "full" };
    else if (item.type === "section") w = { type: "full" };
    else return;
  }

  if (w.type === "full") {
    if (item.type === "section") {
      return css``;
    } else if (item.type === "item") {
      return css`
        flex: 1;
      `;
    }
  }

  const value = w.value?.replace(/[^0-9]/gi, "");

  if (w.type === "custom") {
    const valunit = `${value || 1024}${w.unit === "percent" ? "%" : "px"}`;

    if (item.type === "section") {
      return css`
        align-self: center;
        justify-content: center;
        width: ${valunit};
      `;
    } else {
      return css`
        flex-basis: ${valunit};
      `;
    }
  }
};
