import { hydrateRoot, createRoot } from "react-dom/client";
import "virtual:fonts.css";
import { initEnv } from "web-init";
import "./index.css";
import { Start } from "./start";

const w = window as any;

initEnv("web").then(() => {
  const rootNode = document.getElementById("root");
  if (rootNode) {
    const el = <Start />;

    if (w._hyd) {
      hydrateRoot(rootNode, el);
    } else {
      createRoot(rootNode).render(el);
    }
  }
});
