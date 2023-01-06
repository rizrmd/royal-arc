import { FC } from "react";
import { FieldAlign, FAlign } from "../field/align";
import { FieldBorder } from "../field/border";
import { FFont } from "../field/font";
import { FieldTextAlign } from "../field/text-align";
import { CommonField } from "./_common";
import { BaseItem } from "./_type";
export type IText = {
  name: string;
  text: string;
  html: string;
  align: FAlign;
  textAlign: string;
} & BaseItem;

export const PanelText: FC<{
  value: IText;
  update: <T extends keyof IText>(key: T, val: IText[T]) => {};
}> = ({ value, update }) => {
  return (
    <div className="flex flex-col">
      <CommonField value={value} update={update} />
      <FieldBorder value={value.border} update={(v) => update("border", v)} />
      <FieldAlign value={value.align} update={(v) => update("align", v)} />
      <FieldTextAlign
        value={value.textAlign}
        update={(v) => update("textAlign", v)}
      />
    </div>
  );
};
