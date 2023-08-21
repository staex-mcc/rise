import { BaseAsset, ApplyAssetContext, ValidateAssetContext } from 'lisk-sdk';

export class LandingAsset extends BaseAsset {
	public id = 491;
	public name = 'landing';
	public schema = {
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
	public validate({}: ValidateAssetContext<{}>): void {}
	public async apply({}: ApplyAssetContext<{}>): Promise<void> {}
}
