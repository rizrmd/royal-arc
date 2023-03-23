import { FC } from "react";
import { useLocal } from "web-utils";

const layout: FC<{ children: any }> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
