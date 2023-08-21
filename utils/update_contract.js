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
          amount: 30,
        }
      },
      "fetch turkey nuclear mother half beef floor small flush dry volcano motion",
    );
    await client.transaction.send(tx);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

