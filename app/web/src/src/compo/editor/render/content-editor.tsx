import { FC } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { ISection } from "../panel/item/section";
import { IContent } from "../panel/item/_type";
import { RenderSection } from "./item/section";

export const RenderContentWithEditor: FC<{
  content: IContent;
  update: (name: string, content: IContent) => void;
}> = ({ content, update }) => {
  const ed = useGlobal(EditorGlobal);
  return (
    <>
      {content.childs.map((e: ISection, idx: number) => {
        return (
          <RenderSection
            item={e}
            key={idx}
            active={ed.active}
            hover={ed.hover}
            root={content}
            update={update}
            onHover={async (e, item) => {
              e.stopPropagation();
              ed.hover = item;
              ed.render();
            }}
            onOut={async (e, item) => {
              ed.hover = null;
              ed.render();
            }}
            onClick={async (e, item) => {
              e.stopPropagation();
              ed.hover = null;
              ed.active = item;
              ed.render();
            }}
          />
        );
      })}
    </>
  );
};
