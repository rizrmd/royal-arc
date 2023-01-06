import { FC, ReactElement, useEffect, useRef } from "react";
import { useLocal } from "web-utils";
import { Option, Select } from "@fluentui/react-components/unstable";
import { Dropdown } from "@fluentui/react-components/unstable";
import {
  Input,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningImperativeRef,
} from "@fluentui/react-components";
import { Checkmark16Filled, ChevronDown16Regular } from "@fluentui/react-icons";

type FieldSelectItem = {
  key: string;
  value: string;
  el?: ReactElement;
};

export const FieldSelect: FC<{
  value?: string;
  items: FieldSelectItem[];
  label?: string;
  update: (value: string) => void;
}> = ({ value, update, items, label }) => {
  const local = useLocal({
    val: "",
    items: [] as FieldSelectItem[],
    focus: false,
    show: false,
    hover: false,
    el: null as any,
    search: "",
  });
  const posref = useRef<PositioningImperativeRef>(null);

  useEffect(() => {
    local.val = value || "";
    local.render();
  }, [value]);

  useEffect(() => {
    const myElement = document.getElementById("panel");
    const topPos = myElement?.offsetTop;
    if (myElement) {
      if (local.show) {
        const childElement = document.getElementById(
          local.val.replace(" ", "-").toLowerCase()
        );
        if (childElement) {
          childElement.scrollIntoView();
        }
      }
    }
  }, [local.show]);

  return (
    <div
      className="flex items-center justify-between space-x-1 bg-white"
      css={css`
        .fui-PopoverSurface {
          padding: 0px !important;
        }
      `}
    >
      <div className="flex">
        {label && (
          <label
            htmlFor="fui-5"
            className="flex items-center justify-center text-[11px] opacity-50 w-[30px]"
          >
            {label}
          </label>
        )}
      </div>

      <Popover open={local.show} positioning="below" size="small">
        <PopoverTrigger>
          <Input
            ref={(el) => (local.el = el)}
            contentAfter={
              <ChevronDown16Regular
                onClick={() => {
                  if (local.el) local.el.focus();
                }}
              />
            }
            onBlur={() => {
              local.focus = false;
              if (!local.hover) {
                local.search = "";
                local.show = false;
                local.render();
              }
            }}
            onFocus={() => {
              local.show = true;
              local.focus = true;
              local.render();
            }}
            value={local.val}
            onChange={(e) => {
              const val = e.target.value;
              local.val = val;
              local.search = val;
              local.render();
            }}
            className="!border-none"
          />
        </PopoverTrigger>
        <PopoverSurface aria-label="Pick Font" className="!p-0 min-w-[15rem]">
          <div
            id="panel"
            className="bg-white py-2 px-3 grid grid-cols-1 gap-y-1.5 text-sm max-h-[20rem] overflow-scroll scroll-auto"
            onMouseOver={() => {
              local.hover = true;
              local.render();
            }}
            onMouseOut={() => {
              local.hover = false;
              if (!local.focus) {
                local.search = "";
                local.show = false;
              }
              local.render();
            }}
          >
            {items
              .filter((v) =>
                v.value.toLowerCase().includes(local.search.toLowerCase())
              )
              .map((e, key) => (
                <div
                  id={e.value.replace(" ", "-").toLowerCase()}
                  key={key}
                  className={`cursor-pointer flex items-center space-x-2 ${
                    local.val === e.value && "text-green-500"
                  }`}
                  onClick={() => {
                    update(e.value);
                    local.val = e.value;
                    local.render();
                  }}
                >
                  <span>{e.value}</span>
                  {local.val === e.value && <Checkmark16Filled />}
                </div>
              ))}
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
