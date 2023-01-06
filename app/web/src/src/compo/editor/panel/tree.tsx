import produce from "immer";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { useUndoRedo } from "../../../lib/undo-redo";
import { AddBtn } from "./add-btn";
import { IContent } from "./item/_type";
import { EditorTreeItem } from "./tree-item";

export const EditorTree: FC = () => {
  const s = useUndoRedo<IContent>("editor");
  const ed = useGlobal(EditorGlobal);

  return (
    <div className="flex flex-col items-stretch flex-1">
      <div className="relative flex flex-col items-stretch flex-1 overflow-y-auto">
        <div className="absolute inset-0 flex flex-col items-stretch">
          {(s.current.childs || []).map((e: any, idx: number) => {
            return (
              <EditorTreeItem
                key={idx}
                root={s.current}
                parent={s.current as any}
                content={e}
                active={ed.active}
                hover={ed.hover}
                hovering={(item) => {
                  ed.hover = item;
                  ed.render();
                }}
                activate={(item: any) => {
                  if (ed.active === item) {
                    ed.active = null;
                  } else {
                    ed.active = item;
                  }

                  ed.render();
                }}
                findByID={(id: string) => {
                  if (id === "root")
                    return {
                      parent: { childs: [s.current] } as any,
                      idx: 0,
                      content: s.current as any,
                    };

                  for (const idx in s.current.childs) {
                    const item = s.current.childs[idx];
                    if (item.id === id) {
                      return {
                        parent: s.current,
                        idx: parseInt(idx),
                        content: item,
                      };
                    }

                    const found = findID(id, item);
                    if (found) {
                      return {
                        ...found,
                        content: found.parent.childs[found.idx],
                      };
                    }
                  }
                }}
                updateByID={(id: string, name, newItem) => {
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
                }}
                update={(name, newItem) => {
                  s.action(
                    name,
                    produce(s.current, (draft) => {
                      draft.childs[idx] = newItem;
                    })
                  );
                }}
                idx={idx}
              />
            );
          })}
        </div>
      </div>
      {/* <AddBtn /> */}
    </div>
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
