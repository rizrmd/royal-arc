import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { BoxSep } from "./common/box-sep";
import { FieldBox } from "./common/field-box";
import { FieldColor } from "./common/field-color";
import { FieldImg } from "./common/field-img";

export type FBg = {
  img?: {
    src: string;
    size: "cover" | "contain" | "fill";
  };
  color?: string;
  opacity?: string;
};

const EmptyBg: FBg = {};

export const FieldBg: FC<{
  value?: FBg;
  update: (val: FBg) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    p: value,
  });

  useEffect(() => {
    local.p = value;
    local.render();
  }, [value]);

  const localUpdate = useCallback(
    (key: string, value: any) => {
      local.p = produce(local.p || {}, (draft) => {
        (draft as any)[key] = value;
      });
      update(local.p as any);
    },
    [local.p]
  );

  return (
    <FieldBox label="Background">
      <div className="items-center flex">{local.p?.color}</div>
      <BoxSep>
        <FieldColor
          value={local.p?.color}
          update={(color) => {
            localUpdate("color", color);
          }}
        />
      </BoxSep>
      <BoxSep>
        <FieldImg
          value={local.p?.img?.src}
          update={(src) => {
            localUpdate("img", { size: "cover", ...(local.p?.img || {}), src });
          }}
        />
      </BoxSep>
    </FieldBox>
  );
};
