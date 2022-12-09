import fetch from "node-fetch";
import { decompress, decompressSync, Unzip, unzipSync } from "fflate";

const unzipper = new Unzip();

export const baseUpgrade = async () => {
  console.log(`Downloading royal-arc upgrade...`);
  const res = await fetch(
    `https://github.com/rizrmd/royal-arc/archive/refs/heads/main.zip`,
  );

  const filebuf = await (await res.blob()).arrayBuffer();
  const fileuint8 = new Uint8Array(filebuf);
  const decompressed = unzipSync(fileuint8, {
    filter(file) {
      console.log(file);
      return true;
    },
  });
};
