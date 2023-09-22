<script>
import { apiClient } from '@/../node_modules/@liskhq/lisk-client/dist-browser/index.min.js'
export default {
    data() {
        return {
            airportAddress: '',
            transactions: [],
            error: '',
        }
    },
    watch: {
        airportAddress(value) {
            value = value.trim().toLowerCase()
            this.error = ''
            this.airportAddress = value
            if (value === '') {
                this.transactions = {}
            } else if (!value.match(/^[0-9a-f]{40}$/)) {
                this.transactions = {}
                this.error = 'The wallet address should be a 40 characters long hexadecimal string.'
            } else {
                ;(async () => {
                    const client = await apiClient.createWSClient('ws://127.0.0.1:12400/ws')
                    const transactions = await client.invoke('gateway:transactions', {})
                    this.transactions = transactions.filter(
                        (tx) => tx.transfer.recipient === this.airportAddress,
                    )
                })()
            }
        },
    },
}
</script>

<template>
    <h1>Airport status</h1>
    <div class="row">
        <label for="airportAddress">Airport wallet address</label>
        <input type="text" name="airportAddress" id="airportAddress" v-model="airportAddress" />
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
    <div class="row" v-if="transactions.length !== 0">
        <label>Recent transactions</label>
        <ul>
            <li v-for="tx in transactions" :key="tx.sender">
                {{ tx.sender }}
            </li>
        </ul>
    </div>
</template>
