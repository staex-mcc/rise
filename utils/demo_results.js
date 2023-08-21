import { codec, db, transactionSchema } from "lisk-sdk";

// Copied from module asset.
const schema = {
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

const processTx = (name, key, val) => {
  const tx = codec.decode(transactionSchema, val);
  console.log(name, key, tx);
  if (name === "landing") {
    const asset = codec.decode(schema, tx.asset);
    console.log("Landing:", asset)
  }
}

(async () => {
  try {
    const landingStorage = new db.KVStore("landings.db");
    const txStorage = new db.KVStore("transactions.db");

    const landingStream = landingStorage.createReadStream({ keys: true, values: true, limit: 1000 });
    const txStream = txStorage.createReadStream({ keys: true, values: true, limit: 1000 });

    for await (const chunk of landingStream) { processTx("landing", chunk.key, chunk.value) }
    console.log()
    console.log()
    console.log()
    for await (const chunk of txStream) { processTx("transaction", chunk.key, chunk.value) }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
