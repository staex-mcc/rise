<script>
import {
    apiClient,
    passphrase,
    cryptography,
    transactions,
} from '@/../node_modules/@liskhq/lisk-client/dist-browser/index.min.js'
import { createApiClient } from '@/client.js'

const MODULE_ID = 12700
const ASSET_ID = 872

async function updateContract(client, passphrase, amount) {
    const tx = await client.transaction.create(
        {
            moduleID: MODULE_ID,
            assetID: ASSET_ID,
            fee: BigInt(transactions.convertLSKToBeddows('0.01')),
            asset: {
                amount: 40,
            },
        },
        passphrase,
    )
    await client.transaction.send(tx)
}

async function getAccount(client, address) {
    const binary = await client.invoke('app:getAccount', {
        address: address,
    })
    const object = client.account.decode(binary)
    return client.account.toJSON(object)
}

export default {
    data() {
        return {
            assetType: 'airport',
            asset: {
                passphrase: null,
            },
            contract: {
                amount: 40,
            },
            error: '',
            success: '',
        }
    },
    methods: {
        createContract: async function () {
            this.error = ''
            this.success = ''
            try {
                const res = cryptography.getAddressAndPublicKeyFromPassphrase(this.asset.passphrase)
                const binaryAddress = cryptography.bufferToHex(res.address)
                const client = await createApiClient()
                const account = await getAccount(client, binaryAddress)
                await updateContract(client, this.asset.passphrase, this.contract.amount)
                console.log('updated contract')
                this.success = `Updated contract.`;
            } catch (e) {
                this.error = `failed to update contract: ${e}`
                console.log(e)
            }
        },
        reset() {
            this.error = ''
            this.success = ''
            this.contract.amount = 40
            this.asset.passphrase = null
            this.assetType = 'airport'
        },
    },
}
</script>

<template>
    <h1>Update contract</h1>
    <div class="row">
        <p>Asset</p>
        <ul class="radio">
            <li>
                <input
                    type="radio"
                    name="assetType"
                    id="assetAirport"
                    value="airport"
                    v-model="assetType"
                />
                <label for="assetAirport">Airport</label>
            </li>
            <li>
                <input
                    type="radio"
                    name="assetType"
                    id="assetLand"
                    value="land"
                    v-model="assetType"
                />
                <label for="assetLand">Land</label>
            </li>
        </ul>
    </div>
    <div>
        <div class="row">
            <label for="passphrase">Passphrase</label>
            <input type="password" name="passphrase" id="passphrase" v-model="asset.passphrase" />
        </div>
        <div class="row" v-if="contract.amount != null">
            <label for="amount">Contract</label>
            <input type="text" name="amount" id="amount" v-model="contract.amount" />
            <p v-if="assetType === 'airport'">
                <small>Amount of LSK paid to the airport.</small>
            </p>
            <p v-if="assetType === 'land'">
                <small>Amount of LSK paid to the landlord.</small>
            </p>
        </div>
    </div>
    <div class="row">
        <button type="button" @click="createContract" v-if="error === '' && success === ''">
            Update
        </button>
        <button type="button" @click="reset" v-if="!(error === '' && success === '')">Reset</button>
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
    <div class="row success" v-if="success !== ''">{{ success }}</div>
</template>
