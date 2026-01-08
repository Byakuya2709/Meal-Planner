import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin, {
  directives: {
    'slide-visible-once-left': {
      initial: {
        opacity: 0,
        x: -100,
      },
      visibleOnce: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 800,
          ease: 'easeOut',
        },
      },
    },
    'slide-visible-once-right': {
      initial: {
        opacity: 0,
        x: 100,
      },
      visibleOnce: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 800,
          ease: 'easeOut',
          delay: 200,
        },
      },
    },
  },
})

app.mount('#app')