import { BaseStore } from 'lisk-sdk';

export interface LandingStoreData {
	drone: {
		address: string;
	};
	landingId: string;
	airportAddress: string;
	landlordAddress: string;
	timestamp: string;
}

export const schema = {
	$id: '/airport/landing',
	type: 'object',
	required: ['amount'],
	properties: {
		drone: {
			fieldNumber: 1,
			type: 'object',
			required: ['address'],
			properties: {
				address: {
					fieldNumber: 1,
					dataType: 'string',
				},
			},
		},
		landingId: {
			fieldNumber: 2,
			dataType: 'string',
		},
		airportAddress: {
			fieldNumber: 3,
			dataType: 'string',
		},
		landlordAddress: {
			fieldNumber: 4,
			dataType: 'string',
		},
		timestamp: {
			fieldNumber: 5,
			dataType: 'string',
		},
	},
};

export class LandingStore extends BaseStore<LandingStoreData> {
	public schema = schema;
}
