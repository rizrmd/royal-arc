import { waitUntil } from "service";

export const inspectSchema = async (
  table: string,
  gdb: object,
  prisma: string,
) => {
  if (!gdb[prisma]) {
    console.log("Waiting db to connect...");
    await waitUntil(() => gdb[prisma]);
  }

  const pk: string[] = [];
  const fields: typeof sampleField[] = [];
  for (let i of gdb[prisma]._baseDmmf.datamodel.models) {
    if (i.name === table) {
      for (let f of i.fields) {
        if (f && f.isId) {
          pk.push(f.name);
        }
        fields.push(f);
      }
    }
  }
  return { pk, fields };
};

const sampleField = {
  name: "id",
  kind: "scalar",
  isList: false,
  isRequired: true,
  isUnique: false,
  isId: true,
  isReadOnly: false,
  hasDefaultValue: true,
  type: "String",
  default: { name: "dbgenerated", args: ["gen_random_uuid()"] },
  isGenerated: false,
  isUpdatedAt: false,
};
