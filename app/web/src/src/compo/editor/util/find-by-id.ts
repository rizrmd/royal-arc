import { IContent } from "../panel/item/_type";

type ContentFound = {
  content: IContent;
  parent?: { content: IContent; idx: number };
  update?: (c: IContent) => void;
};

type ContentParent = { content: IContent; idx: number };

export const findByID = (
  id: string,
  content: IContent,
  parent?: ContentParent
): ContentFound | null => {
  if (content.id === id) {
    return {
      content,
      parent: parent,
      update: parent
        ? (c) => {
            parent.content.childs[parent.idx] = c;
          }
        : undefined,
    };
  }

  for (const idx in content.childs) {
    const c = content.childs[idx];
    const found = findByID(id, c, { content, idx: parseInt(idx) });
    if (found) {
      return found;
    }
  }

  return null;
};
