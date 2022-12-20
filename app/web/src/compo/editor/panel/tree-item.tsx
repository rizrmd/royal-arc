import { useLocal } from "web-utils";
import { EditorSubPanel } from "./sub-panel";

export const EditorTreeItem = () => {
  const local = useLocal({ subpanel: null });
  return (
    <div>
      <Item />
      {local.subpanel && <EditorSubPanel />}
    </div>
  );
};

const Item = () => {
  return <div></div>;
};
