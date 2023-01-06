import { useEffect, useRef } from "react";
import { useUndoRedo } from "../../../lib/undo-redo";
import { IContent } from "../panel/item/_type";
import { RenderContentWithEditor } from "./content-editor";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import weakMemoize from "@emotion/weak-memoize";

import Frame, { FrameContextConsumer } from "react-frame-component";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { Loading } from "../../loading";
export const EditorRender = () => {
  const ed = useGlobal(EditorGlobal);
  const s = useUndoRedo<IContent>("editor");
  const iref = useRef<HTMLIFrameElement>(null);
  const local = useLocal({ styles: [] as string[], link: [] as string[] });
  useEffect(() => {
    local.link = [];
    for (const i of document.getElementsByTagName("link")) {
      if (i.rel === "stylesheet") {
        local.link.push(i.href);
      }
    }

    local.styles = [];
    for (const i of document.getElementsByTagName("style")) {
      if (i.innerText) local.styles.push(i.innerText);
    }
    local.render();
  }, []);

  useEffect(() => {
    if (iref.current) {
      if (iref.current) {
        ed.frm = iref.current;
        ed.render();
      }
    }
  }, [iref.current, local.link]);

  return (
    <div className={`relative flex flex-col items-stretch flex-1 bg-white`}>
      {local.link.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center h-full bg-slate-100">
          <Loading />
        </div>
      ) : (
        <Frame
          ref={iref}
          className={`absolute inset-0 h-full bg-slate-100 ${
            ed.preview === "desktop" ? "w-full" : "w-1/2 mx-auto"
          }`}
          mountTarget="#root-render"
          initialContent={`
        <!DOCTYPE html><html><head>
        ${local.link
          .filter((e) => e)
          .map((e) => `<link rel="stylesheet" href="${e}">`)
          .join("\n")}
        ${local.styles.map((e) => `<style>${e}</style>`).join("\n")}
        <style>
          .frame-content {
            display:flex;
            flex-direction:column;
          }
        </style>
        </head>
        <body>
          <div id="root">
            <div className="fui-FluentProvider">
              <div className="flex flex-col flex-1 select-none" id="root-render">
              </div>
            </div>
          </div>
        </body>
        </html>
      `}
        >
          {ed.frm && (
            <FrameProvider>
              <RenderContentWithEditor content={s.current} update={s.action} />
            </FrameProvider>
          )}
        </Frame>
      )}
    </div>
  );
};

let memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  let newCache = createCache({
    key: "rdr",
    container,
    insertionPoint: document.body,
  });
  return newCache;
});

export const FrameProvider = (props: any) => (
  <FrameContextConsumer>
    {({ document }) => {
      if (document)
        return (
          <CacheProvider
            value={memoizedCreateCacheWithContainer(document.body)}
          >
            {props.children}
          </CacheProvider>
        );
    }}
  </FrameContextConsumer>
);
