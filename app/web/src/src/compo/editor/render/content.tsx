import { FC } from "react";
import { ISection } from "../panel/item/section";
import { IContent } from "../panel/item/_type";
import { RenderSection } from "./item/section";

export const RenderContent: FC<{
  content: IContent;
}> = ({ content }) => {
  return (
    <>
      {content.childs.map((e: ISection, idx: number) => {
        return <RenderSection item={e} key={idx} />;
      })}
    </>
  );
};
