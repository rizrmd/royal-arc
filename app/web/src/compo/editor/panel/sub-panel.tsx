import { EditorLayoutHeight } from "./layout/height";
import { EditorLayoutImage } from "./layout/image";
import { EditorLayoutPadding } from "./layout/padding";
import { EditorLayoutPicker } from "./layout/picker";

export const EditorSubPanel = () => {
  return (
    <div>
      <EditorLayoutPicker />
      <EditorLayoutHeight />
      <EditorLayoutPadding />
      <EditorLayoutImage />
    </div>
  );
};
