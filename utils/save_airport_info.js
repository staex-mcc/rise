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
    storage.put("landlord_address", "734452d4c913da5881214bfb5956be0ba043daf7");
    storage.put(
      "passphrase",
      "engine have nurse hat stomach keen brown rifle wolf venture neglect range",
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

