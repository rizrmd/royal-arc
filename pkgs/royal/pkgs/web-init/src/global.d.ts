import * as emotion from "@emotion/react";
export {};
import { IAppRoot } from "index";
import { Fragment as _Fragment } from "react";
import { jsx as _jsx } from "./core/jsx";

declare global {
  const css: typeof emotion.css;
  const navigate: (src: string) => void;

  const mode: "dev" | "prod" | "pkg";

  const jsx: typeof _jsx;
  const Fragment: typeof _Fragment;
  const Capacitor: any;
  const isMobile: boolean;
  const mobile: {
    ready: boolean;
    insets: any;
  };
  const devStamp: number;
  const preventPopRender: boolean;
  const appRoot: IAppRoot & { render: () => void };
  const apiHeaders: Record<string, string>;
  const dbDefinitions: Record<string, any>;
  const auth: any;
  const basepath: string;
  const pathname: string;
  const baseurl: string;
  const serverurl: string;
  const params: any;
}
