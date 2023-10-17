import { BaseModule, ModuleMetadata } from 'lisk-sdk';
import { ContractCommand } from './commands/contract';
import { LandingCommand } from './commands/landing';
import { AirportEndpoint } from './endpoint';
import { AirportMethod } from './method';
import { ContractStore } from './stores/contract';
import { LandingStore } from './stores/landing';
import { LandingEvent } from './events/landing';

export class AirportModule extends BaseModule {
	public endpoint = new AirportEndpoint(this.stores, this.offchainStores);
	public method = new AirportMethod(this.stores, this.events);
	public commands = [
		new LandingCommand(this.stores, this.events),
		new ContractCommand(this.stores, this.events),
	];

	public constructor() {
		super();
		this.stores.register(ContractStore, new ContractStore(this.name, 0));
		this.stores.register(LandingStore, new LandingStore(this.name, 1));
		this.events.register(LandingEvent, new LandingEvent(this.name));
	}

	public metadata(): ModuleMetadata {
		return {
			...this.baseMetadata(),
			endpoints: [],
			assets: [],
		};
	}
}
