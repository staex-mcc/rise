import { BasePlugin, apiClient, db } from 'lisk-sdk';
import { Endpoint } from './endpoint';

export class AirportPlugin extends BasePlugin {
	public name: 'gateway';

	public get nodeModulePath(): string {
		return __filename;
	}

	public endpoint = new Endpoint();

	private airportStorage!: db.Database;
	private landingStorage!: db.Database;
	private txStorage!: db.Database;
	private client!: apiClient.APIClient;

	public async load(): Promise<void> {
		this.airportStorage = new db.Database('/var/lib/airport-lisk/airport.db');
		this.landingStorage = new db.Database('/var/lib/airport-lisk/landings.db');
		this.txStorage = new db.Database('/var/lib/airport-lisk/transactions.db');
		this.client = await apiClient.createWSClient('ws://127.0.0.1:12400/ws');

		this.endpoint.init(this.airportStorage, this.landingStorage, this.txStorage, this.client);

		// todo: to const
		this.client.subscribe('airport:landing', async (params?: Record<string, unknown>) => {
			const landingId = params?.landingId as string;
			const droneAddress = params?.drone as string;
			await this.endpoint.payToLandlord(landingId, droneAddress);
		});

		// todo: to const
		this.client.subscribe('new.transactions', async (params?: Record<string, unknown>) => {
			await this.endpoint.saveTransaction(params);
		});
	}

	public async unload(): Promise<void> {
		this.airportStorage.close();
		this.landingStorage.close();
		this.txStorage.close();
		this.client.disconnect();
	}
}

/**
 * todo: calculate min fee for all transactions!!!
 **/
