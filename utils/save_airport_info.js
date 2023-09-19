import { apiClient } from "lisk-sdk";

(async () => {
  try {
    const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
    const res = await client.invoke("gateway:saveAirportInfo", {
      name: "StaexSuperDuperPort",
      landlordAddress: "2188327861e36935eaf40546ff5a9e2a9799f610",
      address: "6dc84e7edf0369cb4dcb87fb1bdafbc243682d9a", // airport address
      passphrase: "arrest pledge carbon student diet aim tortoise comfort decrease rice they opinion"
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

