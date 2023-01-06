import { page } from "types/content";
import { useLocal } from "web-utils";
import { Editor } from "../../compo/editor/editor";
import { IContent } from "../../compo/editor/panel/item/_type";
import { Loading } from "../../compo/loading";
import { loadSite } from "../../compo/site/loader";
import { SiteEditor } from "../../compo/site/site";
import { Layout, Page, Site } from "../../compo/site/type";

type Content = IContent;

export default page({
  url: "/",
  component: ({}) => {
    const local = useLocal(
      {
        site: null as null | Site,
        current: null as null | Page | Layout,
      },
      async () => {
        local.site = await loadSite("07a93488-d35e-4847-949d-66050d1949e2");
        if (local.site) {
          local.current = local.site.pages[0];
        }
        local.render();
      }
    );

    if (!local.site || (local.site && !local.site.id) || !local.current) {
      return <Loading />;
    }

    return (
      <SiteEditor site={local.site} current={local.current}>
        {({ toolbar }) => {
          if (!local.current) return <></>;
          return (
            <Editor
              toolbar={toolbar}
              content={local.current.parseTree()}
              updateContent={(content) => {
                console.log(content);
                local.current?.updateTree(content);
                local.render();
              }}
            />
          );
        }}
      </SiteEditor>
    );
  },
});
