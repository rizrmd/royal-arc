import { FC } from "react";

const layout: FC<{ children: any }> = ({ children }) => {
  return <div className="bg-red-300">{children}</div>;
};

export default layout;
