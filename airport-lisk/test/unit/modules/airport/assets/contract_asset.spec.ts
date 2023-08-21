import { ContractAsset } from '../../../../../src/app/modules/airport/assets/contract_asset';

describe('ContractAsset', () => {
	let transactionAsset: ContractAsset;

	beforeEach(() => {
		transactionAsset = new ContractAsset();
	});

	describe('constructor', () => {
		it('should have valid id', () => {
			expect(transactionAsset.id).toEqual(872);
		});

		it('should have valid name', () => {
			expect(transactionAsset.name).toEqual('contract');
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
