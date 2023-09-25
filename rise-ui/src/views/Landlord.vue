<script>
export default {
    data() {
        return {
            propertyAddress: '',
            error: '',
        }
    },
}
</script>

<template>
    <h1>Property status</h1>
    <div class="row">
        <label for="propertyAddress">Property wallet address</label>
        <input type="text" name="propertyAddress" id="airportAddress" v-model="airportAddress" />
    </div>
    <div class="row error" v-if="error !== ''">{{ error }}</div>
</template>
