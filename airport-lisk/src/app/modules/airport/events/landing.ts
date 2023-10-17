import { BaseEvent } from 'lisk-sdk';

export interface LandingEventData {
	landingId: string;
	droneAddress: string;
}

export const schema = {
	$id: '/airport/events/landing',
	type: 'object',
	required: ['landingId', 'droneAddress'],
	properties: {
		landingId: {
			fieldNumber: 1,
			dataType: 'string ',
		},
		droneAddress: {
			fieldNumber: 2,
			dataType: 'string',
		},
	},
};

export class LandingEvent extends BaseEvent<LandingEventData> {
	public schema = schema;
}
