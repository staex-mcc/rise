import { Application } from 'lisk-sdk';
import { AirportPlugin } from './plugins/airport/airport_plugin';

export const registerPlugins = (app: Application): void => {
	app.registerPlugin(AirportPlugin);
};
