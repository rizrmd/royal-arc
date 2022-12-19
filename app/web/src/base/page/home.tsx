import { Button } from "@fluentui/react-components";
import { page } from "types/content";
import { useLocal } from "web-utils";

export default page({
  url: "/",
  component: ({}) => {
    const local = useLocal({}, async () => {
      await db.user.create({ data: { password: "123", username: "123" } });
      console.log(await db.user.findFirst());
    });

    return (
      <div css={css`padding:100px;`}>
        <Button appearance="primary">Get started</Button>
      </div>
    );
  },
});
