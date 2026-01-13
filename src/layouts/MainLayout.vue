<!-- src/layouts/MainLayout.vue - CẬP NHẬT -->
<template>
  <div class="main-layout min-h-screen bg-neutral-50">
    <!-- Modern Navbar - Sticky with gradient transition -->
    <header ref="navbarEl" class="fixed top-0 left-0 right-0 z-50">
      <div
        :class="['transition-all duration-500', isScrolled ? 'py-0' : 'py-0']"
      >
        <div
          :class="[
            'container mx-auto px-4 transition-all duration-500',
            isScrolled ? 'max-w-7xl' : '',
          ]"
        >
          <nav
            :class="[
              'transition-all duration-500 shadow-lg',
              {
                'bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl px-6 py-3 shadow-lg':
                  isScrolled,
                'bg-transparent backdrop-blur-sm rounded-2xl px-6 py-4':
                  !isScrolled && route.path === '/',
                'bg-white/95 border border-neutral-200/50 rounded-2xl px-6 py-4':
                  !isScrolled && route.path !== '/',
              },
            ]"
          >
            <div class="flex items-center justify-between">
              <!-- Logo with animation -->
              <router-link
                to="/"
                class="flex items-center gap-3 group relative z-10"
              >
                <div class="relative">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md"
                  >
                    <ChefHat :size="20" class="text-white" />
                  </div>
                </div>
                <div class="sm:block">
                  <p
                    :class="[
                      'text-base font-bold transition-colors',
                      isScrolled
                        ? 'text-neutral-900'
                        : route.path === '/'
                        ? 'text-white'
                        : 'text-neutral-900',
                      'group-hover:text-primary-600',
                    ]"
                  >
                    Meal Planner
                  </p>
                  <p
                    :class="[
                      'text-xs transition-colors',
                      isScrolled
                        ? 'text-neutral-600'
                        : route.path === '/'
                        ? 'text-neutral-200'
                        : 'text-neutral-600',
                    ]"
                  >
                    Nấu gì hôm nay?
                  </p>
                </div>
              </router-link>

              <!-- Desktop Navigation -->
              <ul class="hidden md:flex items-center gap-2">
                <li v-for="item in navItems" :key="item.path">
                  <router-link
                    :to="item.path"
                    :class="[
                      'relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group flex items-center gap-2',
                      isScrolled
                        ? route.path === item.path
                          ? 'text-primary-600 font-semibold'
                          : 'text-neutral-700 hover:text-primary-600'
                        : route.path === '/'
                        ? route.path === item.path
                          ? 'text-white font-semibold'
                          : 'text-white/90 hover:text-white'
                        : route.path === item.path
                        ? 'text-primary-600 font-semibold'
                        : 'text-neutral-700 hover:text-primary-600',
                    ]"
                  >
                    <component :is="item.icon" :size="16" />
                    <span>{{ item.label }}</span>

                    <!-- Active/Hover background -->
                    <div
                      :class="[
                        'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10',
                        isScrolled
                          ? 'bg-primary-50'
                          : route.path === '/'
                          ? 'bg-white/10'
                          : 'bg-primary-50',
                        route.path === item.path && '!opacity-100',
                      ]"
                    ></div>
                  </router-link>
                </li>
              </ul>

              <!-- User Menu / Login Button - THAY CHO CTA -->
              <div class="hidden md:block">
                <!-- Logged In - User Menu -->
                <div v-if="authStore.isAuthenticated" class="relative" ref="userMenuRef">
                  <button
                    @click="isUserMenuOpen = !isUserMenuOpen"
                    :class="[
                      'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105',
                      isScrolled || route.path !== '/'
                        ? 'bg-primary-50 hover:bg-primary-100 border border-primary-200'
                        : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30',
                    ]"
                  >
                    <img
                      :src="authStore.userAvatar"
                      :alt="authStore.userDisplayName"
                      class="w-8 h-8 rounded-full ring-2 ring-primary-300"
                    />
                    <span
                      :class="[
                        'font-semibold hidden lg:block',
                        isScrolled || route.path !== '/'
                          ? 'text-neutral-900'
                          : 'text-white',
                      ]"
                    >
                      {{ authStore.userDisplayName }}
                    </span>
                    <ChevronDown
                      :size="16"
                      :class="[
                        'transition-transform',
                        isUserMenuOpen && 'rotate-180',
                        isScrolled || route.path !== '/'
                          ? 'text-neutral-600'
                          : 'text-white',
                      ]"
                    />
                  </button>

                  <!-- Dropdown Menu -->
                  <Transition name="dropdown">
                    <div
                      v-if="isUserMenuOpen"
                      class="absolute right-0 top-full mt-2 w-62 bg-white border-2 border-neutral-200 rounded-2xl shadow-2xl py-2 z-50"
                    >
                      <!-- User Info -->
                      <div class="px-4 py-3 border-b border-neutral-200">
                        <p class="font-bold text-neutral-900">
                          {{ authStore.userDisplayName }}
                        </p>
                        <p class="text-sm text-neutral-600">
                          {{ authStore.userEmail }}
                        </p>
                      </div>

                      <!-- Menu Items -->
                      <div class="py-2">
                        <router-link
                          to="/favorites"
                          @click="isUserMenuOpen = false"
                          class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors"
                        >
                          <Heart :size="18" class="text-neutral-600" />
                          <span class="text-neutral-900 font-medium"
                            >Món yêu thích</span
                          >
                          <span
                            class="ml-auto bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full"
                          >
                            {{ favoritesStore.favoriteCount }}
                          </span>
                        </router-link>

                        <router-link
                          to="/my-recipes"
                          @click="isUserMenuOpen = false"
                          class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors"
                        >
                          <ChefHat :size="18" class="text-neutral-600" />
                          <span class="text-neutral-900 font-medium"
                            >Công thức của tôi</span
                          >
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

                <!-- Not Logged In - Login Button -->
                <button
                  v-else
                  @click="showAuthModal = true"
                  :class="[
                    ' bg-gradient-to-r from-accent-500 to-accent-600 text-white group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden',

                  ]"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    <LogIn :size="16" />
                    <span>Đăng nhập</span>
                  </span>
                  <!-- Shimmer effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  ></div>
                </button>
              </div>

              <!-- Mobile menu button -->
              <button
                @click="toggleMobileMenu"
                :class="[
                  'md:hidden p-2 rounded-lg transition-colors',
                  isScrolled
                    ? 'hover:bg-neutral-100'
                    : route.path === '/'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-neutral-100',
                ]"
                aria-label="Menu"
              >
                <Menu
                  v-if="!isMobileMenuOpen"
                  :size="24"
                  :class="[
                    isScrolled
                      ? 'text-neutral-900'
                      : route.path === '/'
                      ? 'text-white'
                      : 'text-neutral-900',
                  ]"
                />
                <X
                  v-else
                  :size="24"
                  :class="[
                    isScrolled
                      ? 'text-neutral-900'
                      : route.path === '/'
                      ? 'text-white'
                      : 'text-neutral-900',
                  ]"
                />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden mx-4 bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-xl overflow-hidden"
        >
          <!-- Navigation Links -->
          <ul class="py-2">
            <li v-for="item in navItems" :key="item.path">
              <router-link
                :to="item.path"
                @click="toggleMobileMenu"
                :class="[
                  'flex items-center gap-3 px-6 py-3 transition-colors',
                  route.path === item.path
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50',
                ]"
              >
                <component :is="item.icon" :size="18" />
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>

          <!-- Mobile User Section -->
          <div class="border-t border-neutral-200">
            <!-- Logged In -->
            <div v-if="authStore.isAuthenticated">
              <!-- User Info Header -->
              <div class="px-6 py-4 bg-primary-50 border-b border-primary-100">
                <div class="flex items-center gap-3">
                  <img
                    :src="authStore.userAvatar"
                    :alt="authStore.userDisplayName"
                    class="w-12 h-12 rounded-full ring-2 ring-primary-300"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-neutral-900 truncate">
                      {{ authStore.userDisplayName }}
                    </p>
                    <p class="text-sm text-neutral-600 truncate">
                      {{ authStore.userEmail }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- User Menu Items -->
              <div class="py-2">
                <router-link
                  to="/favorites"
                  @click="toggleMobileMenu"
                  class="flex items-center gap-3 px-6 py-3 hover:bg-neutral-50 active:bg-primary-50 transition-colors"
                >
                  <div class="w-10 h-10 rounded-lg bg-error-50 flex items-center justify-center flex-shrink-0">
                    <Heart :size="18" class="text-error" />
                  </div>
                  <div class="flex-1">
                    <p class="text-neutral-900 font-medium">Món yêu thích</p>
                    <p class="text-xs text-neutral-600">Xem công thức đã lưu</p>
                  </div>
                  <span
                    class="bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full"
                  >
                    {{ favoritesStore.favoriteCount }}
                  </span>
                </router-link>

                <router-link
                  to="/my-recipes"
                  @click="toggleMobileMenu"
                  class="flex items-center gap-3 px-6 py-3 hover:bg-neutral-50 active:bg-primary-50 transition-colors"
                >
                  <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <ChefHat :size="18" class="text-primary-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-neutral-900 font-medium">Công thức của tôi</p>
                    <p class="text-xs text-neutral-600">Quản lý công thức riêng</p>
                  </div>
                </router-link>
              </div>

              <!-- Logout Button -->
              <div class="border-t border-neutral-200 p-4">
                <button
                  @click="handleSignOut"
                  class="flex items-center justify-center gap-3 w-full px-5 py-3 bg-error-50 hover:bg-error-100 active:bg-error-200 rounded-xl transition-colors"
                >
                  <LogOut :size="18" class="text-error" />
                  <span class="text-error font-semibold">Đăng xuất</span>
                </button>
              </div>
            </div>

            <!-- Not Logged In -->
            <div v-else class="p-4">
              <button
                @click="showAuthModalMobile"
                class="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold shadow-lg active:scale-95 transition-all"
              >
                <LogIn :size="18" />
                <span>Đăng nhập ngay</span>
              </button>
              <p class="text-center text-xs text-neutral-600 mt-3">
                Đăng nhập để lưu món yêu thích và tạo công thức
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="">
      <slot />
    </main>

    <!-- Footer giữ nguyên -->
    <footer class="bg-neutral-900 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <!-- Column 1 - About -->
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center"
                >
                  <ChefHat :size="20" class="text-white" />
                </div>
                <h3 class="font-bold text-lg">Meal Planner</h3>
              </div>
              <p class="text-neutral-400 text-sm leading-relaxed mb-4">
                Giảm lãng phí thực phẩm, nấu món ngon mỗi ngày với nguyên liệu có sẵn
                trong tủ lạnh.
              </p>
            </div>

            <!-- Column 2 - Quick Links -->
            <div>
              <h4 class="font-bold mb-4">Liên kết</h4>
              <ul class="space-y-2">
                <li>
                  <router-link
                    to="/"
                    class="text-neutral-400 hover:text-white transition-colors text-sm"
                    >Trang chủ</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/community"
                    class="text-neutral-400 hover:text-white transition-colors text-sm"
                    >Cộng đồng</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/impact"
                    class="text-neutral-400 hover:text-white transition-colors text-sm"
                    >Tác động</router-link
                  >
                </li>
              </ul>
            </div>

            <!-- Column 3 - Contact -->
            <div>
              <h4 class="font-bold mb-4">Liên hệ</h4>
              <ul class="space-y-2 text-sm text-neutral-400">
                <li>Email: hello@mealplanner.com</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>

            <!-- Column 4 - Social -->
            <div>
              <h4 class="font-bold mb-4">Theo dõi</h4>
              <div class="flex gap-3">
                <a
                  href="#"
                  class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-neutral-800 pt-8 text-center">
            <p class="text-neutral-400 text-sm">
              © 2026 Meal Planner. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Auth Modal -->
    <AuthModal v-model="showAuthModal" @success="handleAuthSuccess" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ChefHat,
  Menu,
  X,
  Home,
  Users,
  TrendingUp,
  LogIn,
  LogOut,
  Heart,
  ChevronDown,
} from 'lucide-vue-next'
import AuthModal from '../components/auth/AuthModal.vue'
import { useAuthStore } from '../stores/authStore'
import { useFavoritesStore } from '../stores/favoritesStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

