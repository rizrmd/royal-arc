import { $generateHtmlFromNodes } from "@lexical/html";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalEditor } from "lexical";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import theme from "./text-edit/EditorTheme";
import { TextEditToolbarPlugin } from "./text-edit/text-edit-toolbar";
import { validateUrl } from "./text-edit/utils/url";
import { ListItemNode, ListNode } from "@lexical/list";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  throw error
}

export const TextEdit: FC<{
  id: string;
  text: string;
  update: (text: string, html: string) => void;
}> = ({ id, text, update }) => {
  const ed = useGlobal(EditorGlobal);
  const local = useLocal({
    editor: null as null | LexicalEditor,
    removeListener: null as any,
    el: null as null | HTMLElement,
  });

  useEffect(() => {
    if (local.editor && text && !ed.lexical.focus) {
      try {
        const state = local.editor.parseEditorState(text);
        local.editor.setEditorState(state);
      } catch (e) {}
    }
    return () => {
      if (local.removeListener) {
        local.removeListener();
      }
    };
  }, [text, local.editor]);

  return (
    <LexicalComposer
      initialConfig={{
        namespace: id,
        onError,
        theme,
        nodes: [AutoLinkNode, LinkNode, ListNode, ListItemNode],
        editorState: (editor) => {
          local.editor = editor;
          const listeners = [
            editor.registerRootListener((rootElement, prevRootElement) => {
              if (rootElement) {
                rootElement.addEventListener("focus", () => {
                  ed.lexical.focus = rootElement;
                  ed.render();
                });
              }
            }),
            editor.registerRootListener((rootElement, prevRootElement) => {
              if (rootElement) {
                rootElement.addEventListener("blur", () => {
                  ed.lexical.focus = false;
                  ed.render();
                });
              }
            }),
          ];

          local.removeListener = () => {
            for (const removeListener of listeners) {
              removeListener();
            }
          };
        },
      }}
    >
      <div
        ref={(el) => {
          if (!local.el) {
            local.el = el;
            local.render();
          }
        }}
        className="relative flex items-stretch self-stretch flex-1 txt-box"
      >
        <RichTextPlugin
          contentEditable={
            <>
              <ContentEditable spellCheck={false} className="txt" />
            </>
          }
          placeholder={
            <div
              className="inset-0 editor-placeholder cursor-text txt-box"
              onClick={async () => {
                const rootel = local.editor?._rootElement;
                if (rootel) {
                  rootel.focus();
                }
              }}
            >
              <div>Enter Text...</div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <LinkPlugin validateUrl={validateUrl} />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              update(
                JSON.stringify(editorState.toJSON()),
                $generateHtmlFromNodes(editor)
              );
            });
          }}
        />
        {local.el && id === ed.active?.id && ed.frm && (
          <>
            <TextEditToolbarPlugin frame={ed.frm} el={local.el} />
          </>
        )}
      </div>
    </LexicalComposer>
  );
};
