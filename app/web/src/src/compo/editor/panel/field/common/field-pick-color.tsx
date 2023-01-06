import { Delete16Regular, Edit16Regular } from "@fluentui/react-icons";
import { ChangeEventHandler, FC } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../../../base/global/editor";

export const FieldPickColor: FC<{
  value?: string;
  onChangePicker: (value: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, onChangePicker, onChange }) => {
  const ed = useGlobal(EditorGlobal);

  return (
    <div className="flex space-x-2 items-start">
      <div
        className="flex flex-col items-center"
        css={css`
          input {
            width: 100%;
            padding: 3px;
            max-width: none;
            margin-top: 5px;
            border: 1px solid #999;
          }
        `}
      >
        <HexAlphaColorPicker color={value} onChange={onChangePicker} />
        <input
          value={value}
          className="rounded-sm"
          spellCheck={false}
          onChange={onChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-1.5">
        {ed.colors.map((e, key) => (
          <div
            key={key}
            className="flex space-x-1 items-center border p-0.5 rounded"
            css={css`
              :hover {
                border-color: ${e};
              }
              border-color: ${e === value ? e : "transparent"};
            `}
          >
            <div
              className={`w-12 h-4 rounded cursor-pointer bg-[${e}]`}
              css={css`
                background-color: ${e};
              `}
              style={{
                backgroundColor: e,
              }}
              onClick={() => {
                onChangePicker(e);
              }}
            />
            <Delete16Regular
              className={`cursor-pointer hover:text-[${e}]`}
              css={css`
                :hover {
                  color: ${e};
                }
              `}
              onClick={() => {
                const index = ed.colors.indexOf(e);
                if (index > -1) {
                  ed.colors.splice(index, 1);
                  ed.render();
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
