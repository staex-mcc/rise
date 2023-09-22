import { apiClient, cryptography, transactions } from 'lisk-sdk';

const droneAccount = readFileSync('state/drone.json');

(async () => {
	const client = await apiClient.createWSClient('ws://127.0.0.1:12400/ws');
	try {
		const res = await client.invoke('gateway:landing', {
			landingId: 'asd_dsa',
			droneAddress: droneAccount.address,
		});
		console.log(res);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
	process.exit(0);
})();
