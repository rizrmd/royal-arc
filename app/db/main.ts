import { createDB } from "service";

export const main = createDB({
  name: "db",
  url: "postgresql://postgres:goperasidatabase123@db.goperasi.id:5432/lmtd?schema=public&pool_timeout=0",
});
    