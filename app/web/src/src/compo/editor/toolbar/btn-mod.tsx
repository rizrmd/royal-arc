import { Copy16Regular, Delete16Regular } from "@fluentui/react-icons";
import cuid from "cuid";
import produce from "immer";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { useUndoRedo } from "../../../lib/undo-redo";
import { walkItem } from "../panel/item/_common";
import { IContent } from "../panel/item/_type";
import { findByID } from "../util/find-by-id";
import { Btn, BtnBox } from "./btn-box";

export const ModBtn = () => {
  const ed = useGlobal(EditorGlobal);
  const s = useUndoRedo<IContent>("editor");
  const updateByID = (id: string, name: string, newItem: IContent) => {
    s.action(
      name,
      produce(s.current, (draft) => {
        if (newItem.id === "root") {
          for (const [k, v] of Object.entries(newItem)) {
            (draft as any)[k] = v;
          }
        } else {
          for (const idx in draft.childs) {
            const item = draft.childs[idx];
            if (item.id === id) {
              draft.childs[idx] = newItem;
              break;
            }

            const found = findID(id, item);
            if (found) {
              found.parent.childs[found.idx] = newItem;
              break;
            }
          }
        }
      })
    );
  };

  const findID = (
    id: string,
    content: IContent,
    parent?: IContent
  ): { parent: IContent; idx: number } | undefined => {
    for (const idx in content.childs) {
      const item = content.childs[idx];
      if (item.id === id) {
        return {
          parent: content,
          idx: parseInt(idx),
        };
      }

      if (item.childs && item.childs.length > 0) {
        const found = findID(id, item, content);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  return (
    <BtnBox label="EDIT">
      <Btn
        disabled={!ed.active}
        onClick={() => {
          if (ed.active) {
            const newParent = produce(s.current, (draft) => {
              if (ed.active) {
                const found = findByID(ed.active.id, draft);
                if (found && found.parent) {
                  const parent = found.parent;
                  if (parent) {
                    parent.content.childs.splice(parent.idx, 1);
                  }
                }
              }
            });

            if (newParent) {
              s.action(`Delete ${ed.active.type}`, newParent);
              ed.active = null;
              ed.render();
            }
          }
        }}
      >
        <Delete16Regular />
      </Btn>
      <Btn
        disabled={!ed.active}
        onClick={() => {
          if (ed.active) {
            const found = findByID(ed.active.id, s.current);

            if (found && found.parent) {
              let parent = found.parent.content;
              let current = found.content;

              const newParent = produce(parent, (draft) => {
                if (ed.active) {
                  draft.childs.splice(
                    parseInt(parent.id),
                    0,
                    walkItem(
                      {
                        ...structuredClone(current),
                        name: `${current.name} [Copy]`,
                      },
                      (item) => {
                        item.id = cuid();
                      }
                    )
                  );
                }
              });

              if (newParent) {
                updateByID(parent.id, `Duplicate ${current.type}`, newParent);
              }
            }
          }
        }}
      >
        <Copy16Regular />
      </Btn>
    </BtnBox>
  );
};
