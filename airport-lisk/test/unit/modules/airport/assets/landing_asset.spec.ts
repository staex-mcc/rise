import { LandingAsset } from '../../../../../src/app/modules/airport/assets/landing_asset';

describe('LandingAsset', () => {
	let transactionAsset: LandingAsset;

	beforeEach(() => {
		transactionAsset = new LandingAsset();
	});

	describe('constructor', () => {
		it('should have valid id', () => {
			expect(transactionAsset.id).toEqual(491);
		});

		it('should have valid name', () => {
			expect(transactionAsset.name).toEqual('landing');
		});

		it('should have valid schema', () => {
			expect(transactionAsset.schema).toMatchSnapshot();
		});
	});

	describe('validate', () => {
		describe('schema validation', () => {
			it.todo('should throw errors for invalid schema');
			it.todo('should be ok for valid schema');
		});
	});

	describe('apply', () => {
		describe('valid cases', () => {
			it.todo('should update the state store');
		});

		describe('invalid cases', () => {
			it.todo('should throw error');
		});
	});
});
