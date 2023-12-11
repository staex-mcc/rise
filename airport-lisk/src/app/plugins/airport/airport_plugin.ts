import {
	BasePlugin,
	PluginInfo,
	db,
	BaseChannel,
	EventsDefinition,
	ActionsDefinition,
	SchemaWithDefault,
} from 'lisk-sdk';
import { randomUUID } from 'crypto'

const DATA_DIR = '/var/lib/airport-lisk'

export class AirportPlugin extends BasePlugin {
	public static get alias(): string {
		return 'gateway';
	}
	public static get info(): PluginInfo {
		return {
			author: 'staex',
			version: '0.1.0',
			name: 'airport',
		};
	}
	public get defaults(): SchemaWithDefault {
		return {
			$id: '/plugins/plugin-airport/config',
			type: 'object',
			properties: {},
			required: [],
			default: {},
		};
	}
	public get actions(): ActionsDefinition {
		return {
			landing: async (params?: Record<string, unknown>) => {
                console.log('landing', params)
                const id = randomUUID();
				await this.landingStorage.put(id, objectToBuffer(params?.data));
				return {};
			},
			transactions: async (_params?: Record<string, unknown>) => {
				const landingStream = this.landingStorage.createReadStream({
					keys: true,
					values: true,
					limit: 1000,
				});
				const entities: unknown[] = [];
				for await (const chunk of landingStream) {
					const c = (chunk as unknown) as { value: Buffer };
					entities.push(bufferToObject(c.value));
				}
				return entities;
			},
		};
	}
	private landingStorage!: db.KVStore;
	public get events(): EventsDefinition {
		return [];
	}
	public async load(_channel: BaseChannel): Promise<void> {
		this.landingStorage = new db.KVStore(DATA_DIR + '/landings.db');
	}
	public async unload(): Promise<void> {
		await this.landingStorage.close();
	}
}

const objectToBuffer = (object: unknown): Buffer => {
    return Buffer.from(JSON.stringify(object))
}

const bufferToObject = (buffer: Buffer): unknown => {
    return JSON.parse(buffer.toString())
}
