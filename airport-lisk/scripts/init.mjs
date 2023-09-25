import { apiClient, passphrase, cryptography, transactions } from 'lisk-sdk';
import { writeFile, mkdir } from 'fs/promises';

const stateDir = 'state';
let accounts = {};

function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

async function enableFaucet(client) {
    await client.invoke("faucet:authorize", { password: "arbuz", enable: true });
}

// create drone, airport, landlord accounts
async function createAccounts(client) {
	for (const accountName of ['drone', 'airport', 'landlord']) {
		try {
			const genPassphrase = passphrase.Mnemonic.generateMnemonic();
			const res = cryptography.getAddressAndPublicKeyFromPassphrase(genPassphrase);
			const binaryAddress = cryptography.bufferToHex(res.address);
			const account = {
				address: binaryAddress,
				passphrase: genPassphrase,
                publicKey: cryptography.bufferToHex(res.publicKey),
			};
			accounts[accountName] = account;
			await mkdir(stateDir, { recursive: true, mode: 0o755 });
			const filename = `${stateDir}/${accountName}.json`;
			await writeFile(filename, JSON.stringify(account, null, 4));
			console.log(
				`File: ${filename}\nBinaryAddress: ${binaryAddress}\nPassphrase: ${genPassphrase}`,
			);
			await client.invoke('faucet:fundTokens', { address: binaryAddress, token: 'lsk' });
		} catch (e) {
			console.error(e);
			process.exit(1);
		}
		await sleep(10999);
	}
}

async function createAirport(client) {
	await client.invoke('gateway:saveAirportInfo', {
		name: 'StaexSuperDuperPort',
		landlordAddress: accounts.landlord.address,
		address: accounts.airport.address,
		passphrase: accounts.airport.passphrase,
	});
}

// update contracts
async function updateContracts(client) {
	for (const accountName of ['airport', 'landlord']) {
		const tx = await client.transaction.create(
			{
				moduleID: 12700,
				assetID: 872,
				fee: BigInt(transactions.convertLSKToBeddows('0.01')),
				asset: {
					amount: 40,
				},
			},
            accounts[accountName].passphrase
		);
		await client.transaction.send(tx);
	}
}

(async () => {
	const client = await apiClient.createWSClient('wss://rise.staex.io/ws');
    await enableFaucet(client)
	await createAccounts(client);
	await createAirport(client);
	await updateContracts(client);
	process.exit(0);
})();
