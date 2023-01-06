import { Button } from "@fluentui/react-components";
import { FC, forwardRef, ReactElement } from "react";

export const BtnBox = forwardRef<
  HTMLDivElement,
  {
    label?: string | ReactElement;
    className?: string;
    onClick?: () => void;
    children: ReactElement | ReactElement[];
  }
>(({ children, label, className, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-stretch transition-all rounded-sm ${
        className || ""
      }`}
      onClick={onClick}
      css={css`
        border: 1px solid #ececeb;
        height: 26px;

        &:hover {
          border: 1px solid #777;
          .btn {
            border-left: 1px solid #ececeb;
          }
        }
        .btn {
          border-left: 1px solid transparent;
          min-width: 28px;
          padding: 0px;
          height: 100%;
        }
      `}
    >
      {label && (
        <div className="text-[11px] pr-1 pl-1 space-x-1 flex items-center ">
          <span className="text-[#999]">{label}</span>
        </div>
      )}
      {children}
    </div>
  );
});

export const Btn = forwardRef<
  HTMLButtonElement,
  {
    children: ReactElement;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
  }
>(({ children, disabled, onClick, className }, ref) => {
  return (
    <Button
      ref={ref}
      disabled={disabled}
      appearance="subtle"
      shape="square"
      onClick={onClick}
      size="small"
      className={`flex items-center justify-center cursor-pointer btn ${className}`}
    >
      {children}
    </Button>
  );
});
