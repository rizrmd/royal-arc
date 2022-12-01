import { page } from "types/content";
import { useLocal } from "web-utils";

export default page({
  url: "/x",
  component: ({}) => {
    return <div>Halo</div>;
  },
});
  