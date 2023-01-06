import { FC } from "react";
import { IItem } from "../../panel/item/item";
import { IImg } from "../../panel/item/img";
import { IText } from "../../panel/item/text";
import { extractPadding } from "./extract/padding";
import { RenderImg } from "./img";
import { RenderText } from "./text";
import { generateCSS } from "./_css";
import { RItemProp } from "./_type";

export const RenderItem: FC<{ item: IItem } & RItemProp> = (prop) => {
  const { item, active, onHover, onOut, hover, onClick } = prop;

  return (
    <div
      css={generateCSS({ item, hover, active })}
      onClick={(e) => {
        if (onClick) onClick(e, item);
      }}
      onMouseOver={(e) => {
        if (onHover) onHover(e, item);
      }}
      onMouseOut={(e) => {
        if (onOut) onOut(e, item);
      }}
    >
      {item.childs.map((e, key) => {
        if (e.type === "text") {
          return <RenderText key={key} {...prop} item={e as IText} />;
        }

        if (e.type === "img") {
          return <RenderImg key={key} {...prop} item={e as IImg} />;
        }
        return null;
      })}
    </div>
  );
};
