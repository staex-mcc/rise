import { BaseStore } from 'lisk-sdk';

export interface ContractStoreData {
	amount: number;
}

export const schema = {
	$id: '/airport/contract',
	type: 'object',
	required: ['amount'],
	properties: {
		amount: {
			fieldNumber: 1,
			dataType: 'uint32',
		},
	},
};

export class ContractStore extends BaseStore<ContractStoreData> {
	public schema = schema;
}
