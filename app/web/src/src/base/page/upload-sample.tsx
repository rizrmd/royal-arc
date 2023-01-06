import { page } from "types/content";
import icon from "src/icons.png";
import { useRef } from "react";

export default page({
  url: "/x",
  component: ({}) => {
    const form = useRef<HTMLFormElement>(null);
    return (
      <div>
        Halo
        <form
          action={`${serverurl}/_upload`}
          method="POST"
          ref={form}
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="file"
            onChange={function () {
              form.current?.submit();
            }}
          />
        </form>
        <img src={icon} />
      </div>
    );
  },
});
