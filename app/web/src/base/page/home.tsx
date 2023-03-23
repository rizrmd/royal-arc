import { Button } from "@fluentui/react-components";
import { page } from "web-init";

export default page({
  url: "/",
  component: ({}) => {
    return (
      <>
        Hello mantap <Button>Haloha</Button>
      </>
    );
  },
});
