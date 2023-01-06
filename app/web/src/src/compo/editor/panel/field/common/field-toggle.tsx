import { Switch } from "@fluentui/react-components";
import React, { FC, ReactElement, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";

export const FieldToggle: FC<{
  value?: boolean;
  update: (value: boolean) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    slider: value || false,
  });

  useEffect(() => {
    local.slider = value || false;
    local.render();
  }, [value]);

  const onChange = useCallback(
    (ev: any) => {
      local.slider = ev.currentTarget.checked;
      local.render();

      update(local.slider);
    },
    [local.slider]
  );

  return (
    <div>
      <Switch
        label={local.slider ? "On" : "Off"}
        labelPosition="before"
        defaultChecked={local.slider}
        onChange={onChange}
      />
    </div>
  );
};
