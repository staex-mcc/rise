import { BaseModule, Transaction } from 'lisk-sdk';
import { ContractAsset, AssetType as ContractAssetType } from './assets/contract_asset';
import { LandingAsset } from './assets/landing_asset';

export type AccountType = {
	address: Buffer;
	airport: AirportType;
};

export type AirportType = {
	contract: ContractAssetType;
};

export class AirportModule extends BaseModule {
	public id = 12700;
	public name = 'airport';
	public accountSchema = {
		type: 'object',
		required: ['contract'],
		properties: {
			contract: {
				fieldNumber: 1,
				type: 'object',
				required: ['amount'],
				properties: {
					amount: {
						fieldNumber: 1,
						dataType: 'uint32',
					},
				},
			},
		},
		default: {
			contract: {
				amount: 0,
			},
		},
	};
	public transactionAssets = [new ContractAsset(), new LandingAsset()];
	public events = ['landing'];
	public async afterTransactionApply({ transaction }) {
		const tx = transaction as Transaction;
		if (tx.moduleID === this.id && tx.assetID === 491) {
			this._channel.publish('airport:landing', {});
		}
	}
}
