import { GridSelection, NodeSelection, RangeSelection } from "lexical";
import { FFont } from "../../compo/editor/panel/field/font";
import { IContent } from "../../compo/editor/panel/item/_type";

export const EditorGlobal = {
  active: null as IContent | null,
  hover: null as IContent | null,
  panel: {
    left: { show: true },
    right: {
      show: true,
      peek: false,
      placement: "snap-right" as "snap-right" | "float",
    },
  },
  lexical: {
    focus: false as false | HTMLElement,
    selection: null as RangeSelection | null,
  },
  frm: null as null | HTMLIFrameElement,
  colors: ["#ef4444", "#22c55e", "#a955f7", "#0ea4e9", "#e9950e"] as string[],
  preview: "desktop" as "desktop" | "mobile",
  fontFamily: [] as any, // to prevent multiple append link stylesheet of font
};
