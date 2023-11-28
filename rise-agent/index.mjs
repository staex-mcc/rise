import { apiClient, cryptography, transactions } from "lisk-sdk";
import { VideoCapture } from "camera-capture";
import jsQR from "jsqr";

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

async function droneLanded(client, walletAddress) {
    console.log(`drone ${walletAddress} landed`);
    try {
        await client.invoke("gateway:landing", {
            landingId: config.landingId,
            droneAddress: walletAddress,
        });
    } catch (e) {
        console.error("failed to trigger drone landing: " + e);
    }
}

function isValidWalletAddress(value) {
    return value.match(/^[0-9a-f]{40}$/);
}

const args = parseArguments();
console.log(args);
const { default: config } = await import(args.config);
console.log(config);
const client = await apiClient.createWSClient(config.wsClientUrl);

const c = new VideoCapture(config.videoCaptureOptions);
c.addFrameListener((frame) => {
    const code = jsQR(frame.data, frame.width, frame.height, {
        inversionAttempts: "dontInvert",
    });
    if (code) {
        //console.log("qr code: " + code.data);
        const walletAddress = code.data.trim().toLowerCase();
        if (isValidWalletAddress(walletAddress)) {
            droneLanded(client, walletAddress);
        } else {
            console.log("invalid wallet address: " + walletAddress);
        }
    } else {
        //console.log("no qr code");
    }
});
//setTimeout(() => c.stop(), 10000);
console.log("Capturing camera");
await c.start();
console.log("Stopping camera capture");
