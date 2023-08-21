import { BaseAsset, ApplyAssetContext, ValidateAssetContext } from 'lisk-sdk';
import { AccountType } from '../airport_module';

export type AssetType = {
	amount: number;
};

export class ContractAsset extends BaseAsset {
	public id = 872;
	public name = 'contract';
	public schema = {
		$id: 'airport/contract-asset',
		title: 'ContractAsset transaction asset for airport module',
		type: 'object',
		required: ['amount'],
		properties: {
			amount: {
				fieldNumber: 1,
				dataType: 'uint32',
			},
		},
	};
	public validate({}: ValidateAssetContext<{}>): void {}
	public async apply({
		asset,
		transaction,
		stateStore,
	}: ApplyAssetContext<AssetType>): Promise<void> {
		const { senderAddress } = transaction;
		const senderAccount = (await stateStore.account.get(senderAddress)) as AccountType;
		senderAccount.airport.contract.amount = asset.amount;
		await stateStore.account.set(senderAccount.address, senderAccount);
	}
}