const navbarEl = ref(null)
const userMenuRef = ref(null)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const showAuthModal = ref(false)

const navItems = [
  { path: '/', label: 'Trang chủ', icon: Home },
  { path: '/community', label: 'Cộng đồng', icon: Users },
  { path: '/impact', label: 'Tác động', icon: TrendingUp },
]

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Show auth modal on mobile
const showAuthModalMobile = () => {
  toggleMobileMenu()
  showAuthModal.value = true
}

// Handle sign out
const handleSignOut = async () => {
  isUserMenuOpen.value = false
  isMobileMenuOpen.value = false
  await authStore.signOut()
  router.push('/')
}

// Handle auth success
const handleAuthSuccess = async () => {
  await favoritesStore.loadFavorites()
}

// Click outside to close user menu (CHỈ DESKTOP)
const handleClickOutside = (event) => {
  // Bỏ qua nếu là mobile menu
  if (isMobileMenuOpen.value) return
  
  // Chỉ xử lý desktop user menu
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Sử dụng mousedown thay vì click để tốt hơn trên cả desktop và mobile
  document.addEventListener('mousedown', handleClickOutside)
  // Thêm touchstart cho mobile
  document.addEventListener('touchstart', handleClickOutside)
  handleScroll()

  // Load favorites nếu đã đăng nhập
  if (authStore.isAuthenticated) {
    favoritesStore.loadFavorites()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

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