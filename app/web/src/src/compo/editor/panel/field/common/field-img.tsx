import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import { Image16Regular } from "@fluentui/react-icons";
import { FC, ReactElement, useEffect } from "react";
import { useLocal } from "web-utils";
import { ImgPicker } from "./img-picker";

export const FieldImg: FC<{
  value?: string;
  update: (value: string) => void;
}> = ({ value, update }) => {
  const local = useLocal({ val: "", open: false });

  useEffect(() => {
    local.val = value || "";
    local.render();
  }, [value]);

  return (
    <>
      <Button
        className="btn-hover"
        icon={
          local.val ? (
            <img src={`${serverurl}${local.val}?w=30&h=20`} />
          ) : (
            <Image16Regular />
          )
        }
        size="small"
        shape="square"
        appearance="subtle"
        onClick={() => {
          local.open = true;
          local.render();
        }}
      >
        Image
      </Button>
      {local.open && (
        <ImgPicker
          value={value}
          update={update}
          onClose={() => {
            local.open = false;
            local.render();
          }}
        />
      )}
    </>
  );
};
