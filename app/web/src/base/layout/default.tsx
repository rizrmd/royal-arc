import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { layout } from "web-init";
import { customTheme } from "../../theme";

let theme = {} as any;
theme = webLightTheme;
export default layout({
  component: ({ children }) => {
    return (
      <FluentProvider theme={{ ...theme, ...customTheme }}>
        {children}
      </FluentProvider>
    );
  },
});
