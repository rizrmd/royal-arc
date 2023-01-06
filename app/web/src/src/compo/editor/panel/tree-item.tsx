import { Button, Tooltip } from "@fluentui/react-components";
import {
  Add16Filled,
  BookOpen16Regular,
  ChevronDown16Filled,
  ChevronRight16Filled,
  Copy20Regular,
  Delete20Regular,
  Desktop16Regular,
  Image16Regular,
  Phone16Regular,
  RectangleLandscape16Regular,
  Rename20Regular,
  SquareDismiss16Regular,
  Text16Regular,
} from "@fluentui/react-icons";
import cuid from "cuid";
import produce from "immer";
import capitalize from "lodash.capitalize";
import { FC, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useLocal } from "web-utils";
import { IContent } from "./item/_type";
import { findByID } from "../util/find-by-id";
import { ResponsiveToggle } from "../util/responsive";
import { walkItem } from "./item/_common";

type ETItemProp = {
  root: IContent;
  content: IContent;
  parent: IContent;
  findByID: (
    id: string
  ) => { parent: IContent; idx: number; content: IContent } | undefined;
  updateByID: (id: string, name: string, newState: IContent) => void;
  update: (name: string, newState: IContent) => void;
  active: any;
  hover: any;
  hovering: (item: any) => void;
  activate: (item: any) => void;
  idx: number;
};

const depthWidth = 20;

