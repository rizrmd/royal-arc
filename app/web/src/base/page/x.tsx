import { page } from "types/content";
import icon from "src/icons.png";

export default page({
  url: "/x",
  component: ({}) => {
    return (
      <div>
        Halo

        <img src={icon} />
      </div>
    );
  },
});
