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
  return (
    <FrameProvider>
      <App 
        onInit={(local) => {
          if (location.hostname.endsWith("lmtd.id")) {
            const domain = location.hostname.split(".").shift();
            local.url = `/site/${domain}/${location.pathname.substring(1)}`;
          }
        }}
      />
    </FrameProvider>
  );
};
