import { createRouter, createWebHistory } from 'vue-router'
import DroneQR from '@/views/DroneQR.vue'
import Airport from '@/views/Airport.vue'
import Landlord from '@/views/Landlord.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'drone' },
        },
        {
            path: '/drone',
            name: 'drone',
            component: DroneQR,
        },
        {
            path: '/airport',
            name: 'airport',
            component: Airport,
        },
        {
            path: '/landlord',
            name: 'landlord',
            component: Landlord,
        },
    ],
})

export default router
