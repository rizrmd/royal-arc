import { Button } from "@fluentui/react-components";
import { FC, ReactElement } from "react";

export const FieldBtnRadio: FC<{
  value: any;
  update: (value: any) => void;
  items: Record<string, ReactElement | String>;
}> = ({ items, update, value }) => {
  return (
    <>
      {Object.entries(items).map(([name, content], idx) => {
        return (
          <Button
            key={idx}
            size="small"
            shape="square"
            className="btn-hover"
            onClick={() => {
              update(name);
            }}
            appearance={value === name ? "secondary" : "subtle"}
          >
            {content}
          </Button>
        );
      })}
    </>
  );
};
