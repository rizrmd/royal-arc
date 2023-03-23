import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Suspense } from "react";
import { Root, ServerScript, ServerStyle, setupEnv } from "web-init";
import type { SSR } from "web-init/src/types";
import { Loading } from "./compo/loading";

setupEnv();

export const App: SSR["App"] = ({ initScript, name, props, res: req }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Royal</title>
        <link rel="stylesheet" href="/index.css" />
        {isSSR && (
          <Suspense>
            <ServerStyle />
          </Suspense>
        )}
      </head>
      <body className="flex flex-col flex-1 w-full min-h-screen" id="root">
        <div
          className={cx(
            "flex-1 flex flex-col",
            css`
              > div {
                flex: 1;
                display: flex;
                flex-direction: column;
              }
            `
          )}
        >
          <Root name={name} loading={<Loading />} props={props} res={req} />
        </div>
        <ServerScript source={initScript} />
      </body>
    </html>
  );
};
