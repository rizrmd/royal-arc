import { useLocal } from "web-utils";
import { EditorTreeItem } from "./tree-item";

export const EditorTree = () => {
  const local = useLocal({
    items: [],
  });
  return (
    <div>
      {local.items.map((e, idx) => {
        return <EditorTreeItem key={idx} />;
      })}
    </div>
  );
};
