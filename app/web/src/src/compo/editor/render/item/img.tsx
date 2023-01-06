import { FC } from "react";
import { IImg } from "../../panel/item/img";
import { generateCSS } from "./_css";
import { RItemProp } from "./_type";

export const RenderImg: FC<{ item: IImg } & RItemProp> = ({
  item,
  active,
  onHover,
  onOut,
  hover,
  onClick,
}) => {
  return (
    <div
      className="flex-col flex-1"
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
      {JSON.stringify(item)}
    </div>
  );
};
