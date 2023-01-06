import { Tooltip } from "@fluentui/react-components";
import { Desktop20Regular, Phone20Regular } from "@fluentui/react-icons";
import produce from "immer";
import capitalize from "lodash.capitalize";
import { FC } from "react";
import { IContent } from "../panel/item/_type";

export const ResponsiveToggle: FC<{
  content: IContent;
  update: (name: string, newItem: IContent) => void;
  activate: (item: IContent) => void;
}> = ({ content, update, activate }) => {
  return (
    <div
      className="flex cursor-pointer flex-end"
      css={css`
        svg:hover {
          opacity: 0.5;
        }

        svg.inactive {
          opacity: 0.1;
        }
      `}
    >
      <Tooltip relationship="label" content={"Mobile Only"}>
        <div>
          <Phone20Regular
            onClick={() => {
              const newContent = produce(content, (draft) => {
                draft.responsive.mobile = !draft.responsive.mobile;
              });
              update(`Toggle ${capitalize(content.type)} Mobile`, newContent);
              activate(newContent);
            }}
            className={content.responsive.mobile ? "active" : "inactive"}
          />
        </div>
      </Tooltip>

      <Tooltip relationship="label" content={"Desktop Only"}>
        <div>
          <Desktop20Regular
            onClick={() => {
              const newContent = produce(content, (draft) => {
                draft.responsive.desktop = !draft.responsive.desktop;
              });
              update(`Toggle ${capitalize(content.type)} Desktop`, newContent);
              activate(newContent);
            }}
            className={content.responsive.desktop ? "active" : "inactive"}
          />
        </div>
      </Tooltip>
    </div>
  );
};
