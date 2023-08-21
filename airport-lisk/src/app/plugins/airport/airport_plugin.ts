import {
	BasePlugin,
	PluginInfo,
	Transaction,
	db,
	BaseChannel,
	EventsDefinition,
	ActionsDefinition,
	SchemaWithDefault,
	apiClient,
	transactions,
	cryptography,
} from 'lisk-sdk';
import { AccountType } from '../../modules/airport/airport_module';

type PrivateInfo = {
	name: string;
	landlordAddress: string;
	passphrase: string;
};

export class AirportPlugin extends BasePlugin {
	public static get alias(): string {
		return 'gateway';
	}
	public static get info(): PluginInfo {
		return {
			author: 'staex',
			version: '0.1.0',
			name: 'airport',
		};
	}
	public get defaults(): SchemaWithDefault {
		return {
			$id: '/plugins/plugin-airport/config',
			type: 'object',
			properties: {},
			required: [],
			default: {},
		};
	}
	public get actions(): ActionsDefinition {
		return {
			landing: async (params?: Record<string, unknown>) => {
				const info = await this.getPrivateInfo();
				const tx = await this.client.transaction.create(
					{
						moduleID: 12700,
						assetID: 491,
						fee: BigInt(transactions.convertLSKToBeddows('0.01')),
						asset: {
							drone: {
								address: params?.droneAddress as string,
							},
							timestamp: Date.now().toString(),
						},
					},
					info.passphrase,
				);
				await this.client.transaction.send(tx);
				return {};
			},
		};
	}
	private airportStorage!: db.KVStore;
	private landingStorage!: db.KVStore;
	private txStorage!: db.KVStore;
	private client!: apiClient.APIClient;
	public get events(): EventsDefinition {
		return [];
	}
	public async load(channel: BaseChannel): Promise<void> {
		this.airportStorage = new db.KVStore('../root/.lisk/airport-lisk/airport.db');
		this.landingStorage = new db.KVStore('../root/.lisk/airport-lisk/landings.db');
		this.txStorage = new db.KVStore('../root/.lisk/airport-lisk/transactions.db');
		this.client = await apiClient.createWSClient('ws://127.0.0.1:12400/ws');

		channel.subscribe('airport:landing', async () => {
			await this.payToLandlord();
		});
		channel.subscribe('app:transaction:new', async (params?: Record<string, unknown>) => {
			const buf = cryptography.hexToBuffer(params?.transaction as string);
			const tx = this.client.transaction.decode(buf) as Transaction;
			const id = cryptography.bufferToHex(tx.id);
			if (tx.moduleID === 2 && tx.assetID === 0) {
				await this.txStorage.put(id, buf);
			}
			if (tx.moduleID === 12700 && tx.assetID === 491) {
				await this.landingStorage.put(id, buf);
			}
		});
	}
	public async unload(): Promise<void> {
		await this.airportStorage.close();
	}

	private async payToLandlord(): Promise<void> {
		const info = await this.getPrivateInfo();
		const res = (await this.client.invoke('app:getAccount', {
			address: info.landlordAddress,
		})) as Buffer;
		const accObject = this.client.account.decode(res);
		const accJSON = this.client.account.toJSON(accObject) as AccountType;
		const toPay = accJSON.airport.contract.amount / 1000;
		this._logger.info(toPay, 'Need to pay fee to Landlord');

		const addressBuf = cryptography.hexToBuffer(info.landlordAddress);
		const base32Address = cryptography.getBase32AddressFromAddress(addressBuf);
		const address = cryptography.getAddressFromBase32Address(base32Address);
		const tx = await this.client.transaction.create(
			{
				moduleID: 2,
				assetID: 0,
				fee: BigInt(transactions.convertLSKToBeddows('0.02')),
				asset: {
					amount: BigInt(transactions.convertLSKToBeddows(`${toPay}`)),
					recipientAddress: address,
					data: 'Pay for land renting.',
				},
			},
			info.passphrase,
		);
		await this.client.transaction.send(tx);
	}

	private async getPrivateInfo(): Promise<PrivateInfo> {
		const keys = ['name', 'landlord_address', 'passphrase'];
		for (const key of keys) {
			if (!(await this.airportStorage.exists(key))) {
				throw new Error(`${key} is not exists in airport database`);
			}
		}

		const name = (await this.airportStorage.get('name')).toString();
		const landlordAddress = (await this.airportStorage.get('landlord_address')).toString();
		const passphrase = (await this.airportStorage.get('passphrase')).toString();

		return { name, landlordAddress, passphrase };
	}
}
