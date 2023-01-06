import { layout } from "dbgen";
import produce from "immer";
import { IContent } from "../editor/panel/item/_type";
import { Layout, Site } from "./type";

export const createlayout = async (
  site: Site,
  layout: WithOptional<
    Parameters<typeof db.layout.create>[0]["data"],
    "content_tree"
  >
) => {
  const raw = await db.layout.create({
    data: {
      ...(layout as any),
      content_tree: layout.content_tree ? layout.content_tree : blank,
      site: {
        connect: { id: site.id },
      },
    },
  });

  if (layout) {
    site.layouts.push(decorateLayout(raw));
  }
};

const blank = { id: "root", childs: [] };
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const decorateLayout = (layout: layout) => {
  const item = layout as unknown as Layout;

  item.loaded = false;
  item.parseTree = () => {
    return produce(item.content_tree, () => {}) as IContent;
  };
  item.updateTree = (tree) => {};
  return item;
};
