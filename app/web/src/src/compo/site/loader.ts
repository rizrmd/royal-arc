import { layout, page, site } from "dbgen";
import { decorateLayout } from "./layout";
import { createPage, decoratePage } from "./page";
import { Site } from "./type";

export const loadSite: (site_id: string) => Promise<Site | null> = async (
  sid
) => {
  try {
    let site = JSON.parse(
      localStorage.getItem(`site-${sid}`) || "null"
    ) as unknown as (site & { page: page[]; layout: layout[] }) | null;

    if (!site) {
      site = await db.site.findFirst({
        where: {
          id: sid,
        },
        include: {
          page: true,
          layout: true,
        },
      });
      if (site) {
        localStorage.setItem(`site-${sid}`, JSON.stringify(site));
      }
    }

    if (site) {
      const s = {} as unknown as Site;
      for (const [k, v] of Object.entries(site)) {
        if (["layout", "page"].includes(k)) continue;
        (s as any)[k] = v;
      }

      if (site.page.length === 0) {
        await createPage(s, {
          name: "Home",
          url: "/",
        });
      }

      s.layouts = [];
      s.pages = [];
      for (const item of site.layout) {
        s.layouts.push(decorateLayout(item));
      }

      for (const item of site.page) {
        s.pages.push(decoratePage(item));
      }
      return s;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};
