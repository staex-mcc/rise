import { createRouter, createWebHistory } from 'vue-router'
import QRCode from '@/views/QRCode.vue'
import Airport from '@/views/Airport.vue'
import Landlord from '@/views/Landlord.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'register' },
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/qrcode',
            name: 'qrcode',
            component: QRCode,
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
