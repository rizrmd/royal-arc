import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { FieldColorPicker } from "./field-color-picker";

export const FieldColor: FC<{
  value?: string;
  update: (value: string) => void;
}> = ({ value, update }) => {
  const local = useLocal({ val: "" });

  useEffect(() => {
    local.val = value || "";
    local.render();
  }, [value]);

  return (
    <FieldColorPicker value={local.val} update={(val) => update(val)}>
      <div
        css={css`
          background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
        `}
      >
        <div
          css={css`
            background: ${local.val};
            width: 30px;
            height: 20px;
          `}
        ></div>
      </div>
    </FieldColorPicker>
  );
};
