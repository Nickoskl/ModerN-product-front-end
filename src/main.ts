import { createApp } from 'vue'
// import './style.css'
import { createPinia } from 'pinia'
import './assets/reset.css'
import './assets/globals.css'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.mount('#app')
