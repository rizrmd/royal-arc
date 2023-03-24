/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀
*/

import { initialize, service } from "service";

initialize(async () => {
  await service.coba._process.start();
  console.log(await service.coba.mantap());
  // await root.service.start({ name: "srv" });
  // await root.service.start({ name: "db" });
  // await root.service.start({ name: "web" });
});
