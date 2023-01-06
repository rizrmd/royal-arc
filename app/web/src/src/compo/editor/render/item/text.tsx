import produce from "immer";
import { FC } from "react";
import { TextEdit } from "../../inline/text-edit";
import { TextRender } from "../../inline/text-render";
import { IText } from "../../panel/item/text";
import { findByID } from "../../util/find-by-id";
import { generateCSS } from "./_css";
import { RItemProp } from "./_type";

export const RenderText: FC<{ item: IText } & RItemProp> = ({
  item,
  active,
  onHover,
  onOut,
  hover,
  onClick,
  update,
  root,
}) => {
  return (
    <div
      className="flex-col flex-1"
      css={css`
        ${generateCSS({ item, hover, active })}
      `}
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
      {onClick ? (
        <TextEdit
          id={item.id}
          text={item.text}
          update={(text, html) => {
            if (update && root) {
              const newstate = produce(root, (draft) => {
                const found = findByID(item.id, draft);
                if (found) {
                  const ftext = found.content as IText;
                  ftext.text = text;
                  ftext.html = html;
                }
              });
              update("Update Text", newstate);
            }
          }}
        />
      ) : (
        <TextRender id={item.id} text={item.html} />
      )}
    </div>
  );
};
