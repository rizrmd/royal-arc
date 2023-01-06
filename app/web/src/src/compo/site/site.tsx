import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import {
  ChevronRight12Regular,
  Document16Regular,
  DocumentHeader16Filled,
  DocumentHeader16Regular,
} from "@fluentui/react-icons";
import { FC, ReactElement } from "react";
import { useLocal } from "web-utils";
import { Btn, BtnBox } from "../editor/toolbar/btn-box";
import { Layout, Page, Site } from "./type";

export const SiteEditor: FC<{
  site: Site;
  current: Page | Layout;
  children: (arg: { toolbar: ReactElement }) => ReactElement;
}> = ({ children, site, current }) => {
  return children({ toolbar: <SiteMenu site={site} current={current} /> });
};

const SiteMenu: FC<{ site: Site; current: Page | Layout }> = ({
  site,
  current,
}) => {
  const local = useLocal({ open: false });
  const type = (current as any).id_layout ? "page" : "layout";
  return (
    <>
      <BtnBox
        label={
          <div className="flex items-center">
            <DocumentHeader16Regular />
          </div>
        }
        className="ml-2 cursor-pointer"
      >
        <Popover
          open={local.open}
          onOpenChange={(_, { open }) => {
            local.open = open;
            local.render();
          }}
        >
          <PopoverTrigger>
            <Btn
              css={css`
                border-left: 1px solid #ececeb !important;
              `}
            >
              <div className="px-2">{current.name}</div>
            </Btn>
          </PopoverTrigger>
          <PopoverSurface
            css={css`
              padding: 0px;
            `}
            aria-label="Site Config"
          >
            <div>Haloha</div>
          </PopoverSurface>
        </Popover>
      </BtnBox>
    </>
  );
};
