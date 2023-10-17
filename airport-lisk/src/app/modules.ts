/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { AirportModule } from './modules/airport/module';

export const registerModules = (app: Application): void => {
	app.registerModule(new AirportModule());
};
