import { Metafile } from "esbuild";
import { _names } from "gen";

type ActionResult = unknown;

export type ActionFunc = (
  // @ts-ignore: this should be any to prevent nodejs typeerror
  ...arg: any[]
) => Promise<ActionResult> | ActionResult;

export type ServiceInstance<T> = {
  serviceName: string;
  pid: string;
  stop: () => void;
  actions: T;
};

export type Action = (arg: { pid: string }) => Record<string, ActionFunc>;

export type DeclareServiceArg<P extends Record<string, any>> = {
  name: _names;
  hook: {
    onStart: (arg: {
      pid: string;
      argv: string[];
      params: P;
      restarted: boolean;
      starter: _names | "root";
      metafile?: Metafile;
    }) => Promise<void> | void;
    onStop: (pid: string) => Promise<void> | void;
  };
  action: Action;
};

export type ServiceInternal = {
  serviceName: _names;
  pid: string;
  runtime: "deno" | "node" | "bun";
};

export type ApiMetaParams = Record<
  string,
  { api: string[]; url: string[]; service: string[] }
>;

export type DBArg = { table: string; action: string; params: any[] };
