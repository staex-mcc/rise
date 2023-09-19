import { apiClient } from "lisk-sdk";

(async () => {
  try {
    const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
    const res = await client.invoke("gateway:saveAirportInfo", {
      name: "StaexSuperDuperPort",
      landlordAddress: "b88f716ae5e4f0512627c7839a530e584068f468",
      passphrase: "kit weird thrive man coast bottom sun rug either claw brown solution"
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

