import { apiClient, cryptography, transactions } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("gateway:landing", {
      droneAddress: "028c90f5b210ac66a74e68ea32dceef0aac05ad2",
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
