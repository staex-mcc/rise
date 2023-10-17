import {
	BasePluginEndpoint,
	PluginEndpointContext,
	db,
	transactions,
	Transaction,
	apiClient,
	transactionSchema,
	cryptography,
	codec,
	TokenModule,
} from 'lisk-sdk';
import { LandingStoreData, schema as LandingSchema } from '../../modules/airport/stores/landing';

const DB_KEY_NAME = Buffer.from([0]);
const DB_KEY_ADDRESS = Buffer.from([1]);
const DB_KEY_LANDLORD_ADDRESS = Buffer.from([2]);
const DB_KEY_PASSPHRASE = Buffer.from([3]);

type PrivateInfo = {
	name: string;
	landlordAddress: string;
	address: string;
	passphrase: string;
};

type Tx = {
	type: string;
	sender: string;
	transfer: TransferAsset | undefined;
	landing: LandingStoreData | undefined; // todo: is it okay to import interface?
};

// todo: can we found it in sdk?
type TokenModuleAsset = {
	amount: number;
	recipientAddress: Buffer;
	data: string;
};

// todo: can we found it in sdk?
type TransferAsset = {
	amount: string;
	recipient: string;
	data: string;
};

// todo: where can we get it from sdk?
// Copied from https://github.com/LiskHQ/lisk-sdk/blob/development/framework/src/modules/token/schemas.ts
// https://github.com/LiskHQ/lisk-sdk/commit/2d04e23b5b172a7b84cdad2669b985a51156e671
const tokenModuleSchema = {
	$id: '/lisk/transferParams',
	title: 'Transfer transaction params',
	type: 'object',
	required: ['tokenID', 'amount', 'recipientAddress', 'data'],
	properties: {
		tokenID: {
			dataType: 'bytes',
			fieldNumber: 1,
		},
		amount: {
			dataType: 'uint64',
			fieldNumber: 2,
		},
		recipientAddress: {
			dataType: 'bytes',
			fieldNumber: 3,
			format: 'lisk32',
		},
		data: {
			dataType: 'string',
			fieldNumber: 4,
		},
	},
};

export class Endpoint extends BasePluginEndpoint {
	private airportStorage!: db.Database;
	private landingStorage!: db.Database;
	private txStorage!: db.Database;
	private client!: apiClient.APIClient;

	public init(
		airportStorage: db.Database,
		landingStorage: db.Database,
		txStorage: db.Database,
		client: apiClient.APIClient,
	) {
		this.airportStorage = airportStorage;
		this.landingStorage = landingStorage;
		this.txStorage = txStorage;
		this.client = client;
	}

	public async landing(context: PluginEndpointContext): Promise<any> {
		const info = await this.getPrivateInfo();
		const tx = await this.client.transaction.create(
			{
				module: 'airport',
				command: 'landing',
				fee: BigInt(transactions.convertLSKToBeddows('0.01')),
				params: {
					drone: {
						address: context.params?.droneAddress as string,
					},
					landingId: context.params?.landingId as string,
					airportAddress: info.address,
					landlordAddress: info.landlordAddress,
					timestamp: Date.now().toString(),
				},
			},
			info.passphrase,
		);
		await this.client.transaction.send(tx);
		return {};
	}

	public async transactions(_: PluginEndpointContext): Promise<any> {
		const landingStream = this.landingStorage.createReadStream({ limit: 1000 });
		const txStream = this.txStorage.createReadStream({ limit: 1000 });
		const entities: Tx[] = [];
		for await (const chunk of landingStream) {
			const c = chunk as unknown as { value: Buffer };
			const x = this.processTx('landing', c.value);
			entities.push(x);
		}
		for await (const chunk of txStream) {
			const c = chunk as unknown as { value: Buffer };
			const x = this.processTx('transaction', c.value);
			entities.push(x);
		}
		return entities;
	}

