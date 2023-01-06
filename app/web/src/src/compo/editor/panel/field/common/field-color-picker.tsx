import {
  Button,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import { FC, ReactElement, useEffect } from "react";
import { useLocal } from "web-utils";
import { FieldPickColor } from "./field-pick-color";

export const FieldColorPicker: FC<{
  children: ReactElement;
  value?: string;
  update: (value: string) => void;
}> = ({ children, value, update }) => {
  const local = useLocal({ val: "", show: false });
  const handleOpenChange: PopoverProps["onOpenChange"] = (e, data) => {
    local.show = data.open || false;
    local.render();
  };

  useEffect(() => {
    local.val = value || "";
    local.render();
  }, [value]);

  return (
    <Popover open={local.show}>
      <PopoverTrigger disableButtonEnhancement>
        <Button
          className="btn-hover"
          size="small"
          shape="square"
          appearance="subtle"
          onClick={() => {
            local.show = !local.show;
            local.render();
          }}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverSurface
        aria-label="Pick Color"
        onMouseOver={() => {
          local.show = true;
          local.render();
        }}
        onMouseOut={() => {
          local.show = false;
          local.render();
        }}
      >
        <FieldPickColor
          value={local.val}
          onChangePicker={(color) => {
            if (color.indexOf("NaN") < 0) {
              update(color);
            }
          }}
          onChange={(e) => {
            update(e.currentTarget.value);
          }}
        />
      </PopoverSurface>
    </Popover>
  );
};
