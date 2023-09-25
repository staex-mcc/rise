<script>
import QRCode from 'qrcode'
export default {
    data() {
        return {
            walletAddress: '',
            qrcode: '',
            error: '',
        }
    },
    watch: {
        walletAddress(value) {
            value = value.trim().toLowerCase()
            this.error = ''
            this.walletAddress = value
            if (value === '') {
                this.qrcode = ''
            } else if (!value.match(/^[0-9a-f]{40}$/)) {
                this.qrcode = ''
                this.error = 'The wallet address should be a 40 characters long hexadecimal string.'
            } else {
                const options = {
                    errorCorrectionLevel: 'H',
                    quality: 1,
                }
                QRCode.toDataURL(this.walletAddress, options).then((url) => {
                    this.qrcode = url
                })
            }
        },
    },
}
</script>

<template>
    <h1>Get your QR code</h1>
    <div class="row">
        <label for="walletAddress">Wallet address</label>
        <input type="text" name="walletAddress" id="walletAddress" v-model="walletAddress" />
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
