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
                this.transactions = []
            } else if (!value.match(/^[0-9a-f]{40}$/)) {
                this.transactions = []
                this.error = 'The wallet address should be a 40 characters long hexadecimal string.'
            } else {
                ;(async () => {
                    let protocol = 'wss:'
                    if (location.protocol === 'http:') {
                        protocol = 'ws:'
                    }
                    const client = await apiClient.createWSClient(
                        `${protocol}//${location.host}/ws`,
                    )
                    const transactions = await client.invoke('gateway:transactions', {})
                    console.log(transactions)
                    this.transactions = transactions.filter((tx) => {
                        switch (tx.type) {
                            case 'landing':
                                return tx.landing.airportAddress === this.airportAddress
                            case 'transaction':
                                return tx.transfer.recipient === this.airportAddress && tx.transfer.data !== ''
                            default:
                                return false
                        }
                    }).map((tx) => {
                        switch (tx.type) {
                            case 'landing':
                                return {
                                    timestamp: tx.landing.timestamp,
                                    message: `Drone ${tx.landing.drone.address} has landed.`,
                                }
                            case 'transaction':
                                return {
                                    timestamp: 0,//tx.transfer.timestamp,
                                    message: `Drone ${tx.transfer.data.split(':')[1]} has paid ${tx.transfer.amount} for landing.`,
                                }
                        }
                    })
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
                {{ tx.message }}
            </li>
        </ul>
    </div>
</template>
