import { apiClient } from "lisk-sdk";

(async () => {
  try {
    const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
    const res = await client.invoke("gateway:saveAirportInfo", {
      name: "StaexSuperDuperPort",
      landlordAddress: "269a47776fcede8277e3c394f40c76dd8b8e8f81",
      address: "56571c31b453604237e387d69d024601fa2efc3b", // airport address
      passphrase: "cabin better coral define scene stove buzz sound dumb school figure thing"
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

