/* eslint-disable class-methods-use-this */

import {
	BaseCommand,
	CommandVerifyContext,
	CommandExecuteContext,
	VerificationResult,
	VerifyStatus,
} from 'lisk-sdk';
import { LandingEvent } from '../events/landing';

interface Params {
	landingId: string;
	droneAddress: string;
}

export class LandingCommand extends BaseCommand {
	public schema = {
		$id: 'LandingCommand',
		type: 'object',
		properties: {},
	};

	public async verify(_: CommandVerifyContext<Params>): Promise<VerificationResult> {
		return { status: VerifyStatus.OK };
	}

	public async execute(context: CommandExecuteContext<Params>): Promise<void> {
		const landingEvent = this.events.get(LandingEvent);
		landingEvent.add(
			context,
			{
				landingId: context.params.landingId,
				droneAddress: context.params.droneAddress,
			},
			[context.transaction.senderAddress],
		);
	}
}
