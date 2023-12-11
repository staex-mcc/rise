import { createRouter, createWebHistory } from 'vue-router'
import QRCode from '@/views/QRCode.vue'
import Airport from '@/views/Airport.vue'
import Register from '@/views/Register.vue'
import NewContract from '@/views/NewContract.vue'
import Video from '@/views/Video.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'new-asset' },
        },
        {
            path: '/new-asset',
            name: 'new-asset',
            component: Register,
        },
        {
            path: '/new-contract',
            name: 'new-contract',
            component: NewContract,
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
            path: '/video',
            name: 'video',
            component: Video,
        },
    ],
})

export default router
