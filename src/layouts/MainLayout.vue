<template>
  <div class="main-layout min-h-screen bg-neutral-50">
    <!-- Modern Navbar - Sticky with gradient transition -->
    <header ref="navbarEl" class="fixed top-0 left-0 right-0 z-50">
      <div
        :class="['transition-all duration-500', isScrolled ? 'py-3' : 'py-4']"
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
                // Khi scroll → nền trắng mờ, backdrop blur
                'bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl px-6 py-3 shadow-lg':
                  isScrolled,

                // Trang chủ khi chưa scroll
                'bg-neutral-700 rounded-2xl sm:bg-neutral lg:bg-transparent px-6 py-4': !isScrolled,
                // Các trang khác khi chưa scroll
                // 'bg-neutral-700 px-6 py-4 rounded-2xl lg:bg-gradient-to-br lg:from-neutral-200 lg:via-neutral-400/70 lg:to-primary-400/50':
                //   route.path !== '/' && !isScrolled,
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
                    class="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-200 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative w-10 h-10 bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md"
                  >
                    <ChefHat :size="20" class="text-white" />
                  </div>
                </div>
                <div class="hidden sm:block">
                  <p
                    :class="[
                      'text-base font-bold transition-colors',
                      isScrolled
                        ? 'text-neutral-900'
                        : 'text-neutral-900 font-black drop-shadow-lg',
                      'group-hover:text-primary-600',
                    ]"
                  >
                    Tủ lạnh nhà bạn
                  </p>
                  <p
                    :class="[
                      'text-xs transition-colors',
                      isScrolled
                        ? 'text-neutral-600'
                        : 'text-neutral-800/90 drop-shadow-md',
                    ]"
                  >
                    Nấu gì hôm nay?
                  </p>
                </div>
              </router-link>

              <!-- Desktop Navigation - CONTRAST ENHANCED -->
              <ul class="hidden md:flex items-center gap-2">
                <li v-for="item in navItems" :key="item.path">
                  <router-link
                    :to="item.path"
                    :class="[
                      'relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group flex items-center gap-2',
                      isScrolled
                        ? route.path === item.path
                          ? 'text-primary-600 font-semibold'
                          : 'text-neutral-800 hover:text-primary-600'
                        : route.path === '/' &&  route.path === item.path
                        ? 'text-primary-900/70 font-black text-text drop-shadow-lg'
                        : route.path === '/' &&  route.path !== item.path
                        ? 'text-white text-text drop-shadow-lg'
                        : route.path === item.path && route.path !== '/'
                        ? 'text-primary-900/70 font-black drop-shadow-lg'
                        : 'text-black/95 hover:text-text drop-shadow-md',
                    ]"
                  >
                    <component :is="item.icon" :size="16" />
                    <span>{{ item.label }}</span>

                    <!-- Active/Hover background -->
                    <div
                      :class="[
                        'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10',
                        isScrolled ? 'bg-primary-50' : 'bg-white/15',
                        route.path === item.path && '!opacity-100',
                        route.path === '/' && '!bg-primary-50',
                        route.path !== '/' && '!bg-primary-100',
                      ]"
                    ></div>
                  </router-link>
                </li>
              </ul>

              <!-- CTA Button -->
              <div class="hidden md:block">
                <router-link
                  to="/"
                  class="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    <Sparkles :size="16" />
                    <span>Tìm món ngay</span>
                  </span>
                  <!-- Shimmer effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  ></div>
                </router-link>
              </div>

              <!-- Mobile menu button -->
              <button
                @click="toggleMobileMenu"
                :class="[
                  'md:hidden p-2 rounded-lg transition-colors',
                  isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/15',
                ]"
                aria-label="Menu"
              >
                <Menu
                  v-if="!isMobileMenuOpen"
                  :size="24"
                  :class="
                    isScrolled
                      ? 'text-neutral-800'
                      : 'text-white drop-shadow-lg'
                  "
                />
                <X
                  v-else
                  :size="24"
                  :class="
                    isScrolled
                      ? 'text-neutral-800'
                      : 'text-white drop-shadow-lg'
                  "
                />
              </button>
            </div>

            <!-- Mobile menu with slide animation -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-4"
            >
              <div
                v-if="isMobileMenuOpen"
                :class="[
                  'md:hidden mt-4 pb-4 pt-4',
                  isScrolled
                    ? 'border-t border-neutral-200'
                    : 'border-t border-white/20',
                ]"
              >
                <ul class="flex flex-col gap-2">
                  <li v-for="item in navItems" :key="item.path">
                    <router-link
                      :to="item.path"
                      @click="closeMobileMenu"
                      :class="[
                        'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all',
                        isScrolled
                          ? route.path === item.path
                            ? 'bg-primary-50 text-primary-600 font-semibold'
                            : 'text-neutral-800 hover:bg-primary-50 hover:text-primary-600'
                          : route.path === item.path
                          ? 'bg-white/15 text-white font-semibold'
                          : 'text-white/95 hover:bg-white/15 hover:text-white',
                      ]"
                    >
                      <component :is="item.icon" :size="18" />
                      {{ item.label }}
                    </router-link>
                  </li>
                </ul>
                <!-- Mobile CTA -->
                <router-link
                  to="/"
                  @click="closeMobileMenu"
                  class="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Sparkles :size="18" />
                  <span>Tìm món ngay</span>
                </router-link>
              </div>
            </Transition>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content với padding-top để không bị nav che -->
    <main>
      <slot />
    </main>

    <!-- Footer - Modern & Clean -->
    <footer
      class="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-300 mt-auto overflow-hidden"
    >
      <!-- Decorative elements -->
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-200/5 rounded-full blur-3xl"
      ></div>

      <div class="relative container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl flex items-center justify-center shadow-lg"
              >
                <ChefHat :size="24" class="text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Tủ lạnh nhà bạn</h3>
                <p class="text-sm text-neutral-400">Nấu gì hôm nay?</p>
              </div>
            </div>
            <p class="text-neutral-400 leading-relaxed max-w-md">
              Giúp bạn tận dụng thực phẩm trong tủ lạnh, giảm lãng phí và bảo vệ
              môi trường. Mỗi bữa ăn là một hành động ý nghĩa.
            </p>
            <!-- Social links -->
            <div class="flex gap-3 mt-6">
              <a
                v-for="social in socials"
                :key="social.name"
                href="#"
                class="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                :aria-label="social.name"
              >
                <component :is="social.icon" :size="18" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-white font-semibold mb-4 flex items-center gap-2">
              <Compass :size="18" />
              <span>Khám phá</span>
            </h4>
            <ul class="space-y-3">
              <li v-for="item in navItems" :key="item.path">
                <router-link
                  :to="item.path"
                  class="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight
                    :size="14"
                    class="group-hover:translate-x-1 transition-transform"
                  />
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white font-semibold mb-4 flex items-center gap-2">
              <Mail :size="18" />
              <span>Liên hệ</span>
            </h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-2 text-neutral-400">
                <Mail :size="16" class="mt-0.5 flex-shrink-0" />
                <span>hello@tulanhcuaban.com</span>
              </li>
              <li class="flex items-start gap-2 text-neutral-400">
                <Phone :size="16" class="mt-0.5 flex-shrink-0" />
                <span>1900 xxxx</span>
              </li>
              <li class="flex items-start gap-2 text-neutral-400">
                <MapPin :size="16" class="mt-0.5 flex-shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div
          class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-neutral-500">
            &copy; {{ currentYear }} Tủ lạnh nhà bạn. Made with 💚 in Vietnam
          </p>
          <div class="flex gap-6 text-sm text-neutral-500">
            <a href="#" class="hover:text-primary-400 transition-colors"
              >Điều khoản</a
            >
            <a href="#" class="hover:text-primary-400 transition-colors"
              >Bảo mật</a
            >
            <a href="#" class="hover:text-primary-400 transition-colors"
              >Cookies</a
            >
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to top button -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition-all duration-300"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary-300 to-primary-400 text-white rounded-full shadow-float hover:shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 group"
        aria-label="Back to top"
      >
        <ArrowUp
          :size="20"
          class="group-hover:-translate-y-1 transition-transform"
        />
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useScroll } from "@vueuse/core";
import {
  ChefHat,
  Menu,
  X,
  Sparkles,
  Home,
  Users,
  TrendingUp,
  Compass,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUp,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-vue-next";

const route = useRoute();
const navbarEl = ref(null);
const isMobileMenuOpen = ref(false);
const { y } = useScroll(window);

const isScrolled = computed(() => y.value > 50);
const showBackToTop = computed(() => y.value > 500);
const currentYear = computed(() => new Date().getFullYear());

const navItems = [
  { path: "/", label: "Trang chủ", icon: Home },
  { path: "/community", label: "Cộng đồng", icon: Users },
  { path: "/impact", label: "Tác động", icon: TrendingUp },
];

const socials = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "Twitter", icon: Twitter },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Close mobile menu on escape
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") closeMobileMenu();
  };
  window.addEventListener("keydown", handleEscape);
  onUnmounted(() => window.removeEventListener("keydown", handleEscape));
});
</script>