	public async saveAirportInfo(context: PluginEndpointContext): Promise<any> {
		await this.airportStorage.set(DB_KEY_NAME, context.params?.name as Buffer);
		await this.airportStorage.set(DB_KEY_ADDRESS, context.params?.address as Buffer);
		await this.airportStorage.set(
			DB_KEY_LANDLORD_ADDRESS,
			context.params?.landlordAddress as Buffer,
		);
		await this.airportStorage.set(DB_KEY_PASSPHRASE, context.params?.passphrase as Buffer);
		return {};
	}

	// todo: can we call it as rpc? if so, disable it somehow
	public async payToLandlord(landingId: string, droneAddress: string): Promise<void> {
		const info = await this.getPrivateInfo();
		const res: Buffer = await this.client.invoke('app:getAccount', {
			address: info.landlordAddress,
		});
		const accObject = this.client.account.decode(res);
		const accJSON = this.client.account.toJSON(accObject) as AccountType;
		// As we have not endless amount of money we reduce any amount by 1000 to avoid no tokens error.
		const toPay = accJSON.airport.contract.amount / 1000;
		this._logger.info(toPay, 'Need to pay fee to Landlord');

		const addressBuf = cryptography.hexToBuffer(info.landlordAddress);
		const base32Address = cryptography.getBase32AddressFromAddress(addressBuf);
		const address = cryptography.getAddressFromBase32Address(base32Address);
		const tx = await this.client.transaction.create(
			{
				moduleID: 2,
				assetID: 0,
				// We increase fee by 0.01 to avoid error about insufficient fee amount for transaction replacement.
				fee: BigInt(transactions.convertLSKToBeddows('0.02')),
				asset: {
					amount: BigInt(transactions.convertLSKToBeddows(`${toPay}`)),
					recipientAddress: address,
					data: 'PR:' + droneAddress + ':' + landingId,
				},
			},
			info.passphrase,
		);
		await this.client.transaction.send(tx);
	}

	public async saveTransaction(params?: Record<string, unknown>) {
		const buf = cryptography.hexToBuffer(params?.transaction as string);
		const tx: Transaction = this.client.transaction.decode(buf);
		const id = cryptography.bufferToHex(tx.id);
		if (tx.moduleID === 2 && tx.assetID === 0) {
			await this.txStorage.put(id, buf);
		}
		if (tx.moduleID === 12700 && tx.assetID === 491) {
			await this.landingStorage.put(id, buf);
		}
	}

	private async getPrivateInfo(): Promise<PrivateInfo> {
		const keys = [DB_KEY_NAME, DB_KEY_ADDRESS, DB_KEY_LANDLORD_ADDRESS, DB_KEY_PASSPHRASE];
		for (const key of keys) {
			if (!(await this.airportStorage.has(key))) {
				throw new Error(`${key} is not exists in airport database`);
			}
		}

		const name = (await this.airportStorage.get(DB_KEY_NAME)).toString();
		const landlordAddress = (await this.airportStorage.get(DB_KEY_ADDRESS)).toString();
		const address = (await this.airportStorage.get(DB_KEY_LANDLORD_ADDRESS)).toString();
		const passphrase = (await this.airportStorage.get(DB_KEY_PASSPHRASE)).toString();

		return { name, landlordAddress, address, passphrase };
	}

	private processTx(name: string, val: Buffer): Tx {
		const tx: Transaction = codec.decode(transactionSchema, val);
		const sender = cryptography.address.getLisk32AddressFromPublicKey(tx.senderPublicKey);
		let transfer: TransferAsset | undefined;
		let landing: LandingStoreData | undefined;
		if (name === 'landing') {
			// todo: to const
			const asset: LandingStoreData = codec.decode(LandingSchema, tx.params);
			landing = asset;
		} else {
			TokenModule;
			const asset: TokenModuleAsset = codec.decode(tokenModuleSchema, tx.params);
			const address = cryptography.address.getLisk32AddressFromPublicKey(asset.recipientAddress);
			transfer = {
				amount: transactions.convertBeddowsToLSK(asset.amount.toString(10)),
				recipient: address,
				data: asset.data,
			};
		}
		return {
			type: name,
			sender,
			transfer,
			landing,
		};
	}
}
