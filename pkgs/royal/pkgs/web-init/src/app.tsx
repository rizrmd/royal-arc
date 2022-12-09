import { createRouter } from "radix3";
import { FC, Suspense } from "react";
import { GlobalContext, useLocal } from "web-utils";
import { loadPageAndLayout } from "./core/router";
import { ErrorBoundary } from "./error";

const w = window as typeof window & {
  lazyPages: any;
  lazyLayout: any;
};
export type IAppRoot = {
  url: string;
  layout: {
    name?: string;
    current?: FC<{ children: any }>;
    last?: FC;
    list: Record<string, () => Promise<{ default: React.ComponentType<any> }>>;
  };
  initialized: boolean;
  page: {
    name?: string;
    current?: FC;
    list: Record<
      string,
      () => Promise<{
        url: string;
        component: () => Promise<React.ComponentType<any>>;
      }>
    >;
  };
  router?: ReturnType<typeof createRouter>;
  cached: Record<
    "page" | "layout",
    Record<string, { layout: string; page: FC }>
  >;
  global: WeakMap<any, any>;
  mounted: boolean;
};

export const App = () => {
  const local = useLocal(
    {
      url: "",
      layout: {},
      page: {},
      mounted: true,
      global: new WeakMap(),
      initialized: false,
    } as IAppRoot,
    () => {
      return () => {
        w.appRoot.mounted = false;
      };
    }
  );

  w.appRoot = local;

  if (local.url !== location.pathname || !local.initialized) {
    local.url = location.pathname;
    loadPageAndLayout(local);
  }

  const Layout = local.layout.current;
  const Page = local.page.current;

  if (!Layout || !Page) {
    return null;
  }

  return (
    <GlobalContext.Provider
      value={{
        global: local.global,
        render: () => {
          local.render();
        },
      }}
    >
      <OptionalSuspense>
        <Layout>
          <OptionalSuspense>
            <Page />
          </OptionalSuspense>
        </Layout>
      </OptionalSuspense>
    </GlobalContext.Provider>
  );
};

const OptionalSuspense: FC<{ children: any }> = ({ children }) => {
  return children.$$typeof ? (
    <Suspense fallback={null}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  ) : (
    <ErrorBoundary>{children}</ErrorBoundary>
  );
};
