import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../../base/global/editor";
import { IItem } from "../../panel/item/item";
import { IImg } from "../../panel/item/img";
import { ISection } from "../../panel/item/section";
import { IText } from "../../panel/item/text";
import { BaseItem, IContent } from "../../panel/item/_type";
import { extractAlign } from "./extract/align";
import { extractBg } from "./extract/bg";
import { extractBorder } from "./extract/border";
import { extractDirection } from "./extract/direction";
import { extractFont } from "./extract/font";
import { extractHeight } from "./extract/height";
import { extractPadding } from "./extract/padding";
import { extractTextAlign } from "./extract/text-align";
import { extractWidth } from "./extract/width";

export const generateCSS = ({
  item,
  hover,
  active,
}: {
  item: BaseItem;
  hover?: IContent | null;
  active?: IContent | null;
}) => {
  const ed = useGlobal(EditorGlobal);
  const s = {
    section: item as ISection,
    item: item as IItem,
    text: item as IText,
    img: item as IImg,
  };

  const showElement = () => {
    let show = false;
    if (item.responsive.desktop && item.responsive.mobile) {
      if (ed.preview === "desktop") {
        show = true;
      } else if (ed.preview === "mobile") {
        show = true;
      }
    }

    if (item.responsive.desktop && !item.responsive.mobile) {
      if (ed.preview === "desktop") {
        show = true;
      }
    }

    if (!item.responsive.desktop && item.responsive.mobile) {
      if (ed.preview === "mobile") {
        show = true;
      }
    }
    return show;
  };

  return css`
    display: ${showElement() ? "flex" : "none"};
    padding: ${extractPadding(item.padding)};
    ${extractFont(item.font)}
    ${extractBorder(item.border)}
    ${extractBg(item.bg)}
    ${extractHeight(item, s.item.height)}
    ${extractWidth(item, s.item.width)}
    ${extractDirection(item, s.item.direction)}
    ${s.text.type === "text" && extractAlign(s.text.align)}
    ${s.text.type === "text" && extractTextAlign(s.text.textAlign)}
    ${item.id === hover?.id &&
    css`
      border-radius: 1px;
      box-shadow: inset 0 0 0px 3px #bae3fd;
    `}
      ${item.id === active?.id &&
    css`
      border-radius: 1px;
      box-shadow: inset 0 0 0px 2px #009cff;
    `};
  `;
};
