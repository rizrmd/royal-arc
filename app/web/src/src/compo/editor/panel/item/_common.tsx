import { FC } from "react";
import { FieldBg } from "../field/bg";
import { FieldFont } from "../field/font";
import { FieldPadding } from "../field/padding";

export const CommonField: FC<{
  value: any;
  update: (key: any, val: any) => {};
}> = ({ value, update }) => {
  return (
    <>
      <FieldPadding
        value={value.padding}
        update={(v) => update("padding", v)}
      />
      <FieldBg value={value.bg} update={(v) => update("bg", v)} />
      <FieldFont
        value={value.font}
        update={(v) => {
          update("font", v);
        }}
      />
    </>
  );
};

export const walkItem = (current: any, fn: (item: any) => void) => {
  if (current) {
    fn(current);
    for (const i of current.childs) {
      fn(i);
    }
  }
  return current;
};
