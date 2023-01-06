import { FC, ReactElement, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../base/global/editor";
import { useUndoRedo } from "../../lib/undo-redo";
import { IContent } from "./panel/item/_type";
import { EditorPanel } from "./panel/panel";
import { findByID } from "./util/find-by-id";
import { EditorRender } from "./render/render";
import { EditorToolbar } from "./toolbar/toolbar";
import { EditorSubPanel } from "./panel/sub-panel";

export const Editor: FC<{
  toolbar?: ReactElement;
  content: IContent;
  updateContent: (content: IContent) => void;
}> = ({ content, updateContent, toolbar }) => {
  const s = useUndoRedo<IContent>("editor", {
    state: content,
    update: updateContent,
    on: {
      afterUndoRedo: () => {
        if (ed.active) {
          const found = findByID(ed.active.id, s.current);
          if (found) {
            ed.active = found.content;
          } else {
            ed.active = null;
          }
          ed.render();
        }
      },
    },
  });
  const ed = useGlobal(EditorGlobal, () => {
    const found = findByID("clc13ev7800013b6a3fzg741o", s.current);
    if (found) {
      ed.active = found.content;
      ed.render();
    }
  });

  useEffect(() => {
    const undoFunc = (evt: KeyboardEvent) => {
      if (ed.lexical.focus) return;
      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        s.undo();
      }
    };

    const redoFunc = (evt: KeyboardEvent) => {
      if (ed.lexical.focus) return;
      if (
        (evt.key === "Y" || evt.key === "y") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        s.redo();
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        evt.shiftKey
      ) {
        s.redo();
      }
    };

    document.addEventListener("keydown", redoFunc, false);
    document.addEventListener("keydown", undoFunc, false);
    return () => {
      document.removeEventListener("keydown", redoFunc, false);
      document.removeEventListener("keydown", undoFunc, false);
    };
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col flex-1 select-none">
        <EditorToolbar left={toolbar} />
        <div className="flex items-stretch flex-1 select-none">
          {ed.panel.left.show && <EditorPanel />}
          <EditorRender />
          {ed.panel.right.show && (
            <div
              className="transition-all duration-1000 w-[20%] min-w-[304px] flex"
              css={css`
                opacity: ${ed.panel.right.placement === "float" &&
                ed.panel.right.peek
                  ? 0.1
                  : 1};
              `}
            >
              <div className="flex flex-1 bg-white border-l ">
                {ed.active ? (
                  <EditorSubPanel />
                ) : (
                  <div className="flex items-center justify-center flex-1">
                    &mdash; Nothing Selected &mdash;
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};
