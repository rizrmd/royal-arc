import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../../base/global/editor";
import { FieldBox } from "./common/field-box";
import { FieldSelect } from "./common/field-select";

export type FFont =
  | {
      name: string;
      weight: {}[];
    }
  | undefined;

const EmptyFont: FFont = {
  name: "",
  weight: [],
};

export const FieldFont: FC<{
  value?: FFont;
  update: (val: FFont) => void;
}> = ({ value, update }) => {
  const ed = useGlobal(EditorGlobal);
  const local = useLocal({
    font: value || EmptyFont,
    items: [] as any,
  });

  const loadJSON = (callback: any) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "./font.json", true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == 200) {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  };

  useEffect(() => {
    local.font = value || EmptyFont;
    local.render();

    loadJSON((res: any) => {
      local.items = JSON.parse(res);
    });
  }, [value]);

  return (
    <FieldBox label="Font">
      <div className="items-center flex">
        <FieldSelect
          value={local.font.name}
          items={local.items.map((e: any, key: number) => {
            return { key: e.name, value: e.name, el: <div>{e.name}</div> };
          })}
          update={(val) => {
            let font = {} as FFont;
            if (val) {
              font = local.items.find(
                (font: any, x: number) => font.name === val
              );
              update(font);
            }
          }}
        />
      </div>
    </FieldBox>
  );
};
