import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../base/global/editor";
import { EditorSubPanel } from "./sub-panel";
import { EditorToolbar } from "../toolbar/toolbar";
import { EditorTree } from "./tree";

export const EditorPanel = () => {
  const ed = useGlobal(EditorGlobal);

  return (
    <div className="flex item-stretch border-r w-[25%] max-w-[300px] min-w-[200px]">
      <div className="flex flex-col flex-1">
        <EditorTree />
      </div>
    </div>
  );
};
