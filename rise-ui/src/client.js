import { apiClient } from '@/../node_modules/@liskhq/lisk-client/dist-browser/index.min.js'

export async function createApiClient() {
    let protocol = 'wss:'
    if (location.protocol === 'http:') {
        protocol = 'ws:'
    }
    console.log(apiClient)
    return await apiClient.createWSClient(`${protocol}//${location.host}/ws`)
}
