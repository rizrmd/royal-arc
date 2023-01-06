import {
  BookOpen16Regular,
  Image16Regular,
  RectangleLandscape16Regular,
  Text16Regular,
} from "@fluentui/react-icons";
import produce from "immer";
import capitalize from "lodash.capitalize";
import { FC, useCallback } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { useUndoRedo } from "../../../lib/undo-redo";
import { findByID } from "../util/find-by-id";
import { ResponsiveToggle } from "../util/responsive";
import { IItem, PanelItem } from "./item/item";
import { IImg, PanelImg } from "./item/img";
import { ISection, PanelSection } from "./item/section";
import { IText, PanelText } from "./item/text";
import { IContent } from "./item/_type";

export const EditorSubPanel: FC = () => {
  const s = useUndoRedo<IContent>("editor");
  const ed = useGlobal(EditorGlobal);
  const content = ed.active;
  const setContent = (item: IContent | null) => {
    ed.active = item;
    ed.render();
  };

  const update = useCallback(
    (key: any, value: any) => {
      const content = ed.active;

      if (!content) return;
      const newItem = produce(s.current, (draft) => {
        const found = findByID(content.id, draft);
        if (found && found.update) {
          (found.content as any)[key] = value;
        }
      });
      s.action(`Change ${capitalize(key)}`, newItem);
      const found = findByID(content.id, s.current);
      if (found) {
        setContent(found.content);
      }
    },
    [ed.active]
  );

  if (!content) return null;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center bg-white border-b">
        {/* <div className="border-r">
          <Button
            size="large"
            onClick={() => setContent(null)}
            icon={<Dismiss16Filled />}
            appearance="subtle"
          ></Button>
        </div> */}
        <div className="flex items-center flex-1 ">
          <div className="flex items-center p-1 mr-1 border-r">
            {
              (
                {
                  section: <RectangleLandscape16Regular />,
                  item: <BookOpen16Regular />,
                  text: <Text16Regular />,
                  img: <Image16Regular />,
                } as any
              )[content.type]
            }
          </div>
          <div className="">{content.name}</div>
        </div>
        <div className="mx-2">
          <ResponsiveToggle
            content={content}
            update={(name, item) => {
              const newItem = produce(s.current, (draft) => {
                const found = findByID(item.id, draft);
                if (found && found.update) {
                  found.update(item);
                }
              });

              s.action(name, newItem);
            }}
            activate={(item) => {
              setContent(item);
            }}
          />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto ">
        <div className="absolute inset-0 flex flex-col">
          {
            (
              {
                text: (
                  <PanelText value={content as IText} update={update as any} />
                ),
                img: (
                  <PanelImg value={content as IImg} update={update as any} />
                ),
                section: (
                  <PanelSection
                    value={content as ISection}
                    update={update as any}
                  />
                ),
                item: (
                  <PanelItem value={content as IItem} update={update as any} />
                ),
              } as any
            )[content.type]
          }
        </div>
      </div>
    </div>
  );
};
