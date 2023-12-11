import './assets/main.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-900.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
