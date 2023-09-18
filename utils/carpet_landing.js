import { apiClient, cryptography, transactions } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("gateway:landing", {
      droneAddress: "9c70c7cfc66729674dcf4eb164465679609b1de2",
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
