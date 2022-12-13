import { createRoot } from "react-dom/client";
import { App, initEnv } from "web-init";
import "./index.css";

initEnv("web").then(() => {
  const rootNode = document.getElementById("root");
  if (rootNode) {
    const root = createRoot(rootNode);
    root.render(<App />);
  }
});
