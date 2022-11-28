import { g } from "../../global";

export const serverCleanUp = async () => {
  const pending: Promise<any>[] = [];
  if (g.svc) {
    for (const [name, v] of Object.entries(g.svc)) {
      const build = g.node.build[name];
      if (build) {
        if (build.stop) {
          build.stop();
        }

        build.rebuild.dispose();
      }
      for (const [pid, svc] of Object.entries(v)) {
        pending.push(
          new Promise((resolve) => {
            svc.pendingExit = { resolve, from: "Clean Up" };
            if (svc.ws) {
              svc.ws.send(
                JSON.stringify({
                  type: "event",
                  event: "kill",
                }),
              );
            }
          }),
        );
        delete v[pid];
      }
    }
  }
  await Promise.all(pending);
};
