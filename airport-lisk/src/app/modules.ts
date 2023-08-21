import { Application } from 'lisk-sdk';
import { AirportModule } from './modules/airport/airport_module';

export const registerModules = (app: Application): void => {
	app.registerModule(AirportModule);
};
