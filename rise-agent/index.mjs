import { apiClient, cryptography, transactions } from "lisk-sdk";
import { VideoCapture } from "camera-capture";
import jsQR from "jsqr";

const MODULE_ID = 2;
const ASSET_ID = 0;

function parseArguments() {
    const args = {};
    process.argv.forEach(function (arg, index, array) {
        console.log(index + ": " + arg);
        const idx = arg.indexOf("=");
        if (idx == -1) {
            return;
        }
        const key = arg.slice(0, idx).trim();
        const value = arg.slice(idx + 1).trim();
        args[key] = value;
        console.log(key + " = " + value);
    });
    return args;
}

function addressStringToBinary(string) {
    const buffer = cryptography.hexToBuffer(string);
    const base32 = cryptography.getBase32AddressFromAddress(buffer);
    return cryptography.getAddressFromBase32Address(base32);
}

function accountBinaryToObject(binary) {
    const object = client.account.decode(binary);
    return client.account.toJSON(object);
}

function passphraseToAddress(passphrase) {
    const res = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
    const binaryAddress = cryptography.bufferToHex(res.address);
    return binaryAddress
}

async function getAccount(address) {
    const result = await client.invoke("app:getAccount", {
        address: address,
    });
    return accountBinaryToObject(result);
}

// airport - drone port data from QR code
// drone - private drone data
async function dronePaysDronePort(client, airport, drone, numMinutes) {
    const airportAccount = await getAccount(airport.address);
    // As we have not endless amount of money we reduce any amount by 1000 to avoid no tokens error.
    const toPay = (airportAccount.airport.contract.amount / 1000) * numMinutes;
    console.log(`drone pays airport ${toPay} LSK`);
    const binaryAddress = addressStringToBinary(airport.address);
    const tx = await client.transaction.create(
        {
            moduleID: MODULE_ID,
            assetID: ASSET_ID,
            fee: BigInt(transactions.convertLSKToBeddows("0.01")),
            asset: {
                amount: BigInt(transactions.convertLSKToBeddows(`${toPay}`)),
                recipientAddress: binaryAddress,
                data: "PL:" + drone.account.address + ":" + airport.landingId,
                timestamp: Date.now().toString(),
            },
        },
        drone.account.passphrase,
    );
    await client.transaction.send(tx);
}

async function airportPaysLandlord(client, drone, airport, numMinutes) {
    const landlordAccount = await getAccount(airport.landlordAddress);
    const toPay = (landlordAccount.airport.contract.amount / 1000) * numMinutes;
    console.log(`airport pays landlord ${toPay} LSK`);
    const binaryAddress = addressStringToBinary(airport.landlordAddress);
    const tx = await client.transaction.create(
        {
            moduleID: MODULE_ID,
            assetID: ASSET_ID,
            // We increase fee by 0.01 to avoid error about insufficient fee amount for transaction replacement.
            fee: BigInt(transactions.convertLSKToBeddows("0.02")),
            asset: {
                amount: BigInt(transactions.convertLSKToBeddows(`${toPay}`)),
                recipientAddress: binaryAddress,
                data: "PR:" + drone.address + ":" + airport.landingId,
            },
        },
        airport.passphrase,
    );
    await client.transaction.send(tx);
}

async function airportNotifiesAboutLanding(client, drone, airport) {
    await client.invoke("gateway:landing", {
        data: {
            event: "landed",
            timestamp: Date.now(),
            airportAddress: airport.address,
            landingId: airport.landingId,
            droneAddress: drone.address,
        },
    });
}

function parseQrCode(code) {
    try {
        return JSON.parse(code.data.trim());
    } catch (e) {
        return null;
    }
}

function getInitialState(entity) {
    switch (entity) {
        case "drone":
            return "flying";
        case "airport":
            return "empty";
    }
}

function objectsEqual(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}

const args = parseArguments();
console.log(args);
const { default: config } = await import(args.config);
const client = await apiClient.createWSClient(config.wsClientUrl);
let entity = null;
if ("drone" in config) {
    entity = "drone";
    config.drone.account.address = passphraseToAddress(config.drone.account.passphrase)
}
if ("airport" in config) {
    entity = "airport";
    config.airport.address = passphraseToAddress(config.airport.passphrase)
}
if ("drone" in config && "airport" in config) {
    console.error(
        "both `drone` and `airport` are present in the configuration",
    );
    process.exit(1);
}
console.log(config);
if (entity == null) {
    console.error(
        "please populate `drone` or `airport` keys in the configuration",
    );
    process.exit(1);
}
let state = getInitialState(entity);
let landedDrone = null;
let airport = null;
let landedTimestamp = null;
const c = new VideoCapture(config.videoCaptureOptions);
c.addFrameListener((frame) => {
    const code = jsQR(frame.data, frame.width, frame.height, {
        inversionAttempts: "dontInvert",
    });
    const object = parseQrCode(code);
    if (object == null) {
        switch (entity) {
            case "drone":
                if (state !== "flying" || !objectsEqual(object, airport)) {
                    const numMinutes = Math.max(
                        1,
                        (Date.now() - landedTimestamp) / 1000 / 60.0,
                    );
                    dronePaysDronePort(client, airport, config.drone, numMinutes);
                }
                state = "flying";
                airport = null;
                landedTimestamp = null;
                break;
            case "airport":
                if (state !== "empty" || !objectsEqual(object, landedDrone)) {
                    const numMinutes = Math.max(
                        1,
                        (Date.now() - landedTimestamp) / 1000 / 60.0,
                    );
                    airportPaysLandlord(client, landedDrone, config.airport, numMinutes);
                    airportNotifiesAboutLanding(
                        client,
                        landedDrone,
                        config.airport,
                    );
                }
                state = "empty";
                landedDrone = null;
                break;
        }
    } else {
        try {
            switch (entity) {
                case "drone":
                    if (state !== "landed" || !objectsEqual(object, airport)) {
                        state = "landed";
                        airport = object;
                        landedTimestamp = Date.now();
                    }
                    break;
                case "airport":
                    if (
                        state !== "occupied" ||
                        !objectsEqual(object, landedDrone)
                    ) {
                        state = "occupied";
                        landedDrone = object;
                        landedTimestamp = Date.now();
                    }
                    break;
            }
        } catch (e) {
            console.log(e);
            return;
        }
    }
    console.log(`entity "${entity}" state "${state}" object ${object}`);
});
//setTimeout(() => c.stop(), 10000);
console.log("Capturing camera");
await c.start();
console.log("Stopping camera capture");
