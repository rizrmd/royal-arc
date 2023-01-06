import {
  Code16Regular,
  TextBold16Regular,
  TextBulletListLtr16Regular,
  TextItalic16Regular,
  TextNumberListLtr16Regular,
  TextStrikethrough16Regular,
  TextSubscript16Regular,
  TextSuperscript16Regular,
} from "@fluentui/react-icons";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $setSelection,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  ParagraphNode,
  RangeSelection,
} from "lexical";
import { FC, ReactElement, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../../base/global/editor";
import { FieldColorPicker } from "../../panel/field/common/field-color-picker";
import { FieldPickColor } from "../../panel/field/common/field-pick-color";
import { getSelectedNode } from "./utils/getSelectedNode";

const state = {
  sel: "",
  selr: null as RangeSelection | null,
  bold: false,
  italic: false,
  strikethrough: false,
  subscript: false,
  superscript: false,
  code: false,
  olist: false,
  ulist: false,
  frame: null as null | HTMLIFrameElement,
  textColor: false,
};

const TextEditToolbar: FC<{
  frame: HTMLIFrameElement;
}> = ({ frame }) => {
  const ed = useGlobal(EditorGlobal);
  const [editor] = useLexicalComposerContext();
  const local = useLocal(state);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      local.sel = selection.getTextContent();
      local.selr = selection.clone();

      local.bold = selection ? selection.hasFormat("bold") : false;
      local.italic = selection ? selection.hasFormat("italic") : false;
      local.strikethrough = selection
        ? selection.hasFormat("strikethrough")
        : false;
      local.subscript = selection ? selection.hasFormat("subscript") : false;
      local.superscript = selection
        ? selection.hasFormat("superscript")
        : false;

      local.ulist = false;
      local.olist = false;
      if (parent?.getType() === "listitem") {
        const p = parent.getParent();
        if (p) {
          if (p.__tag === "ul") {
            local.ulist = true;
          } else {
            local.olist = true;
          }
        }
      }

      local.textColor = selection ? selection.hasFormat("underline") : false;

      local.render();
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => {
      document.removeEventListener("selectionchange", updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      })
    );
  }, [editor, updatePopup]);

  const prop = { local, editor };

  return (
    <div className="flex items-stretch flex-1 text-sm select-none">
      <Btn icon={<TextBold16Regular />} prop={prop} name="bold" />
      <Btn icon={<TextItalic16Regular />} prop={prop} name="italic" />
      <Btn
        icon={<TextStrikethrough16Regular />}
        prop={prop}
        name="strikethrough"
      />
      <Btn icon={<TextSubscript16Regular />} prop={prop} name="subscript" />
      <Btn icon={<TextSuperscript16Regular />} prop={prop} name="superscript" />
      <Btn icon={<Code16Regular />} prop={prop} name="code" />
      <Btn
        icon={<TextBulletListLtr16Regular />}
        prop={prop}
        name="ulist"
        update={() => {
          if (!local.ulist) {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          }
        }}
      />
      <Btn
        icon={<TextNumberListLtr16Regular />}
        prop={prop}
        name="olist"
        update={() => {
          if (!local.olist) {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          }
        }}
      />
      <Btn last icon={<></>} prop={prop} name="textColor" />
    </div>
  );
};

const Btn: FC<{
  icon: ReactElement;
  name: string;
  prop: {
    local: typeof state & { render: () => void };
    editor: LexicalEditor;
  };
  update?: () => void;
  last?: boolean;
}> = ({ icon, name, update, prop, last }) => {
  const { local, editor } = prop;
  const l = local as any;
  const disabled = !local.sel && !l[name];
  const meta = useLocal({
    textColor: "",
  });
  return (
    <div
      className={`flex flex-col items-stretch cursor-pointer  ${
        l[name] ? "bg-blue-100" : "hover:bg-blue-50"
      } ${last ? "" : "border-r"}`}
    >
      <div
        className={`flex-1 flex items-center w-[30px] justify-center `}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!name.toLowerCase().includes("color")) {
            let validsel = true;
            if (l[name]) {
              if (!["ulist", "olist"].includes(name)) {
                editor.update(() => {
                  local.selr = $getSelection()?.clone() as RangeSelection;
                });
              }
              if (local.selr) {
                if (local.selr.anchor.offset === local.selr.focus.offset) {
                  validsel = false;
                }
              }
            }

            if (validsel) {
              setTimeout(() => {
                if (update) {
                  update();
                } else {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, name as any);
                }
                local.frame?.focus();
                setTimeout(() => {
                  if (local.selr) {
                    try {
                      editor.focus();
                      editor.update(() => {
                        try {
                          $setSelection(local.selr);
                        } catch (e) {}
                      });
                    } catch (e) {}
                  }
                });
              });
            }
          }
        }}
      >
        {!name.toLowerCase().includes("color") ? (
          <div className={`${disabled ? "" : ""}`}>{icon}</div>
        ) : (
          <FieldColorPicker
            value={meta.textColor}
            update={(val) => {
              meta.textColor = val;
              meta.render();
            }}
          >
            <div
              className={`w-4 h-4`}
              style={{
                background: meta.textColor
                  ? meta.textColor
                  : `center / contain no-repeat url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,
              }}
            ></div>
          </FieldColorPicker>
        )}
      </div>
      <div className={`${l[name] ? "bg-[#019cff]" : ""} h-[2px]`}></div>
    </div>
  );
};

export const TextEditToolbarPlugin = ({
  el,
  frame,
}: {
  frame: HTMLIFrameElement;
  el: HTMLElement;
}) => {
  const wrect = frame.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  const top = wrect.top + rect.top;
  const left = wrect.left + rect.left;

  if (frame.contentWindow) {
    const parent = frame.contentWindow.parent.document.body;

    let injectTo: HTMLElement = parent.querySelector("#text-toolbar") as any;
    if (!injectTo) {
      const newdiv = document.createElement("div");
      newdiv.id = "text-toolbar";
      parent.appendChild(newdiv);
      injectTo = parent.querySelector("#text-toolbar") as any;
    }

    return createPortal(
      <div
        className={`fixed bg-white border shadow-md flex items-stretch text-sm h-[30px] `}
        style={{ left: `${left}px`, top: `${top - 32}px` }}
      >
        <TextEditToolbar frame={frame} />
      </div>,
      injectTo
    );
  }

  return null;
};
