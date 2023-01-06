import { FBg } from "../field/bg";
import { FBorder } from "../field/border";
import { FFont } from "../field/font";
import { FHeight } from "../field/height";
import { FPadding } from "../field/padding";
import { IItem } from "./item";
import { IImg } from "./img";
import { ISection } from "./section";
import { IText } from "./text";

export type BaseItem = {
  id: string;
  name: string;
  depth: number;
  type: "section" | "item" | "text" | "img";
  childs: IContent[];
  padding?: FPadding;
  border?: FBorder;
  bg?: FBg;
  font?: FFont;
  slider?: boolean;
  responsive: {
    mobile: boolean;
    desktop: boolean;
  };
};

export type IContent = ISection | IItem | IText | IImg;
