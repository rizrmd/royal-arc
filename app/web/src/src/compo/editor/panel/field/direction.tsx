import { SwipeDown20Regular, SwipeRight20Regular } from "@fluentui/react-icons";
import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { BoxSep } from "./common/box-sep";
import { FieldBox } from "./common/field-box";
import { FieldBtnRadio } from "./common/field-btn-radio";

export type FDirection = {
  mode: "left-to-right" | "top-to-bottom";
};
export const FieldDirection: FC<{
  value?: FDirection;
  update: (val: FDirection) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    p: value || { mode: "top-to-bottom"},
  });

  useEffect(() => {
    local.p = value || { mode: "top-to-bottom"};
    local.render();
  }, [value]);

  const localUpdate = useCallback(
    (key: string, value: any) => {
      local.p = produce(local.p || { mode: "top-to-bottom" }, (draft) => {
        (draft as any)[key] = value;
      });
      update(local.p as any);
    },
    [local.p]
  );

  return (
    <FieldBox label="Direction">
      <BoxSep>
        <FieldBtnRadio
          items={{
            "top-to-bottom": <SwipeDown20Regular />,
            "left-to-right": <SwipeRight20Regular />,
          }}
          value={local.p.mode}
          update={(value) => {
            localUpdate("mode", value);
          }}
        />
      </BoxSep>
    </FieldBox>
  );
};
