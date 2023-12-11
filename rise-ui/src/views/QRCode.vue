<script>
import QRCode from 'qrcode'
export default {
    data() {
        return {
            assetType: "drone",
            walletAddress: '',
            landingId: '',
            qrcode: '',
            error: '',
        }
    },
    methods: {
        generateQrCode() {
            this.error = ''
            if (this.walletAddress === '') {
                this.qrcode = ''
            } else if (!this.walletAddress.match(/^[0-9a-f]{40}$/)) {
                this.qrcode = ''
                this.error = 'The wallet address should be a 40 characters long hexadecimal string.'
            } else {
                const options = {
                    errorCorrectionLevel: 'H',
                    quality: 1,
                }
                let object = {
                    address: this.walletAddress
                }
                if (this.assetType === 'airport') {
                    object.landingId = this.landingId
                }
                QRCode.toDataURL(JSON.stringify(object), options).then((url) => {
                    this.qrcode = url
                })
            }
        }
    },
    watch: {
        walletAddress(value) {
            this.walletAddress = value.trim().toLowerCase()
            this.generateQrCode()
        },
        landingId(value) {
            this.landingId = value.trim()
            this.generateQrCode()
        },
    },
}
</script>

<template>
    <h1>Get your QR code</h1>
    <div class="row">
        <p>Asset</p>
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
        </ul>
    </div>
    <div class="row">
        <label for="walletAddress">Wallet address</label>
        <input type="text" name="walletAddress" id="walletAddress" v-model="walletAddress" />
    </div>
    <div class="row" v-if="assetType === 'airport'">
        <label for="landingId">Landing ID</label>
        <input type="text" name="landingId" id="landingId" v-model="landingId" />
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
    <div v-if="qrcode !== ''" class="row">
        <label>QR code</label>
        <img :src="qrcode" alt="QR code" class="qrcode" />
        <ul>
            <li>Print this code and stick it to the bottom of your drone.</li>
            <li>
                The airport will have similar code but with their wallet address on top of each
                landing pad.
            </li>
            <li>When your drone lands send the money to the airport using this code.</li>
        </ul>
    </div>
</template>

<style scoped>
.qrcode {
    display: block;
    margin-bottom: 0.5rem;
}
</style>
