<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-[90vh] flex items-center">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      <!-- Floating orbs -->
      <div class="absolute top-20 left-[10%] w-96 h-96 bg-primary-300/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-[10%] w-96 h-96 bg-secondary-300/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50"></div>
    </div>

    <div class="relative container-wide py-16">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left: Content with stagger animation -->
        <div ref="contentEl" class="text-center lg:text-left space-y-8">
          <!-- Badge with shine effect -->
          <div 
            v-if="isVisible"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold border border-primary-200/50 shadow-sm animate-slide-down"
          >
            <Sparkles :size="18" class="animate-pulse" />
            <span>Giảm lãng phí, nấu ăn thông minh</span>
          </div>

          <!-- Main headline with gradient -->
          <h1 
            v-if="isVisible"
            class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none animate-slide-up"
            style="animation-delay: 0.1s"
          >
            <span class="block mb-3">Tủ lạnh nhà bạn</span>
            <span class="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              hôm nay có gì?
            </span>
          </h1>

          <!-- Subheadline -->
          <p 
            v-if="isVisible"
            class="text-xl md:text-2xl text-neutral-700 leading-relaxed max-w-2xl animate-slide-up"
            style="animation-delay: 0.2s"
          >
            Chọn 3-5 nguyên liệu đang có, nhận gợi ý món nấu ngay.
            <span class="font-semibold text-primary-600">Không cần mua thêm</span>, không lãng phí, 
            <span class="font-semibold text-secondary-600">15 phút có bữa cơm</span>.
          </p>

          <!-- CTA Buttons -->
          <div 
            v-if="isVisible"
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up"
            style="animation-delay: 0.3s"
          >
            <button
              @click="$emit('start')"
              class="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span class="relative z-10 flex items-center gap-2 justify-center">
                <Rocket :size="20" />
                <span>Bắt đầu chọn nguyên liệu</span>
                <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
              </span>
              <!-- Shimmer effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </button>

            <button
              @click="$router.push('/impact')"
              class="px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-700 rounded-2xl font-semibold text-lg shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Info :size="20" />
              <span>Tìm hiểu thêm</span>
            </button>
          </div>

          <!-- Trust indicators with icons -->
          <div 
            v-if="isVisible"
            class="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-neutral-600 animate-fade-in"
            style="animation-delay: 0.4s"
          >
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
              <Star :size="16" class="text-warning fill-warning" />
              <span><strong class="text-neutral-900">12.458</strong> người dùng</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
              <CheckCircle2 :size="16" class="text-success" />
              <span><strong class="text-neutral-900">45.678</strong> bữa ăn</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
              <TrendingUp :size="16" class="text-primary-600" />
              <span><strong class="text-neutral-900">23 tấn</strong> tiết kiệm</span>
            </div>
          </div>
        </div>

        <!-- Right: Interactive 3D-like Visual -->
        <div 
          v-if="isVisible"
          class="relative hidden lg:block animate-scale-in"
          style="animation-delay: 0.2s"
        >
          <div class="relative aspect-square max-w-xl mx-auto">
            <!-- Main card with glass effect -->
            <div class="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-float border border-white/50 p-8 hover:shadow-glow-lg transition-all duration-500">
              <!-- Ingredient grid with hover effects -->
              <div class="grid grid-cols-3 gap-4">
                <div 
                  v-for="(emoji, index) in ingredients" 
                  :key="index"
                  class="aspect-square bg-gradient-to-br from-primary-100/80 to-secondary-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg border border-white/50"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                >
                  {{ emoji }}
                </div>
              </div>

              <!-- Floating success badge -->
              <div class="absolute -top-6 -right-6 bg-gradient-to-r from-success to-primary-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg animate-bounce-subtle border-2 border-white">
                <div class="flex items-center gap-2">
                  <Sparkles :size="16" />
                  <span>Tìm món trong 3s</span>
                </div>
              </div>

              <!-- Stats badge -->
              <div class="absolute -bottom-4 -left-4 bg-white px-5 py-3 rounded-2xl shadow-float border border-neutral-200/50">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <ChefHat :size="20" class="text-primary-600" />
                  </div>
                  <div class="text-left">
                    <p class="text-xs text-neutral-600">Công thức</p>
                    <p class="text-lg font-bold text-neutral-900">1,234+</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div class="absolute -top-8 -left-8 w-20 h-20 bg-primary-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
            <div class="absolute -bottom-8 -right-8 w-20 h-20 bg-secondary-400/20 rounded-full blur-2xl animate-pulse-slow" style="animation-delay: 1s"></div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div 
        v-if="isVisible"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle"
        style="animation-delay: 0.5s"
      >
        <div class="flex flex-col items-center gap-2 text-neutral-500">
          <span class="text-xs font-medium uppercase tracking-wider">Khám phá</span>
          <ChevronDown :size="24" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { 
  Sparkles, 
  Rocket, 
  ArrowRight, 
  Info, 
  Star, 
  CheckCircle2, 
  TrendingUp,
  ChefHat,
  ChevronDown
} from 'lucide-vue-next'

defineEmits(['start'])

const contentEl = ref(null)
const isVisible = useElementVisibility(contentEl)

const ingredients = ['🥕', '🥦', '🍅', '🧅', '🥔', '🍗', '🥚', '🧄', '🌶️']
</script>