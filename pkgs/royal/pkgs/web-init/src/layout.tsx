import { FC, ReactElement } from "react";

type ILayout = {
  component: FC<{ children?: ReactElement }>;
};

export const layout = (opt: ILayout) => {
  return opt.component;
};
