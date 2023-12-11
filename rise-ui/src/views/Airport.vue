<script>
import { createApiClient } from '@/client.js'
export default {
    data() {
        return {
            airportAddress: '',
            transactions: [],
            error: '',
        }
    },
    methods: {
        showLandings: async function () {
            this.error = ''
            if (this.airportAddress === '') {
                this.transactions = []
            } else if (!this.airportAddress.match(/^[0-9a-f]{40}$/)) {
                this.transactions = []
                this.error = 'The wallet address should be a 40 characters long hexadecimal string.'
            } else {
                const client = await createApiClient()
                let transactions = await client.invoke('gateway:transactions', {})
                transactions.sort((a, b) => a.timestamp > b.timestamp)
                this.transactions = transactions
                console.log(this.transactions)
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
    <div class="row">
        <button type="button" @click="showLandings">Show</button>
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
    <div class="row" v-if="transactions.length !== 0">
        <h2>Recent events</h2>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Landing ID</th>
                    <th>Drone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tx in transactions" :key="tx.timestamp">
                    <td>{{ new Date(tx.timestamp).toISOString() }}</td>
                    <td>{{ tx.event }}</td>
                    <td>{{ tx.landingId }}</td>
                    <td>{{ tx.droneAddress }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
