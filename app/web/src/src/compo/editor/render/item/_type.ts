import React from "react";
import { IContent } from "../../panel/item/_type";

export type RItemProp = Partial<{
  active: IContent | null;
  hover: IContent | null;
  root: IContent;
  update: (name: string, newState: IContent) => void;
  onHover: (e: React.MouseEvent, item: IContent) => Promise<void>;
  onOut: (e: React.MouseEvent, item: IContent) => Promise<void>;
  onClick: (e: React.MouseEvent, item: IContent) => Promise<void>;
  isEditor: boolean
}>;
