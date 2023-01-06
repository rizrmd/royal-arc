import { page } from "types/content";

const dec = new TextDecoder();
export default page({
  url: "/site/:name/*",
  ssr: true,
  layout: "ssr",
  component: ({}) => {
    return <div>Halo</div>;
  },
});
