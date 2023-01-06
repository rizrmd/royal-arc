import { layout } from "web-init";

export default layout({
  ssr: true,
  component: ({ children }) => {
    return <>{children}</>;
  },
});
