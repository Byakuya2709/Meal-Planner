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
import { supabase } from './services/supabaseClient'

// BƯỚC 1: Kiểm tra session TRƯỚC KHI khởi tạo Pinia
// Để tránh Pinia persist restore data cũ khi không có session hợp lệ
const checkAndCleanStorage = async () => {
  if (!supabase) return

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Không có session hợp lệ → xóa tất cả data cũ
      console.log('[Main] No valid session - cleaning up storage')
      localStorage.removeItem('auth-storage')
      localStorage.removeItem('favorites-storage')
      localStorage.removeItem('likes-storage')
    } else {
      console.log('[Main] Valid session found:', session.user.email)
    }
  } catch (error) {
    console.error('[Main] Session check error:', error)
    // Nếu có lỗi, xóa hết để an toàn
    localStorage.removeItem('auth-storage')
    localStorage.removeItem('favorites-storage')
    localStorage.removeItem('likes-storage')
  }
}

// Chạy cleanup ĐỒNG BỘ trước khi khởi tạo app
await checkAndCleanStorage()

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