import { FC } from "react";
import { FBg } from "../field/bg";
import { FieldBorder } from "../field/border";
import { FDirection, FieldDirection } from "../field/direction";
import { FieldFont } from "../field/font";
import { FHeight, FieldHeight } from "../field/height";
import { FieldWidth, FWidth } from "../field/width";
import { CommonField } from "./_common";
import { BaseItem } from "./_type";

export type IItem = Partial<{
  height: FHeight;
  width: FWidth;
  direction: FDirection;
  bg: FBg;
}> &
  BaseItem;

export const PanelItem: FC<{
  value: IItem;
  update: <T extends keyof IItem>(key: T, val: IItem[T]) => {};
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
      <FieldDirection
        value={value.direction}
        update={(v) => update("direction", v)}
      />
    </div>
  );
};
