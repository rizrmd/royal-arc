import { FDirection } from "../../../panel/field/direction";
import { IItem } from "../../../panel/item/item";
import { ISection } from "../../../panel/item/section";

export const extractDirection = (item: ISection | IItem, dir?: FDirection) => {
  if (!dir) {
    if (item.type === "item")
      return css`
        flex-direction: column;
      `;
    else if (item.type === "section")
      return css`
        flex-direction: row;
      `;
    else return;
  }

  if (dir.mode === "top-to-bottom") {
    return css`
      flex-direction: column;
    `;
  }
  if (dir.mode === "left-to-right") {
    return css`
      flex-direction: row;
    `;
  }
};
