import { apiClient, cryptography, transactions } from 'lisk-sdk';
import { readFileSync } from 'fs';

const droneAccount = JSON.parse(readFileSync('state/drone.json'));

(async () => {
	const client = await apiClient.createWSClient('wss://rise.staex.io/ws');
	try {
		await client.invoke('gateway:landing', {
			landingId: 'asd_dsa',
			droneAddress: droneAccount.address,
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
	process.exit(0);
})();
