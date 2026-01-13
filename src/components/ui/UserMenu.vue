<!-- src/components/ui/UserMenu.vue -->
<template>
  <div class="relative" ref="menuRef">
    <!-- Trigger Button -->
    <button
      v-if="authStore.isAuthenticated"
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 transition-colors"
    >
      <img
        :src="authStore.userAvatar"
        :alt="authStore.userDisplayName"
        class="w-8 h-8 rounded-full ring-2 ring-primary-200"
      />
      <span class="hidden md:block font-semibold text-neutral-900">
        {{ authStore.userDisplayName }}
      </span>
      <ChevronDown :size="16" class="text-neutral-600" />
    </button>

    <!-- Login Button -->
    <button
      v-else
      @click="openAuthModal"
      class="flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors"
    >
      <LogIn :size="18" />
      <span>Đăng nhập</span>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div
        v-if="isOpen && authStore.isAuthenticated"
        class="absolute right-0 top-full mt-2 w-64 bg-white border-2 border-neutral-200 rounded-2xl shadow-2xl py-2 z-50"
      >
        <!-- User Info -->
        <div class="px-4 py-3 border-b border-neutral-200">
          <p class="font-bold text-neutral-900">{{ authStore.userDisplayName }}</p>
          <p class="text-sm text-neutral-600">{{ authStore.userEmail }}</p>
        </div>

        <!-- Menu Items -->
        <div class="py-2">
          <router-link
            to="/favorites"
            @click="isOpen = false"
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors"
          >
            <Heart :size="18" class="text-neutral-600" />
            <span class="text-neutral-900 font-medium">Món yêu thích</span>
            <span class="ml-auto bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">
              {{ favoritesStore.favoriteCount }}
            </span>
          </router-link>

          <router-link
            to="/my-recipes"
            @click="isOpen = false"
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors"
          >
            <ChefHat :size="18" class="text-neutral-600" />
            <span class="text-neutral-900 font-medium">Công thức của tôi</span>
          </router-link>

          <router-link
            to="/profile"
            @click="isOpen = false"
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors"
          >
            <User :size="18" class="text-neutral-600" />
            <span class="text-neutral-900 font-medium">Tài khoản</span>
          </router-link>
        </div>

        <!-- Logout -->
        <div class="border-t border-neutral-200 py-2">
          <button
            @click="handleSignOut"
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-error/10 transition-colors w-full text-left"
          >
            <LogOut :size="18" class="text-error" />
            <span class="text-error font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useFavoritesStore } from '../../stores/favoritesStore'
import { LogIn, LogOut, User, Heart, ChevronDown, ChefHat } from 'lucide-vue-next'

const emit = defineEmits(['open-auth-modal'])

const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const router = useRouter()

const isOpen = ref(false)
const menuRef = ref(null)

const openAuthModal = () => {
  emit('open-auth-modal')
}

const handleSignOut = async () => {
  isOpen.value = false
  await authStore.signOut()
  router.push('/')
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Load favorites khi user đã đăng nhập
  if (authStore.isAuthenticated) {
    favoritesStore.loadFavorites()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>