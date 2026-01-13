// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { MotionPlugin } from '@vueuse/motion'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './styles/toast.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Pinia setup
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Toast setup với custom options
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true
}

app.use(pinia)
app.use(router)
app.use(MotionPlugin)
app.use(Toast, toastOptions)

app.mount('#app')