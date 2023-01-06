import { Tooltip } from "@fluentui/react-components";
import {
  BookOpen16Regular,
  Image16Regular,
  RectangleLandscape16Regular,
  Text16Regular,
} from "@fluentui/react-icons";
import cuid from "cuid";
import produce from "immer";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { useUndoRedo } from "../../../lib/undo-redo";
import { IContent } from "../panel/item/_type";
import { findByID } from "../util/find-by-id";
import { Btn, BtnBox } from "./btn-box";

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
    <BtnBox label="ADD">
      <Tooltip content="Add Text" relationship="label" showDelay={1000}>
        <div>
          <Btn
            disabled={!ed.active || ["section"].includes(ed.active.type)}
            onClick={() => {
              const newid = cuid();

              if (ed.active && ed.active.type !== "section") {
                s.action(
                  "Add Text",
                  produce(s.current, (draft) => {
                    g.newCounter.text += 1;

                    if (ed.active) {
                      const active = findByID(ed.active.id, draft);

                      if (active) {
                        let depth = 2;
                        let current = active.content;

                        if (
                          ["text", "img"].includes(ed.active.type) &&
                          active.parent
                        ) {
                          current = active.parent.content;
                          depth = current.depth + 1;
                        } else if (["item"].includes(ed.active.type)) {
                          current = active.content;
                          depth = current.depth + 1;
                        }

                        current.childs.push({
                          id: newid,
                          name: `Text #${g.newCounter.text}`,
                          depth: depth,
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
              }
            }}
          >
            <Text16Regular />
          </Btn>
        </div>
      </Tooltip>

      <Tooltip content="Add Img" relationship="label" showDelay={1000}>
        <div>
          <Btn
            disabled={!ed.active || ["section"].includes(ed.active.type)}
            onClick={() => {
              const newid = cuid();

              if (ed.active && ed.active.type !== "section") {
                s.action(
                  "Add Img",
                  produce(s.current, (draft) => {
                    g.newCounter.img += 1;

                    if (ed.active) {
                      const active = findByID(ed.active.id, draft);

                      if (active) {
                        let depth = 2;
                        let current = active.content;

                        if (
                          ["text", "img"].includes(ed.active.type) &&
                          active.parent
                        ) {
                          current = active.parent.content;
                          depth = current.depth + 1;
                        } else if (["item"].includes(ed.active.type)) {
                          current = active.content;
                          depth = current.depth + 1;
                        }

                        current.childs.push({
                          id: newid,
                          name: `Img #${g.newCounter.img}`,
                          depth: depth,
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
              }
            }}
          >
            <Image16Regular />
          </Btn>
        </div>
      </Tooltip>

      <Tooltip content="Add Item" relationship="label" showDelay={1000}>
        <div>
          <Btn
            disabled={!ed.active}
            onClick={() => {
              const newid = cuid();

              s.action(
                "Add Item",
                produce(s.current, (draft) => {
                  let increment = 1;

                  if (ed.active) {
                    let depth = 1;
                    let active = findByID(ed.active.id, draft);

                    if (active) {
                      let current = active.content;

                      console.log(JSON.parse(JSON.stringify(current)));
                      increment = current.childs.length;

                      if (["item"].includes(ed.active.type)) {
                        console.log(ed.active.type);

                        current = active.content;
                        depth = current.depth + 1;
                      } else if (["text", "img"].includes(ed.active.type)) {
                        if (active.parent) {
                          const item = findByID(
                            active.parent.content.id,
                            draft
                          );
                          if (item?.parent) {
                            current = item.parent.content;
                            depth = current.depth + 1;
                          }
                        }
                      }

                      g.newCounter.item = increment + 1;

                      current.childs.push({
                        id: newid,
                        name: `Item #${g.newCounter.item}`,
                        depth: depth,
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
            <BookOpen16Regular />
          </Btn>
        </div>
      </Tooltip>

      <Tooltip content="Add Section" relationship="label" showDelay={1000}>
        <div>
          <Btn
            onClick={() => {
              const newid = cuid();
              s.action(
                "Add Section",
                produce(s.current, (draft) => {
                  let increment = 1;

                  increment = s.current.childs.length;

                  g.newCounter.section = increment + 1;
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
            <RectangleLandscape16Regular />
          </Btn>
        </div>
      </Tooltip>
    </BtnBox>
  );
};
