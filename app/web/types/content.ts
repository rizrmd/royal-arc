import { default as _layouts } from "gen/web.layout";
import { default as _pages } from "gen/web.page";
import { FC } from "react";
export const layouts = _layouts["web"];
export const pages = _pages["web"];

type IPage = {
  url: string;
  layout?: keyof typeof layouts;
  ssr?: boolean;
  component: FC<{ layout: any & { ready: boolean; render: () => void } }>;
};

export const page = (opt: IPage) => {
  return opt;
};
