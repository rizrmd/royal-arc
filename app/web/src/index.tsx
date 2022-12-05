import { createRoot } from "react-dom/client";
import { App, initEnv } from "web-init";
import "web-init/src/global";
import layout from "../types/layout";
import page from "../types/page";
import "./index.css";

initEnv({ page, layout }).then(() => {
  const rootNode = document.getElementById("root");
  if (rootNode) {
    const root = createRoot(rootNode);
    root.render(<App />);
  }
});
