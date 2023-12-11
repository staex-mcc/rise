<script setup>
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
</script>
<script>
import {
    apiClient,
    passphrase,
    cryptography,
    transactions,
} from "@/../node_modules/@liskhq/lisk-client/dist-browser/index.min.js";
import { createApiClient } from '@/client.js'

async function fund(client, address) {
    const result = await client.invoke("faucet:authorize", {
        password: "arbuz",
        enable: true,
    });
    console.log(`faucet:authorize `, result);
    const result2 = await client.invoke("faucet:fundTokens", {
        address: address,
        token: "lsk",
    });
    console.log(`faucet:fundTokens `, result2);
}

export default {
    data() {
        return {
            assetType: "drone",
            asset: {
                address: null,
                passphrase: null,
                publicKey: null,
            },
            error: "",
            success: "",
        };
    },
    methods: {
        createAsset: async function () {
            this.error = "";
            this.success = "";
            try {
                const assetPassphrase = passphrase.Mnemonic.generateMnemonic();
                const res =
                    cryptography.getAddressAndPublicKeyFromPassphrase(
                        assetPassphrase,
                    );
                const binaryAddress = cryptography.bufferToHex(res.address);
                this.asset = {
                    address: binaryAddress,
                    passphrase: assetPassphrase,
                    publicKey: cryptography.bufferToHex(res.publicKey),
                };
                console.log("created account ");
                const client = await createApiClient();
                await fund(client, binaryAddress);
                console.log("funded account");
                this.success = `Created account ${this.asset.address}.`;
            } catch (e) {
                this.error = `failed to create asset: ${e}`;
                console.log(e);
            }
        },
        reset() {
            this.error = "";
            this.success = "";
            this.asset.address = null;
            this.asset.passphrase = null;
            this.asset.publicKey = null;
            this.assetType = "drone";
        },
    },
};
</script>

<template>
    <h1>Create asset</h1>
    <div class="row">
        <p>Which asset do you want to register?</p>
        <ul class="radio">
            <li>
                <input
                    type="radio"
                    name="assetType"
                    id="assetDrone"
                    value="drone"
                    v-model="assetType"
                />
                <label for="assetDrone">Drone</label>
            </li>
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
        <div class="row" v-if="asset.address != null">
            <label for="address">Wallet address</label>
            <input
                type="text"
                name="address"
                id="address"
                :value="asset.address"
            />
        </div>
        <div class="row" v-if="asset.passphrase != null">
            <label for="passphrase">Passphrase</label>
            <input
                type="password"
                name="passphrase"
                id="passphrase"
                :value="asset.passphrase"
            />
            &nbsp;
            <CopyToClipboardButton id="passphrase" />
        </div>
        <div class="row" v-if="asset.publicKey != null">
            <label for="publicKey">Public key</label>
            <input
                type="text"
                name="publicKey"
                id="publicKey"
                :value="asset.publicKey"
            />
        </div>
    </div>
    <div class="row">
        <button
            type="button"
            @click="createAsset"
            v-if="error === '' && success === ''"
        >
            Create
        </button>
        <button
            type="button"
            @click="reset"
            v-if="!(error === '' && success === '')"
        >
            Reset
        </button>
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
    <div class="row success" v-if="success !== ''">{{ success }}</div>
</template>
