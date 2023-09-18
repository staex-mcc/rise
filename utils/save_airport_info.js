import { apiClient, db } from "lisk-sdk";

(async () => {
  try {
    const storage = new db.KVStore("airport.db");

    let keys = ["name", "landlord_address", "passphrase"];
    for (let key of keys) {
      if (await storage.exists(key)) {
        console.info(`${key} is already exists`);
        process.exit(0);
      }
    }
    
    storage.put("name", "StaexSuperDuperPort");
    storage.put("landlord_address", "77bd186762861ec26b908e303f4cd3e0c3c79cb1");
    storage.put(
      "passphrase",
      "south pilot domain rack gap magnet dismiss bomb spike enough monitor negative",
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

