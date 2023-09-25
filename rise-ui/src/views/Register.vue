<script>
import { apiClient } from '@/../node_modules/@liskhq/lisk-client/dist-browser/index.min.js'

async function createApiClient() {
    let protocol = 'wss:'
    if (location.protocol === 'http:') {
        protocol = 'ws:'
    }
    return await apiClient.createWSClient(`${protocol}//${location.host}/ws`)
}

export default {
    data() {
        return {
            walletAddress: '',
            landlordWalletAddress: '',
            airportPassphrase: '',
            airportName: '',
            asset: 'drone',
            error: '',
        }
    },
    methods: {
        createAsset() {
            switch (this.asset) {
                case 'drone':
                    this.createDrone()
                    break
                case 'airport':
                    this.createAirport(this)
                    break
                case 'land':
                    this.createLand()
                    break
            }
        },
        createDrone() {},
        createAirport: async (that) => {
            const client = await createApiClient()
            const result = await client.invoke('gateway:saveAirportInfo', {
                name: that.airportName,
                landlordAddress: that.landlordWalletAddress,
                address: that.walletAddress,
                passphrase: that.airportPassphrase,
            })
            console.log(result)
        },
    },
}
</script>

<template>
    <h1>Register asset</h1>
    <div class="row">
        <p>Which asset do you want to register?</p>
        <ul class="radio">
        <!--
            <li>
                <input type="radio" name="asset" id="assetDrone" value="drone" v-model="asset" />
                <label for="assetDrone">Drone</label>
            </li>
            -->
            <li>
                <input
                    type="radio"
                    name="asset"
                    id="assetAirport"
                    value="airport"
                    v-model="asset"
                />
                <label for="assetAirport">Airport</label>
            </li>
            <!--
            <li>
                <input type="radio" name="asset" id="assetLand" value="land" v-model="asset" />
                <label for="assetLand">Land</label>
            </li>
            -->
        </ul>
    </div>
    <div>
        <div class="row">
            <label for="walletAddress">Wallet address</label>
            <input type="text" name="walletAddress" id="walletAddress" v-model="walletAddress" />
        </div>
    </div>
    <div v-if="asset === 'airport'">
        <div class="row">
            <label for="landlordWalletAddress">Landlord wallet address</label>
            <input
                type="text"
                name="landlordWalletAddress"
                id="landlordWalletAddress"
                v-model="landlordWalletAddress"
            />
        </div>
        <div class="row">
            <label for="airportName">Name</label>
            <input type="text" name="airportName" id="airportName" v-model="airportName" />
        </div>
        <div class="row">
            <label for="airportPassphrase">Passphrase</label>
            <input
                type="password"
                name="airportPassphrase"
                id="airportPassphrase"
                v-model="airportPassphrase"
            />
        </div>
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
    <button type="button" @click="createAsset">Register</button>
</template>

<style scoped>
.qrcode {
    display: block;
    margin-bottom: 0.5rem;
}
</style>
