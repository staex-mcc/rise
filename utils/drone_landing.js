import { apiClient, cryptography, transactions } from "lisk-sdk";

// It should be embedded to Drone microchip.
const dronePassphrase = "exist olympic match wash oppose reflect seminar heart square three blue wagon";
const airportAddress = "221d982fd5a560ded4c6cd467e17ee75cb654cf1";

(async () => {
  const client = await apiClient.createWSClient("ws://127.0.0.1:12400/ws");
  try {
    const res = await client.invoke("app:getAccount", { address: airportAddress });
    const accObject = client.account.decode(res);
    const accJSON = client.account.toJSON(accObject);
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

