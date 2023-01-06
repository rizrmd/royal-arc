import { FC } from "react";
import { IItem } from "../../panel/item/item";
import { ISection } from "../../panel/item/section";
import { RenderItem } from "./item";
import { generateCSS } from "./_css";
import { RItemProp } from "./_type";

export const RenderSection: FC<{ item: ISection } & RItemProp> = (prop) => {
  const { item, active, onHover, onOut, hover, onClick } = prop;

  return (
    <div
      className=""
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
        return <RenderItem key={key} {...prop} item={e as IItem} />;
      })}
    </div>
  );
};
