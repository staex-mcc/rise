import { apiClient, passphrase, cryptography } from "lisk-sdk";

(async () => {
  const genPassphrase = passphrase.Mnemonic.generateMnemonic();
  const res = cryptography.getAddressAndPublicKeyFromPassphrase(genPassphrase);
  const binaryAddress = cryptography.bufferToHex(res.address);
  console.log(`BinaryAddress: ${binaryAddress}\nPassphrase: ${genPassphrase}`);
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    await client.invoke("faucet:authorize", { password: "arbuz", enable: true });
    await client.invoke("faucet:fundTokens", { address: binaryAddress, token: "lsk" });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
