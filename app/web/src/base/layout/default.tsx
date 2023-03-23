import {
  Button,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import { FC } from "react";
import { useLocal } from "web-utils";
import { Loading } from "../../compo/loading";

const layout: FC<{ children: any }> = ({ children }) => {
  return (
    <FluentProvider
      theme={webLightTheme}
      targetDocument={isSSR ? undefined : window.document}
    >
      <div className="bg-red-300">{children}</div>
      <Button appearance="primary">Haloha</Button>
    </FluentProvider>
  );
};

export default layout;
