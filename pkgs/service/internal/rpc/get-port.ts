export const getPort = () => {
  let port = getRandomInt(10000, 22000);
  while (true) {
    try {
      const res = Bun.serve({
        port: port,
        hostname: "127.0.0.1",
        fetch() {
          return new Response("ok");
        },
      });
      res.stop();
      break;
    } catch (_) {
      port = getRandomInt(10000, 22000);
    }
  }
  return port;
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
