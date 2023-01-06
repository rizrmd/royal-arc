import { FC, ReactElement } from "react";

export const FieldBox: FC<{
  label: string | ReactElement;
  mode?: "row" | "col";
  children: ReactElement | string | (ReactElement | string)[];
}> = ({ label, children, mode = "row" }) => {
  return (
    <div className={`flex items-stretch bg-white border-b flex-${mode}`}>
      <div
        className={`flex items-center text-xs uppercase text-slate-500 ${
          mode === "row" ? "px-2" : "pl-1 mt-2 -mb-1"
        }`}
      >
        {label}
      </div>
      <div
        className={`flex items-stretch flex-1 ${
          mode === "row" ? "pl-2 justify-end" : "pl-1"
        }`}
        css={css`
          button {
            padding: 3px;
            min-width: 25px;
          }

          .btn-hover {
            font-size: 11px;
            &:hover {
              border: 1px solid #aaa;
            }
          }

          ${mode !== "row" &&
          css`
            .box-sep {
              border: 0px;
            }
          `}
        `}
      >
        {children}
      </div>
    </div>
  );
};
