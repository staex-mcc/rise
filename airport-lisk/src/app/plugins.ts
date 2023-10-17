/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { AirportPlugin } from './plugins/airport/airport';

export const registerPlugins = (app: Application): void => {
	app.registerPlugin(new AirportPlugin());
};
