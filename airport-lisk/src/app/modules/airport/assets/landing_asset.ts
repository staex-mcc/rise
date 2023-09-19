import { BaseAsset, ApplyAssetContext, ValidateAssetContext } from 'lisk-sdk';

export const Schema = {
	$id: 'airport/landing-asset',
	title: 'LandingAsset transaction asset for airport module',
	type: 'object',
	required: ['drone', 'timestamp'],
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
		timestamp: {
			fieldNumber: 2,
			dataType: 'string',
		},
	},
};

export type Asset = {
	drone: {
		address: string;
	};
	timestamp: string;
};

export class LandingAsset extends BaseAsset {
	public id = 491;
	public name = 'landing';
	public schema = Schema;
	public validate({}: ValidateAssetContext<{}>): void {}
	public async apply({}: ApplyAssetContext<{}>): Promise<void> {}
}
