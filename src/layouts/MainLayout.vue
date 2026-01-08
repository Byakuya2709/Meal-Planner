<template>
  <div class="main-layout min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-soft sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link 
            to="/" 
            class="flex items-center gap-3 group"
          >
            <div class="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span class="text-xl font-display font-bold text-neutral-900">
              Tủ lạnh nhà bạn
            </span>
          </router-link>

          <!-- Navigation -->
          <ul class="hidden md:flex items-center gap-8">
            <li v-for="item in navItems" :key="item.path">
              <router-link
                :to="item.path"
                class="text-neutral-700 hover:text-primary-600 font-medium"
                active-class="text-primary-600"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-neutral-100"
            aria-label="Menu"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <!-- Mobile menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
          <ul class="flex flex-col gap-3">
            <li v-for="item in navItems" :key="item.path">
              <router-link
                :to="item.path"
                @click="closeMobileMenu"
                class="block py-2 px-4 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 font-medium"
                active-class="bg-primary-50 text-primary-600"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-neutral-300 mt-auto">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- About -->
          <div>
            <h3 class="text-white font-semibold mb-4">Về chúng tôi</h3>
            <p class="text-sm leading-relaxed">
              Giúp bạn tận dụng thực phẩm trong tủ lạnh, giảm lãng phí và bảo vệ môi trường.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white font-semibold mb-4">Liên kết</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="item in navItems" :key="item.path">
                <router-link 
                  :to="item.path" 
                  class="hover:text-primary-400"
                >
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Social -->
          <div>
            <h3 class="text-white font-semibold mb-4">Kết nối</h3>
            <p class="text-sm mb-4">
              Theo dõi chúng tôi để nhận thêm gợi ý nấu ăn
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors" aria-label="Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors" aria-label="Instagram">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {{ currentYear }} Tủ lạnh nhà bạn hôm nay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isMobileMenuOpen = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const navItems = [
  { path: '/', label: 'Trang chủ' },
  { path: '/community', label: 'Cộng đồng' },
  { path: '/impact', label: 'Tác động' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>