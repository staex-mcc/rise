import {
	BaseCommand,
	CommandVerifyContext,
	CommandExecuteContext,
	VerificationResult,
	VerifyStatus,
} from 'lisk-sdk';
import { ContractStore } from '../stores/contract';

interface Params {
	amount: number;
}

export class ContractCommand extends BaseCommand {
	public schema = {
		$id: 'ContractCommand',
		type: 'object',
		properties: {},
	};

	public async verify(_: CommandVerifyContext<Params>): Promise<VerificationResult> {
		return { status: VerifyStatus.OK };
	}

	public async execute(context: CommandExecuteContext<Params>): Promise<void> {
		const { senderAddress } = context.transaction;
		const contractStore = this.stores.get(ContractStore);
		contractStore.set(context, senderAddress, {
			amount: context.params.amount,
		});
	}
}
