import { apiClient, cryptography, transactions } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("gateway:landing", {
      droneAddress: "15485123174c0f29a30272f9d1d0c3955743d1a7",
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
