import { Button } from "@fluentui/react-components";
import {
  ImageAdd24Regular,
  SlideAdd24Regular,
  TabAdd24Regular,
  TextAddT24Regular,
} from "@fluentui/react-icons";
import cuid from "cuid";
import produce from "immer";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { useUndoRedo } from "../../../lib/undo-redo";
import { IContent } from "./item/_type";
import { findByID } from "../util/find-by-id";

const g = window as unknown as {
  newCounter: { section: number; item: number; text: number; img: number };
};

if (!g.newCounter) g.newCounter = { section: 1, item: 1, text: 1, img: 1 };

export const AddBtn = () => {
  const s = useUndoRedo<IContent>("editor");
  const ed = useGlobal(EditorGlobal);
  const activate = (id: string) => {
    const newcontent = findByID(id, s.current)?.content;
    if (newcontent) {
      ed.active = newcontent;
      ed.render();
    }
  };
  return (
    <div className="flex flex-col items-stretch p-1 border-t">
      {!ed.active && (
        <Button
          icon={<SlideAdd24Regular />}
          onClick={() => {
            const newid = cuid();
            s.action(
              "Add Section",
              produce(s.current, (draft) => {
                g.newCounter.section += 1;
                draft.childs.push({
                  id: cuid(),
                  name: `Section #${g.newCounter.section}`,
                  depth: 0,
                  type: "section",
                  childs: [
                    {
                      id: newid,
                      name: `Item #1`,
                      depth: 1,
                      type: "item",
                      childs: [],
                      responsive: {
                        mobile: true,
                        desktop: true,
                      },
                    },
                  ],
                  responsive: {
                    mobile: true,
                    desktop: true,
                  },
                });
              })
            );
            activate(newid);
          }}
        >
          Section
        </Button>
      )}
      {ed.active && ed.active.type === "section" && (
        <Button
          icon={<TabAdd24Regular />}
          onClick={() => {
            const newid = cuid();
            s.action(
              "Add Item",
              produce(s.current, (draft) => {
                g.newCounter.item += 1;

                if (ed.active) {
                  const active = findByID(ed.active.id, draft);

                  if (active) {
                    active.content.childs.push({
                      id: newid,
                      name: `Item #${g.newCounter.item}`,
                      depth: 1,
                      type: "item",
                      childs: [],
                      responsive: {
                        mobile: true,
                        desktop: true,
                      },
                    });
                  }
                }
              })
            );

            activate(newid);
          }}
        >
          Item
        </Button>
      )}

      {ed.active && ed.active.type === "item" && (
        <div
          className="flex space-x-2 "
          css={css`
            > button {
              flex: 1;
            }
          `}
        >
          <Button
            icon={<TextAddT24Regular />}
            onClick={() => {
              const newid = cuid();

              s.action(
                "Add Text",
                produce(s.current, (draft) => {
                  g.newCounter.text += 1;

                  if (ed.active) {
                    const active = findByID(ed.active.id, draft);

                    if (active) {
                      active.content.childs.push({
                        id: newid,
                        name: `Text #${g.newCounter.text}`,
                        depth: 2,
                        type: "text",
                        childs: [],
                        responsive: {
                          mobile: true,
                          desktop: true,
                        },
                      });
                    }
                  }
                })
              );

              activate(newid);
            }}
          >
            Text
          </Button>
          <Button
            icon={<ImageAdd24Regular />}
            onClick={() => {
              const newid = cuid();
              s.action(
                "Add Text",
                produce(s.current, (draft) => {
                  g.newCounter.img += 1;

                  if (ed.active) {
                    const active = findByID(ed.active.id, draft);

                    if (active) {
                      active.content.childs.push({
                        id: newid,
                        name: `Img #${g.newCounter.img}`,
                        depth: 2,
                        type: "img",
                        childs: [],
                        responsive: {
                          mobile: true,
                          desktop: true,
                        },
                      });
                    }
                  }
                })
              );

              activate(newid);
            }}
          >
            Image
          </Button>
        </div>
      )}
      {ed.active && (ed.active.type === "text" || ed.active.type === "img") && (
        <div
          className="flex space-x-2 "
          css={css`
            > button {
              flex: 1;
            }
          `}
        >
          <Button
            icon={<TextAddT24Regular />}
            onClick={() => {
              const newid = cuid();

              s.action(
                "Add Text",
                produce(s.current, (draft) => {
                  g.newCounter.text += 1;

                  if (ed.active) {
                    const active = findByID(ed.active.id, draft);

                    if (active && active.parent) {
                      active.parent.content.childs.push({
                        id: newid,
                        name: `Text #${g.newCounter.text}`,
                        depth: 2,
                        type: "text",
                        childs: [],
                        responsive: {
                          mobile: true,
                          desktop: true,
                        },
                      });

                      const newcontent = findByID(newid, s.current)?.content;
                      if (newcontent) {
                        ed.active = newcontent;
                        ed.render();
                      }
                    }
                  }
                })
              );

              activate(newid);
            }}
          >
            Text
          </Button>
          <Button
            icon={<ImageAdd24Regular />}
            onClick={() => {
              const newid = cuid();
              s.action(
                "Add Text",
                produce(s.current, (draft) => {
                  g.newCounter.img += 1;

                  if (ed.active) {
                    const active = findByID(ed.active.id, draft);

                    if (active && active.parent) {
                      active.parent.content.childs.push({
                        id: newid,
                        name: `Img #${g.newCounter.img}`,
                        depth: 2,
                        type: "img",
                        childs: [],
                        responsive: {
                          mobile: true,
                          desktop: true,
                        },
                      });
                    }
                  }
                })
              );
              activate(newid);
            }}
          >
            Image
          </Button>
        </div>
      )}
    </div>
  );
};
