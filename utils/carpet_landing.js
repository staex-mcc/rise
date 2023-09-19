import { apiClient, cryptography, transactions } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("gateway:landing", {
      droneAddress: "0c3d0179630063790fee09fbc444d0d756727bf4",
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
