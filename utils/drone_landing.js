import { apiClient, cryptography, transactions } from "lisk-sdk";

// It should be embedded to Drone microchip.
const dronePassphrase = "road razor else aspect jealous enable burden tray merit comfort high security";
const airportAddress = "1968e3a765b6a1c141753d67a9b5a1d9c8f7ff33";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("app:getAccount", { address: airportAddress });
    const accObject = client.account.decode(res);
    const accJSON = client.account.toJSON(accObject);
    // As we have not endless amount of money we reduce any amount by 1000 to avoid no tokens error.
    const toPay = accJSON.airport.contract.amount / 1000;
    console.log("Need to pay fee to Airport:", toPay);

    const airportAddressBuf = cryptography.hexToBuffer(airportAddress);
    const base32AirportAddress = cryptography.getBase32AddressFromAddress(airportAddressBuf);
    const address = cryptography.getAddressFromBase32Address(base32AirportAddress);
    const tx = await client.transaction.create({
      moduleID: 2,
      assetID: 0,
      fee: BigInt(transactions.convertLSKToBeddows("0.01")),
      asset: {
        amount: BigInt(transactions.convertLSKToBeddows(`${toPay}`)),
        recipientAddress: address,
        data: "Pay for landing."
      }
    }, dronePassphrase);
    await client.transaction.send(tx);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();

