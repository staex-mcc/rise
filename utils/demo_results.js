import { apiClient, codec, db, transactionSchema, cryptography } from "lisk-sdk";

(async () => {
  try {
    const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
    const res = await client.invoke("gateway:transactions", {});
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
