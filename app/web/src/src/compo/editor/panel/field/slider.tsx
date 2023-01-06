import { FC } from "react";
import { useLocal } from "web-utils";
import { FieldBox } from "./common/field-box";
import { FieldToggle } from "./common/field-toggle";

export const FieldSlider: FC<{
  value?: boolean;
  update: (val: boolean) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    slider: value || false,
  });
  return (
    <FieldBox label="Slider">
      <div className="items-center flex">
        <FieldToggle
          value={local.slider}
          update={(val) => {
            local.slider = val;
            update(local.slider);
          }}
        />
      </div>
    </FieldBox>
  );
};
