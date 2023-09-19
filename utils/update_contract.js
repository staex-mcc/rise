import { apiClient, transactions } from "lisk-sdk";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const tx = await client.transaction.create(
      {
        moduleID: 12700,
        assetID: 872,
        fee: BigInt(transactions.convertLSKToBeddows("0.01")),
        asset: {
          amount: 40,
        }
      },
      "actress risk elbow oak dirt element decline explain boost dice chicken waste",
    );
    await client.transaction.send(tx);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

