import { FC } from "react";
import { FBg } from "../field/bg";
import { FieldFont } from "../field/font";
import { FHeight, FieldHeight } from "../field/height";
import { FieldSlider } from "../field/slider";
import { FieldWidth, FWidth } from "../field/width";
import { CommonField } from "./_common";
import { BaseItem } from "./_type";

export type ISection = Partial<{
  height: FHeight;
  width: FWidth;
  bg: FBg;
}> &
  BaseItem;

export const PanelSection: FC<{
  value: ISection;
  update: <T extends keyof ISection>(key: T, val: ISection[T]) => {};
}> = ({ value, update }) => {
  return (
    <div className="flex flex-col">
      <CommonField value={value} update={update} />
      <FieldHeight value={value.height} update={(v) => update("height", v)} />
      <FieldWidth
        defaultType="full"
        value={value.width}
        update={(v) => update("width", v)}
      />
      <FieldSlider value={value.slider} update={(v) => update("slider", v)} />
    </div>
  );
};
