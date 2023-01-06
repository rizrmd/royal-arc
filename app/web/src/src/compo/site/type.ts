import { IContent } from "../editor/panel/item/_type";
import { layout, page, site } from "dbgen";

export type Site = site & {
  pages: Page[];
  layouts: Layout[];
  colors: string[];
};

export type Page = page & {
  loaded: boolean;
  parseTree: () => IContent;
  updateTree: (content: IContent) => void;
};

export type Layout = layout & {
  loaded: boolean;
  parseTree: () => IContent;
  updateTree: (content: IContent) => void;
};
