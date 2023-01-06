import {
  AlignCenterVertical16Regular,
  AlignLeft16Regular,
  AlignRight16Regular,
  TextAlignCenter16Regular,
  TextAlignJustify20Regular,
  TextAlignLeft16Regular,
  TextAlignRight16Regular,
} from "@fluentui/react-icons";
import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { BoxSep } from "./common/box-sep";
import { FieldBox } from "./common/field-box";
import { FieldBtnRadio } from "./common/field-btn-radio";

const EmptyAlign = "left";

export const FieldTextAlign: FC<{
  value?: string;
  update: (val: string) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    p: value || EmptyAlign,
  });

  useEffect(() => {
    local.p = value || EmptyAlign;
    local.render();
  }, [value]);

  return (
    <FieldBox label={"Text Align"}>
      <div className="flex justify-center flex-1">
        <BoxSep className="">
          <FieldBtnRadio
            items={{
              left: <TextAlignLeft16Regular />,
              center: <TextAlignCenter16Regular />,
              right: <TextAlignRight16Regular />,
              justify: <TextAlignJustify20Regular />,
            }}
            value={local.p}
            update={(value) => {
              update(value);
            }}
          />
        </BoxSep>
      </div>
    </FieldBox>
  );
};
