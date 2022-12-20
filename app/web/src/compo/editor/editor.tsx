import { EditorPanel } from "./panel/panel";
import { EditorRender } from "./render/render";
export const Editor = () => () => {
  return (
    <div>
      <EditorPanel />
      <EditorRender />
    </div>
  );
};
