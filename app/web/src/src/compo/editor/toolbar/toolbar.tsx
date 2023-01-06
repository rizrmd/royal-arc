import { Tooltip } from "@fluentui/react-components";
import {
  Desktop16Regular,
  PanelLeft20Regular,
  PanelLeft24Regular,
  PanelLeftContract20Regular,
  PanelLeftContract24Regular,
  PanelRight20Regular,
  PanelRight24Regular,
  PanelRightContract20Regular,
  PanelRightContract24Regular,
  Phone16Regular,
} from "@fluentui/react-icons";
import { FC, ReactElement, useEffect } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { AddBtn } from "./btn-add";
import { Btn, BtnBox } from "./btn-box";
import { ModBtn } from "./btn-mod";

export const EditorToolbar: FC<{
  left?: ReactElement;
  right?: ReactElement;
}> = ({ left, right }) => {
  return (
    <div className="border-b min-h-[36px] flex justify-between items-stretch">
      <div className="flex items-stretch">
        <TogglePanel mode="left" />
        <div className="flex items-center">{left}</div>
      </div>
      <div className="flex items-center space-x-2 w-[220px]">
        <AddBtn />
        <ModBtn />
      </div>
      <div className="flex items-stretch flex-end">
        <div className="flex items-center">
          {right}
          <Preview preview="desktop" />
        </div>
        <TogglePanel mode="right" />
      </div>
    </div>
  );
};

const Preview: FC<{ preview: "mobile" | "desktop" }> = ({ preview }) => {
  const ed = useGlobal(EditorGlobal);

  return (
    <BtnBox label="MODE" className="mr-2">
      <Btn
        onClick={() => {
          ed.preview = "mobile";
          ed.render();
        }}
        css={
          ed.preview === "mobile" &&
          css`
            border-bottom: 2px solid #4387eb !important;
          `
        }
      >
        <Phone16Regular />
      </Btn>
      <Btn
        css={
          ed.preview === "desktop" &&
          css`
            border-bottom: 2px solid #4387eb !important;
          `
        }
        onClick={() => {
          ed.preview = "desktop";
          ed.render();
        }}
      >
        <Desktop16Regular />
      </Btn>
    </BtnBox>
  );
};

const TogglePanel: FC<{ mode: "left" | "right" }> = ({ mode }) => {
  const ed = useGlobal(EditorGlobal);

  const show = ed.panel[mode].show;
  return (
    <div
      className="flex items-center px-2 cursor-pointer hover:bg-slate-100"
      css={
        mode === "left"
          ? css`
              border-right: 1px solid #ececeb;
            `
          : css`
              border-left: 1px solid #ececeb;
            `
      }
      onClick={() => {
        ed.panel[mode].show = !show;
        ed.render();
      }}
    >
      {show ? (
        <>
          {mode === "left" ? (
            <PanelLeftContract20Regular />
          ) : (
            <PanelRightContract20Regular />
          )}
        </>
      ) : (
        <>
          {mode === "left" ? <PanelLeft20Regular /> : <PanelRight20Regular />}
        </>
      )}
    </div>
  );
};
