import './assets/main.css'
import '@fontsource/roboto'
import '@fontsource/roboto/900.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
