import { Application } from 'lisk-sdk';
import { AirportPlugin } from './plugins/airport/airport_plugin';
import { DashboardPlugin } from '@liskhq/lisk-framework-dashboard-plugin';
import { FaucetPlugin } from '@liskhq/lisk-framework-faucet-plugin';

export const registerPlugins = (app: Application): void => {
	app.registerPlugin(AirportPlugin);
    app.registerPlugin(DashboardPlugin);
    app.registerPlugin(FaucetPlugin);
};
