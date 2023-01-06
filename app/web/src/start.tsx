import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import weakMemoize from "@emotion/weak-memoize";
import { App } from "web-init";

let memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  return createCache({
    key: "ryl",
    container,
  });
});
const FrameProvider = (props: any) => (
  <CacheProvider
    value={
      isSSR
        ? createCache({ key: "ryl" })
        : memoizedCreateCacheWithContainer(window.document.body)
    }
  >
    {props.children}
  </CacheProvider>
);

export const Start = () => {
  return <App />;
};
