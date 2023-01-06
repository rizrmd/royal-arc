import { FC } from "react";
import { FieldBorder } from "../field/border";
import { FieldHeight } from "../field/height";
import { FieldWidth } from "../field/width";
import { CommonField } from "./_common";
import { BaseItem } from "./_type";

export type IImg = {
  name: string;
  src: string;
  height?: any;
  width?: any;
} & BaseItem;

export const PanelImg: FC<{
  value: IImg;
  update: <T extends keyof IImg>(key: T, val: IImg[T]) => {};
}> = ({ value, update }) => {
  return (
    <div className="flex flex-col">
      <CommonField value={value} update={update} />
      <FieldBorder value={value.border} update={(v) => update("border", v)} />
      <FieldHeight value={value.height} update={(v) => update("height", v)} />
      <FieldWidth
        defaultType="full"
        value={value.width}
        update={(v) => update("width", v)}
      />
    </div>
  );
};
