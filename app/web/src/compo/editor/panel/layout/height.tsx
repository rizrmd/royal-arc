import { FC } from "react";

type ELHeightProp = {
  mode: "root";
  type: "content" | "screen" | "px" | "percent";
  value: null | number;
} | {
  mode: "child";
  type: "full" | "px" | "percent";
  value: null | number;
};
export const EditorLayoutHeight: FC<ELHeightProp> = () => {
  return <div></div>;
};
