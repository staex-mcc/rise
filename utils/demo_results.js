import { codec, db, transactionSchema, cryptography } from "lisk-sdk";

// Copied from module asset.
const landingAssetSchema = {
  $id: 'airport/landing-asset',
  title: 'LandingAsset transaction asset for airport module',
  type: 'object',
  required: ['drone', 'timestamp'],
  properties: {
    drone: {
      fieldNumber: 1,
      type: 'object',
      required: ['address'],
      properties: {
        address: {
          fieldNumber: 1,
          dataType: 'string',
        },
      },
    },
    timestamp: {
      fieldNumber: 2,
      dataType: 'string',
    },
  },
};

// Copied from https://lisk.com/documentation/lisk-sdk/modules/token-module.html#transferasset (v5.2.2).
const tokenModuleSchema = {
  $id: 'lisk/transfer-asset',
  title: 'Transfer transaction asset',
  type: 'object',
  required: ['amount', 'recipientAddress', 'data'],
  properties: {
    amount: {
      dataType: 'uint64',
      fieldNumber: 1,
    },
    recipientAddress: {
      dataType: 'bytes',
      fieldNumber: 2,
    },
    data: {
      dataType: 'string',
      fieldNumber: 3,
    },
  },
};

const processTx = (name, key, val) => {
  console.log("--- transaction ---\n");
  const tx = codec.decode(transactionSchema, val);
  if (name === "landing") {
    const asset = codec.decode(landingAssetSchema, tx.asset);
    console.log("Landing:", asset);
  } else {
    const asset = codec.decode(tokenModuleSchema, tx.asset);
    console.log("Transfer:", asset);
    const address = cryptography.bufferToHex(asset.recipientAddress);
    console.log("Recipient Address:", address);
  }
  console.log("\n--- transaction ---");
}

(async () => {
  try {
    const landingStorage = new db.KVStore("landings.db");
    const txStorage = new db.KVStore("transactions.db");

    const landingStream = landingStorage.createReadStream({ keys: true, values: true, limit: 1000 });
    const txStream = txStorage.createReadStream({ keys: true, values: true, limit: 1000 });

    for await (const chunk of landingStream) { processTx("landing", chunk.key, chunk.value) }
    for await (const chunk of txStream) { processTx("transaction", chunk.key, chunk.value) }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
