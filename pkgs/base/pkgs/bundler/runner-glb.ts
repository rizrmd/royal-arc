import { IPty } from "utility/spawn";

export const runnerGlb = globalThis as unknown as {
  runs: Record<string, IPty>;
};

if (!runnerGlb.runs) runnerGlb.runs = {};
