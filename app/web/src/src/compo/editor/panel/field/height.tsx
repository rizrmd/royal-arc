import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { BoxSep } from "./common/box-sep";
import { FieldBox } from "./common/field-box";
import { FieldBtnRadio } from "./common/field-btn-radio";
import { FieldNumUnit } from "./common/field-num-unit";

export type FHeight = {
  type: "content" | "full" | "px" | "percent";
  value?: string;
};

const EmptyHeight: FHeight = {
  type: "content",
};

export const FieldHeight: FC<{
  value?: FHeight;
  update: (val: FHeight) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    p: value || EmptyHeight,
  });

  useEffect(() => {
    local.p = value || EmptyHeight;
    local.render();
  }, [value]);

  const localUpdate = useCallback(
    (key: string, value: any) => {
      local.p = produce(local.p || EmptyHeight, (draft) => {
        (draft as any)[key] = value;
      });
      update(local.p as any);
    },
    [local.p]
  );

  return (
    <FieldBox label="Height">
      {["px", "percent"].includes(local.p.type) ? (
        <BoxSep>
          <FieldNumUnit
            dashIfEmpty
            positiveOnly
            unit={local.p.type === "percent" ? "%" : "px"}
            value={local.p.value + ""}
            update={(val) => {
              localUpdate("value", val);
            }}
          />
        </BoxSep>
      ) : (
        <></>
      )}
      <BoxSep>
        <FieldBtnRadio
          items={{ content: "CONTENT", full: "FULL", px: "Px", percent: "%" }}
          value={local.p.type}
          update={(value) => {
            localUpdate("type", value);
          }}
        />
      </BoxSep>
    </FieldBox>
  );
};
