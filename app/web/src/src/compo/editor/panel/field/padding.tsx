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

export type FPadding = {
  all: string;
  t: string;
  l: string;
  r: string;
  b: string;
};
const EmptyPadding = { all: "0px", t: "0px", l: "0px", r: "0px", b: "0px" };
export const FieldPadding: FC<{
  value?: FPadding;
  update: (val: FPadding) => void;
}> = ({ value, update }) => {
  const local = useLocal({
    p: value || EmptyPadding,
  });

  useEffect(() => {
    local.p = value || EmptyPadding;
    local.render();
  }, [value]);

  const localUpdate = (key: string, value: string) => {
    local.p = produce(local.p, (draft) => {
      (draft as any)[key] = value;
    });
    update(local.p);
  };

  return (
    <FieldBox label="Padding" mode="col">
      <div className="flex items-stretch">
        <BoxSep className="border-none">
          <FieldNumUnit
            positiveOnly
            label="ALL"
            value={local.p.all}
            update={(val) => {
              localUpdate("all", val);
              localUpdate("l", val);
              localUpdate("t", val);
              localUpdate("b", val);
              localUpdate("r", val);
            }}
          />
        </BoxSep>
        <BoxSep>
          <FieldNumUnit
            positiveOnly
            icon={<ArrowLeft12Regular />}
            value={local.p.l}
            update={(val) => {
              localUpdate("l", val);
            }}
          />
        </BoxSep>

        <BoxSep>
          <div className="flex flex-col items-center">
            <FieldNumUnit
              positiveOnly
              icon={<ArrowUp12Regular />}
              value={local.p.t}
              update={(val) => {
                localUpdate("t", val);
              }}
            />
            <div className="flex"></div>
            <FieldNumUnit
              positiveOnly
              icon={<ArrowDown12Regular />}
              value={local.p.b}
              update={(val) => {
                localUpdate("b", val);
              }}
            />
          </div>
        </BoxSep>
        <BoxSep>
          <FieldNumUnit
            positiveOnly
            icon={<ArrowRight12Regular />}
            value={local.p.r}
            update={(val) => {
              localUpdate("r", val);
            }}
          />
        </BoxSep>
      </div>
    </FieldBox>
  );
};
