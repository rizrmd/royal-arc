import {
  ArrowDown12Regular,
  ArrowLeft12Regular,
  ArrowRight12Regular,
  ArrowUp12Regular,
} from "@fluentui/react-icons";
import produce from "immer";
import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { FieldNumUnit } from "./common/field-num-unit";
import { FieldBox } from "./common/field-box";
import { BoxSep } from "./common/box-sep";
import { FieldColor } from "./common/field-color";

export type FBorder = {
  all: string;
  t: string;
  l: string;
  r: string;
  b: string;
  color?: string;
};
const EmptyBorder = {
  all: "0px",
  t: "0px",
  l: "0px",
  r: "0px",
  b: "0px",
  color: "#000000",
};
export const FieldBorder: FC<{
  value?: FBorder;
  update: (val: FBorder) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    b: value || EmptyBorder,
    t_width: true,
    b_width: true,
    l_width: true,
    r_width: true,
  });

  const getNumberUnit = (val: string, unit = 2) => {
    return parseInt(val.slice(0, -unit));
  };
  useEffect(() => {
    local.b = value || EmptyBorder;

    if (!local.t_width) {
      local.t_width = getNumberUnit(local.b.t) > 0 ? true : false;
    }

    if (!local.b_width) {
      local.b_width = getNumberUnit(local.b.b) > 0 ? true : false;
    }

    if (!local.l_width) {
      local.l_width = getNumberUnit(local.b.l) > 0 ? true : false;
    }

    if (!local.r_width) {
      local.r_width = getNumberUnit(local.b.r) > 0 ? true : false;
    }

    local.render();
  }, [value]);

  const localUpdate = (key: string, value: string) => {
    local.b = produce(local.b, (draft) => {
      (draft as any)[key] = value;
    });
    update(local.b);
  };

  return (
    <FieldBox label="Border">
      <BoxSep>
        <FieldColor
          value={local.b?.color}
          update={(color) => {
            localUpdate("color", color);
          }}
        />
      </BoxSep>
      <div
        className={`items-center flex cursor-pointer ${
          local.l_width ? "text-black" : "text-gray-200"
        }`}
        onClick={() => {
          local.l_width = !local.l_width;
          local.render();

          localUpdate("l", local.l_width ? local.b.all : "0px");
        }}
      >
        <ArrowLeft12Regular />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`cursor-pointer ${
            local.t_width ? "text-black" : "text-gray-200"
          }`}
          onClick={() => {
            local.t_width = !local.t_width;
            local.render();

            localUpdate("t", local.t_width ? local.b.all : "0px");
          }}
        >
          <ArrowUp12Regular />
        </div>
        <div className="border">
          <FieldNumUnit
            positiveOnly
            label=""
            value={local.b.all}
            update={(val) => {
              localUpdate("all", val);
              localUpdate("l", local.l_width ? val : "0px");
              localUpdate("t", local.t_width ? val : "0px");
              localUpdate("b", local.b_width ? val : "0px");
              localUpdate("r", local.r_width ? val : "0px");
            }}
          />
        </div>
        <div
          className={`cursor-pointer ${
            local.b_width ? "text-black" : "text-gray-200"
          }`}
          onClick={() => {
            local.b_width = !local.b_width;
            local.render();

            localUpdate("b", local.b_width ? local.b.all : "0px");
          }}
        >
          <ArrowDown12Regular />
        </div>
      </div>
      <div
        className={`items-center flex cursor-pointer ${
          local.r_width ? "text-black" : "text-gray-200"
        }`}
        onClick={() => {
          local.r_width = !local.r_width;
          local.render();

          localUpdate("r", local.r_width ? local.b.all : "0px");
        }}
      >
        <ArrowRight12Regular />
      </div>
    </FieldBox>
  );
};
