import { prisma } from "gen/prisma";
import type * as _api from "gen/api";

type TApi = typeof _api["srv"];
type TApiKey = keyof TApi;
type TApiFn<K extends TApiKey> = TApi[K]["api"];
type TApiParams<K extends TApiKey> = Parameters<TApiFn<K>>;
type Cons<H, T extends readonly any[]> = ((h: H, ...t: T) => void) extends (
  ...r: infer R
) => void
  ? R
  : never;

declare global {
  const apiHeaders: any;
  const api: {
    [K in TApiKey]: TApiFn<K>;
  };
  const db: typeof prisma["db"];
}