import { createServer } from "net";

export function getPort(port = 12000, maxPort = 20000) {
  if (maxPort < port) {
    return Promise.reject(
      (() => {
        const e = new Error("EPORTSPEC");
        (e as any).code = e.message;
        return e;
      })()
    );
  }
  const server = createServer();
  return new Promise<number>((resolve, reject) =>
    server
      .on("error", (error) => {
        if ((error as any).code !== "EADDRINUSE" || port + 1 > maxPort) {
          reject(error);
        } else {
          port += 1;
          server.listen(port);
        }
      })
      .once("listening", () => server.close(() => resolve(port)))
      .listen(port)
  );
}