export const EditorTreeItem: FC<ETItemProp> = (prop) => {
  const { content, update, updateByID, active, activate, idx, parent } = prop;
  let dropAccept = [""];

  if (content.type === "section") dropAccept = ["section", "item"];
  if (content.type === "item") dropAccept = ["item", "text", "img"];
  if (content.type === "text" || content.type === "img") {
    dropAccept = ["text", "img"];
  }

  const [drop, dropProps] = useDrop<
    any,
    any,
    { addTo: "top" | "below"; hover: boolean }
  >(
    () => ({
      accept: dropAccept,
      collect(monitor) {
        const dragType = monitor.getItemType();

        let addTo = "top" as "top" | "below";
        if (
          content.type === "item" &&
          (dragType === "text" || dragType === "img")
        ) {
          addTo = "below";
        }

        if (content.type === "section" && dragType === "item") {
          addTo = "below";
        }
        return {
          addTo,
          hover: monitor.canDrop() && monitor.isOver({ shallow: true }),
        };
      },
      drop(_drag, monitor) {
        if (monitor.didDrop()) return;
        if (_drag && _drag.content.id) {
          const newRoot = produce(prop.root, (draft) => {
            const drag = findByID(_drag.content.id, draft);
            console.log(drag);
            if (drag && drag.parent) {
              const drop = findByID(content.id, draft);
              if (drop) {
                // cut
                drag.parent.content.childs.splice(drag.parent.idx, 1);

                // paste up
                const from = drag.content.type;
                const to = content.type;
                if (
                  ((from === "text" || from === "img") && to === "item") ||
                  (from === "item" && to === "section")
                ) {
                  if (drop.content) {
                    drop.content.childs.unshift(drag.content);
                    return;
                  }
                }

                // paste next
                if (drop.parent) {
                  drop.parent.content.childs.splice(
                    drop.parent.idx,
                    0,
                    drag.content
                  );
                }
              }
            }
          });
          updateByID("root", `Move ${capitalize(content.type)}`, newRoot);
        }
      },
    }),
    [content, parent]
  );

  const [_, dragProp] = useDrag(
    () => ({
      type: content.type,
      item: {
        content,
        idx,
        parentID: parent.id,
      },
      canDrag() {
        return !local.textFocus;
      },
    }),
    [content, parent]
  );

  const local = useLocal({
    rename: false,
    el: null as any,
    name: content.name,
    subpanel: null,
    expand: true,
    hover: false,
    textFocus: false,
  });
  useEffect(() => {
    local.name = content.name;
    local.render();
  }, [content.name]);

  const rsp = content.responsive;
  return (
    <div className="relative flex flex-col items-stretch" ref={dropProps}>
      <div>
        <div
          css={css`
            margin-left: ${(content.depth + 1) * 20}px;
          `}
          className={`absolute inset-x-0 border-b-4 border-blue-600 pointer-events-none  ${
            drop.hover && drop.addTo === "top" ? "" : "opacity-0"
          }`}
        ></div>
      </div>
      <div className="flex">
        <div
          ref={dragProp}
          onMouseOver={() => {
            prop.hovering(content);
          }}
          onMouseOut={() => {
            prop.hovering(null);
          }}
          className={`flex flex-1 items-center border-b ${
            active?.id === content.id ? "active" : ""
          }
          ${prop.hover && prop.hover.id === content.id ? "hover" : ""}`}
          css={css`
            .btn {
              opacity: 0.1;
            }

            :hover,
            &.hover {
              background: #f7fcff;
              .btn {
                opacity: 1;
              }
            }

            border-left: 3px solid transparent;
            &.active {
              background: #f0faff;
              border-left: 3px solid #3582e6;
            }
          `}
        >
          <div
            css={css`
              padding-left: ${content.depth * depthWidth}px;
            `}
            className="flex items-center flex-1 p-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              activate(content);
            }}
          >
            {!["img", "text"].includes(content.type) ? (
              <div
                className="flex items-center w-[20px]"
                onClick={(e) => {
                  e.stopPropagation();

                  local.expand = !local.expand;
                  local.render();
                }}
              >
                {content.childs && content.childs.length > 0 && (
                  <>
                    {local.expand ? (
                      <ChevronDown16Filled />
                    ) : (
                      <ChevronRight16Filled />
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="w-[10px]"></div>
            )}

            <div className="flex items-center justify-center mr-1">
              {rsp.mobile &&
                rsp.desktop &&
                (
                  {
                    section: <RectangleLandscape16Regular />,
                    item: <BookOpen16Regular />,
                    text: <Text16Regular />,
                    img: <Image16Regular />,
                  } as any
                )[content.type]}
              {!rsp.mobile && rsp.desktop && (
                <Tooltip content={"Desktop Only"} relationship="label">
                  <div>
                    <Desktop16Regular />
                  </div>
                </Tooltip>
              )}
              {rsp.mobile && !rsp.desktop && (
                <Tooltip content={"Mobile Only"} relationship="label">
                  <div>
                    <Phone16Regular />
                  </div>
                </Tooltip>
              )}
              {!rsp.mobile && !rsp.desktop && (
                <Tooltip content={"Hidden"} relationship="label">
                  <div>
                    <SquareDismiss16Regular />
                  </div>
                </Tooltip>
              )}
            </div>

            <input
              ref={(el) => {
                local.el = el;
              }}
              className={`flex-1 px-1 mr-1 bg-transparent ${
                !local.rename
                  ? "cursor-pointer pointer-events-none"
                  : "cursor-text"
              }`}
              css={css`
                width: 30px;
              `}
              disabled={!local.rename}
              type="text"
              value={local.name || ""}
              spellCheck={false}
              onFocus={(e) => {
                local.textFocus = true;
                local.render();
                e.currentTarget.setSelectionRange(
                  0,
                  e.currentTarget.value.length
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }

                if (e.key === "Escape") {
                  local.name = content.name || "";
                  e.currentTarget.blur();
                }
              }}
              onBlur={() => {
                local.textFocus = false;
                if (local.name !== content.name) {
                  local.expand = true;
                  local.render();
                  const newItem = produce(content, (draft) => {
                    draft.name = local.name;
                  });
                  update("Rename " + capitalize(content.type), newItem);
                  activate(newItem);
                }
                local.rename = false;
                local.render();
              }}
              onChange={(e) => {
                local.name = e.currentTarget.value;
                local.render();
              }}
            />
          </div>

          {!local.rename && (
            <Tooltip content="Rename" relationship="label" showDelay={1000}>
              <div
                className="flex items-center justify-center text-xs rounded-md cursor-pointer btn bg-transparent hover:bg-blue-50 min-w-[30px]"
                onClick={() => {
                  local.rename = true;
                  local.render();

                  setTimeout(() => {
                    if (local.el) {
                      local.el.focus();
                    }
                  });
                }}
              >
                <Rename20Regular color="blue" />
              </div>
            </Tooltip>
          )}
          <Tooltip content="Duplicate" relationship="label" showDelay={1000}>
            <div
              className="flex items-center justify-center text-xs rounded-md cursor-pointer btn bg-transparent hover:bg-green-50 min-w-[30px]"
              onClick={() => {
                console.log("content : ", content, prop.idx, parent);

                const newParent = produce(prop.parent, (draft) => {
                  draft.childs.splice(
                    prop.idx,
                    0,
                    walkItem(
                      {
                        ...structuredClone(content),
                        name: `${content.name} [Copy]`,
                      },
                      (item) => {
                        item.id = cuid();
                      }
                    )
                  );
                });
                if (newParent) {
                  console.log("treee : ", newParent);

                  updateByID(parent.id, `Duplicate ${content.type}`, newParent);
                }
              }}
            >
              <Copy20Regular color="green" />
            </div>
          </Tooltip>
          <Tooltip content="Delete" relationship="label" showDelay={1000}>
            <div
              className="flex items-center justify-center text-xs rounded-md cursor-pointer btn bg-transparent hover:bg-red-50 min-w-[30px]"
              onClick={() => {
                const newParent = produce(prop.parent, (draft) => {
                  draft.childs.splice(prop.idx, 1);
                });
                if (newParent) {
                  updateByID(parent.id, `Delete ${content.type}`, newParent);
                }

                if (active && content.id === active.id) {
                  activate(null);
                }
              }}
            >
              <Delete20Regular color="red" />
            </div>
          </Tooltip>
        </div>
        {/* <div className="relative">
          {active === content && (
            <AddChild
              {...prop}
              expand={() => {
                local.expand = true;
              }}
            />
          )}
        </div> */}
      </div>
      {/* <small
        css={css`
          background: #e5e7eb;
          padding-left: ${(content.depth + 1) * 24}px;
        `}
      >
        &raquo; {parent.id}
      </small> */}

      <div>
        <div
          css={css`
            margin-left: ${(content.depth + 1) * 20}px;
          `}
          className={`absolute inset-x-0 border-b-4 border-blue-600 pointer-events-none ${
            drop.hover && drop.addTo === "below" ? "" : "opacity-0"
          }`}
        ></div>
      </div>

      {local.expand &&
        (content.childs || []).map((_, idx) => {
          return (
            <EditorTreeItem
              root={prop.root}
              key={idx}
              findByID={prop.findByID}
              parent={content}
              content={content.childs[idx]}
              active={active}
              activate={(item) => {
                activate(item);
              }}
              hover={prop.hover}
              hovering={prop.hovering}
              updateByID={updateByID}
              update={(name, newItem) => {
                local.expand = true;
                update(
                  name,
                  produce(content, (draft) => {
                    draft.childs[idx] = newItem;
                  })
                );
              }}
              idx={idx}
            />
          );
        })}
    </div>
  );
};

const AddChild: FC<ETItemProp & { expand: () => void }> = (prop) => {
  const container = prop.content;
  const parent = prop.parent;
  const content = container;

  const add = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    prop.expand();

    if (content.type === "section" || content.type === "item") {
      const newContent = produce(container, (draft) => {
        draft.childs.push({
          id: cuid(),
          name: `${capitalize(type)} #${draft.childs.length + 1}`,
          depth: draft.depth + 1,
          type: type as any,
          childs: [],
          responsive: {
            mobile: true,
            desktop: true,
          },
        });
      });
      prop.update(`Add ${capitalize(type)}`, newContent);
      prop.activate(newContent.childs[newContent.childs.length - 1]);
    } else {
      const newContent = produce(parent, (draft) => {
        if (draft) {
          draft.childs.push({
            id: cuid(),
            name: `${capitalize(type)} #${draft.childs.length + 1}`,
            depth: draft.depth + 1,
            type: type as any,
            childs: [],
            responsive: {
              mobile: true,
              desktop: true,
            },
          });
        }
      });
      if (newContent) {
        prop.updateByID(parent.id, `Add ${capitalize(type)}`, newContent);
        prop.activate(newContent.childs[newContent.childs.length - 1]);
      }
    }
  };

  return (
    <div className={`absolute z-50 w-[200px]`} css={css``}>
      <div className="flex justify-between flex-1">
        <div className={`flex space-x-1 flex-1`}>
          {content.type === "section" && (
            <Button
              css={css`
                height: 20px;
                text-transform: capitalize;
              `}
              appearance="primary"
              size="small"
              icon={<Add16Filled />}
              onClick={(e) => {
                add(e, "item");
              }}
            >
              Item
            </Button>
          )}
          {content.type === "item" && (
            <>
              <Button
                css={css`
                  height: 20px;
                  text-transform: capitalize;
                `}
                appearance="primary"
                size="small"
                icon={<Add16Filled />}
                onClick={(e) => {
                  add(e, "text");
                }}
              >
                Text
              </Button>
              <Button
                css={css`
                  height: 20px;
                  text-transform: capitalize;
                `}
                appearance="primary"
                size="small"
                icon={<Add16Filled />}
                onClick={(e) => {
                  add(e, "img");
                }}
              >
                Image
              </Button>
            </>
          )}
          {parent && (content.type === "text" || content.type === "img") && (
            <>
              <Button
                css={css`
                  height: 20px;
                  text-transform: capitalize;
                `}
                appearance="primary"
                size="small"
                icon={<Add16Filled />}
                onClick={(e) => {
                  add(e, "text");
                }}
              >
                Text
              </Button>
              <Button
                css={css`
                  height: 20px;
                  text-transform: capitalize;
                `}
                appearance="primary"
                size="small"
                icon={<Add16Filled />}
                onClick={(e) => {
                  add(e, "img");
                }}
              >
                Image
              </Button>
            </>
          )}
        </div>
        <ResponsiveToggle
          content={content}
          update={prop.update}
          activate={prop.activate}
        />
      </div>
    </div>
  );
};

function arrayMove(arr: any[], old_index: number, new_index: number) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}
