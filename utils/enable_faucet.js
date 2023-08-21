import { apiClient } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    await client.invoke("faucet:authorize", { password: "arbuz", enable: true });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

