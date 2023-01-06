import {
  AlignBottom16Regular,
  AlignCenterHorizontal16Regular,
  AlignCenterVertical16Regular,
  AlignLeft16Regular,
  AlignRight16Regular,
  AlignTop16Regular,
} from "@fluentui/react-icons";
import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { BoxSep } from "./common/box-sep";
import { FieldBox } from "./common/field-box";
import { FieldBtnRadio } from "./common/field-btn-radio";

export type FAlign = {
  v: "top" | "middle" | "bottom";
  h: "left" | "center" | "right";
};

const EmptyAlign: FAlign = {
  v: "top",
  h: "left",
};

export const FieldAlign: FC<{
  value?: FAlign;
  update: (val: FAlign) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    p: value || EmptyAlign,
  });

  useEffect(() => {
    local.p = value || EmptyAlign;
    local.render();
  }, [value]);

  const localUpdate = useCallback(
    (key: string, value: any) => {
      local.p = produce(local.p || EmptyAlign, (draft) => {
        (draft as any)[key] = value;
      });
      update(local.p as any);
    },
    [local.p]
  );

  return (
    <FieldBox label={"Align"}>
      <div className="flex justify-around flex-1">
        <BoxSep className="">
          <FieldBtnRadio
            items={{
              top: <AlignTop16Regular />,
              middle: <AlignCenterHorizontal16Regular />,
              bottom: <AlignBottom16Regular />,
            }}
            value={local.p.v}
            update={(value) => {
              localUpdate("v", value);
            }}
          />
        </BoxSep>
        <BoxSep className="">
          <FieldBtnRadio
            items={{
              left: <AlignLeft16Regular />,
              center: <AlignCenterVertical16Regular />,
              right: <AlignRight16Regular />,
            }}
            value={local.p.h}
            update={(value) => {
              localUpdate("h", value);
            }}
          />
        </BoxSep>
      </div>
    </FieldBox>
  );
};
