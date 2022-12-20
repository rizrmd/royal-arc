import { EditorPanelToolbar } from "./toolbar/toolbar";
import { EditorTree } from "./tree";

export const EditorPanel = () => {
  return (
    <div>
      <EditorPanelToolbar />
      <EditorTree />
    </div>
  );
};
