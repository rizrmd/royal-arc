import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import { App, initEnv } from "web-init";
import 'virtual:fonts.css'
import "./index.css";
import { customTheme } from "./theme";


initEnv("web").then(() => {
  const rootNode = document.getElementById("root");
  if (rootNode) {
    const root = createRoot(rootNode);

    let theme = {} as any;
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = webDarkTheme;
      } else {
        theme = webLightTheme;
      }
    } else theme = webLightTheme;

    root.render(
      <FluentProvider theme={{ ...theme, ...customTheme }}>
        <App />
      </FluentProvider>,
    );
  }
});
