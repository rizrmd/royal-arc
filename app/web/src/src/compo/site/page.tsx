import { page } from "dbgen";
import produce from "immer";
import { IContent } from "../editor/panel/item/_type";
import { createlayout } from "./layout";
import { Page, Site } from "./type";

export const createPage = async (
  site: Site,
  page: WithOptional<
    Parameters<typeof db.page.create>[0]["data"],
    "content_tree"
  >
) => {
  if (site.layouts.length === 0) {
    await createlayout(site, {
      name: "default",
    });
  }

  const layout =
    site.layouts.filter((e) => e.name === "default")[0] || site.layouts[0];

  const raw = await db.page.create({
    data: {
      ...(page as any),
      content_tree: page.content_tree ? page.content_tree : blank,
      layout: {
        connect: { id: layout.id },
      },
      site: {
        connect: { id: site.id },
      },
    },
  });

  if (page) {
    site.pages.push(decoratePage(raw));
  }
};

const blank = { id: "root", childs: [] };
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const decoratePage = (page: page) => {
  const item = page as unknown as Page;

  item.loaded = false;
  item.parseTree = () => {
    return produce(item.content_tree, () => {}) as IContent;
  };
  item.updateTree = (tree) => {};
  return item;
};
