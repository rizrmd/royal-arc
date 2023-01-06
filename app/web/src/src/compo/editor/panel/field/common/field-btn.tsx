import { FC, ReactElement } from "react";

export const FieldBtn: FC<{ children: ReactElement | ReactElement[] }> = ({
  children,
}) => {
  return <>{children}</>;
};
