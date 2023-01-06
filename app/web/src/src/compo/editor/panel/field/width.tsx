import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { BoxSep } from "./common/box-sep";
import { FieldBox } from "./common/field-box";
import { FieldBtnRadio } from "./common/field-btn-radio";
import { FieldNumUnit } from "./common/field-num-unit";

export type FWidth = {
  type: "full" | "custom";
  unit?: "px" | "percent";
  value?: string;
};

export const FieldWidth: FC<{
  defaultType: FWidth["type"];
  value?: FWidth;
  update: (val: FWidth) => void;
}> = ({ value, update, defaultType }) => {
  const local = useLocal({
    p: value || { type: defaultType },
  });

  useEffect(() => {
    local.p = value || { type: defaultType };
    local.render();
  }, [value]);

  const localUpdate = useCallback(
    (key: string, value: any) => {
      local.p = produce(local.p || { type: defaultType }, (draft) => {
        (draft as any)[key] = value;
      });
      update(local.p as any);
    },
    [local.p]
  );

  return (
    <FieldBox label="Width">
      {["custom"].includes(local.p.type) ? (
        <>
          <BoxSep>
            <FieldNumUnit
              dashIfEmpty
              positiveOnly
              unit={local.p.unit === "percent" ? "%" : "px"}
              value={local.p.value + ""}
              update={(val) => {
                localUpdate("value", val);
              }}
            />
          </BoxSep>
          <BoxSep>
            <FieldBtnRadio
              items={{
                px: "Px",
                percent: "%",
              }}
              value={local.p.unit}
              update={(value) => {
                localUpdate("unit", value);
              }}
            />
          </BoxSep>
        </>
      ) : (
        <></>
      )}
      <BoxSep>
        <FieldBtnRadio
          items={{
            full: "FULL",
            custom: "CUSTOM",
          }}
          value={local.p.type}
          update={(value) => {
            localUpdate("type", value);
          }}
        />
      </BoxSep>
    </FieldBox>
  );
};
