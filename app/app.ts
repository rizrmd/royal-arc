/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀
*/

import { initialize, root } from "service";

initialize(async () => {
  await root.service.start({ name: "mokaju" });
  await root.service.start({ name: "muju" });

  // await root.service.start({ name: "srv" });
  // await root.service.start({ name: "db" });
  // await root.service.start({ name: "web" });
});
