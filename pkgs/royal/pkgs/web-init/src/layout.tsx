import { FC, ReactElement } from "react";

type ILayout = {
  ssr?: boolean;
  component: FC<{ children?: ReactElement }>;
};

export const layout = (opt: ILayout) => {
  return opt.component;
};
