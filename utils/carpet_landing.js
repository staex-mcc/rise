import { apiClient, cryptography, transactions } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("gateway:landing", {
      landingId: "asd_dsa",
      droneAddress: "8d1d4b50fe15d30039f271208c9109511e3e7479",
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
