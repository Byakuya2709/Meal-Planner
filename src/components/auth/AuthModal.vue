<!-- src/components/auth/AuthModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- Close button -->
          <button
            @click="close"
            class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors z-10"
          >
            <X :size="20" class="text-neutral-600" />
          </button>

          <!-- Content -->
          <div class="p-8">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User :size="32" class="text-white" />
              </div>
              <h2 class="text-3xl font-bold text-neutral-900 mb-2">
                {{ mode === 'signin' ? 'Đăng nhập' : 'Đăng ký' }}
              </h2>
              <p class="text-neutral-600">
                {{ mode === 'signin' ? 'Chào mừng bạn quay lại!' : 'Tạo tài khoản mới' }}
              </p>
            </div>

            <!-- Sign In Form -->
            <form v-if="mode === 'signin'" @submit.prevent="handleSignIn" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  v-model="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              <div v-if="error" class="p-3 bg-error/10 border border-error/20 rounded-xl">
                <p class="text-sm text-error font-medium">{{ error }}</p>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
              </button>
            </form>

            <!-- Sign Up Form -->
            <form v-else @submit.prevent="handleSignUp" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Họ và tên
                </label>
                <input
                  v-model="fullName"
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  v-model="password"
                  type="password"
                  required
                  minlength="6"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              <div v-if="error" class="p-3 bg-error/10 border border-error/20 rounded-xl">
                <p class="text-sm text-error font-medium">{{ error }}</p>
              </div>

              <div v-if="successMessage" class="p-3 bg-success/10 border border-success/20 rounded-xl">
                <p class="text-sm text-success font-medium">{{ successMessage }}</p>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="flex items-center gap-4 my-6">
              <div class="flex-1 h-px bg-neutral-200"></div>
              <span class="text-sm text-neutral-500 font-medium">hoặc</span>
              <div class="flex-1 h-px bg-neutral-200"></div>
            </div>

            <!-- Google Sign In -->
            <button
              @click="handleGoogleSignIn"
              class="w-full py-3 border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="text-neutral-700">Tiếp tục với Google</span>
            </button>

            <!-- Toggle mode -->
            <div class="mt-6 text-center">
              <button
                @click="toggleMode"
                class="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                {{ mode === 'signin' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { User, X } from 'lucide-vue-next'
import { useAuth } from '../../composables/useAuth'

const props = defineProps({
  modelValue: Boolean,
  initialMode: {
    type: String,
    default: 'signin',
  },
})

const emit = defineEmits(['update:modelValue', 'success'])

const { signIn, signUp, signInWithGoogle, loading: authLoading } = useAuth()

const mode = ref(props.initialMode)
const email = ref('')
const password = ref('')
const fullName = ref('')
const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)

const close = () => {
  emit('update:modelValue', false)
  // Reset form
  email.value = ''
  password.value = ''
  fullName.value = ''
  error.value = null
  successMessage.value = null
}

const toggleMode = () => {
  mode.value = mode.value === 'signin' ? 'signup' : 'signin'
  error.value = null
  successMessage.value = null
}

const handleSignIn = async () => {
  loading.value = true
  error.value = null

  const response = await signIn(email.value, password.value)

  if (response.success) {
    emit('success', response.data)
    close()
  } else {
    error.value = response.error
  }

  loading.value = false
}

const handleSignUp = async () => {
  loading.value = true
  error.value = null
  successMessage.value = null

  const response = await signUp(email.value, password.value, fullName.value)

  if (response.success) {
    successMessage.value = response.message
    // Auto switch to sign in after 2s
    setTimeout(() => {
      mode.value = 'signin'
      successMessage.value = null
    }, 2000)
  } else {
    error.value = response.error
  }

  loading.value = false
}

const handleGoogleSignIn = async () => {
  await signInWithGoogle()
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>