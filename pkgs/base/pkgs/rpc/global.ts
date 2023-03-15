
import { WebSocket } from "uWebSockets.js";
import { Client } from "./types";

export const g = globalThis as unknown as {
  rpcConns: {
    ws: Record<string, Set<WebSocket<{ embed: Client }>>>;
  };
};
