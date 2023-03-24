import { connectRPC, createRPC } from "rpc";
import { RPCAction } from "rpc/src/types";
import { attachSpawnCleanup } from "utility/spawn";
import { rootAction } from "./action";
import { MODE, SERVICE_NAME } from "./types";

export const createService = async <T extends RPCAction>(arg: {
  name: SERVICE_NAME;
  mode: "single" | "multi";
  init: (arg: { mode: MODE }) => Promise<T>;
}): Promise<T> => {
  attachSpawnCleanup(arg.name);
  const root = await connectRPC<typeof rootAction>("root");

  const action =
    (await arg.init({
      mode: "dev",
    })) || ({} as T);

  const definition = genDefinition(action);
  await createRPC(`${arg.name}.${arg.name}`, action);
  await root.identify({ name: arg.name, pid: arg.name, definition });

  try {
    if (process.send)
      process.send(`::RUNNING|${arg.name}::`, undefined, undefined, (e) => {});
  } catch (e) {}

  return action;
};

const genDefinition = (input: any) => {
  const result = {} as Record<string, "object" | "function" | "proxy">;

  const scan = (input: any, parent: string[]) => {
    if (typeof input === "object") {
      for (const [k, v] of Object.entries(input)) {
        if (typeof v === "function") {
          result[[...parent, k].join(".")] = "function";
        } else if (typeof v === "object") {
          if ((v as any).prototype && v instanceof Proxy) {
            result[[...parent, k].join(".")] = "proxy";
          } else {
            result[[...parent, k].join(".")] = "object";
            scan(v, [...parent, k]);
          }
        }
      }
    }
  };
  scan(input, []);

  return result;
};
