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
    storage.put("landlord_address", "09ebe5da4acff5ccc5587aeea766da4679e0f9b7");
    storage.put(
      "passphrase",
      "frozen doctor win exact pottery wife height essay shift hospital castle arena",
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

