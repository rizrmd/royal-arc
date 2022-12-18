import { generateKeyPairSync } from "crypto";
import { join } from "path";
import { readAsync, writeAsync } from "service";
import { DeployKey } from "../../../config";

export const getDeployKey = async () => {
  const deployKeyPath = join(process.cwd(), "..", "..", "config.ts");
  if ((DeployKey as any) === "") {
    const { privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: new Date().getTime().toString(),
      },
    });
    let confSrc = await readAsync(deployKeyPath);
    const privSplit = privateKey.split("\n");
    confSrc = confSrc.replace(
      "export const DeployKey = \`\`",
      "export const DeployKey = `\\\n" +
      privSplit.slice(1, privSplit.length - 2).join("\n") + "`",
    );

    await writeAsync(deployKeyPath, confSrc);
    return privateKey;
  }
  return DeployKey;
};
