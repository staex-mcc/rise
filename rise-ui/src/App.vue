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
                <li><RouterLink to="/drone">Register</RouterLink></li>
                <li><RouterLink to="/airport">Airport</RouterLink></li>
                <li><RouterLink to="/landlord">Property</RouterLink></li>
            </ul>
        </nav>
    </header>
    <RouterView />
</template>
