<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<script>
import router from '@/router'
export default {
    beforeMount() {
        router.push({ path: window.location.pathname })
    }
}
</script>

<template>
    <header>
        <nav>
            <img class="logo" alt="Staex logo" src="@/assets/logo-light.svg" />
            <ul>
                <li><RouterLink to="/new-asset">Asset</RouterLink></li>
                <li><RouterLink to="/new-contract">Contract</RouterLink></li>
                <li><RouterLink to="/qrcode">QR code</RouterLink></li>
                <li><RouterLink to="/airport">Airport</RouterLink></li>
            </ul>
        </nav>
    </header>
    <RouterView />
</template>
