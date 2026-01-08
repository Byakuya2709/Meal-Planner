<template>
  <section ref="heroRef" class="relative min-h-screen overflow-hidden bg-neutral-500 flex items-center pt-5">
    
    <!-- ===== ANIMATED BACKGROUND LAYERS ===== -->
    <div class="absolute inset-0">
      <!-- Gradient base -->
      <div class="absolute inset-0 bg-gradient-to-br from-neutral-200/90 via-neutral-600 to-primary-700/30"></div>
      
      <!-- Animated mesh gradient -->
      <div ref="meshBg" class="absolute inset-0 opacity-40">
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-300/30 rounded-full blur-[120px] animate-float"></div>
        <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-500/30 rounded-full blur-[100px] animate-float-delayed"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-warning/20 rounded-full blur-[80px] animate-pulse-slow"></div>
      </div>

      <!-- Noise texture -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30"></div>
      
      <!-- Grid overlay -->
      <!-- <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div> -->
    </div>

    <!-- ===== MAIN CONTENT - ASYMMETRIC LAYOUT ===== -->
    <div class="relative container mx-auto px-4 py-20 lg:py-24">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
        
        <!-- LEFT: Content (7 columns) -->
        <div class="lg:col-span-7 space-y-6 lg:space-y-8" v-motion-slide-visible-once-left>
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <div class="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-white/90">🌱 Đang có 12,458 người dùng</span>
          </div>

          <!-- Headline -->
          <div class="space-y-3">
            <h1 ref="h1Line1" class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight">
              <span class="block text-white xl:text-9xl">Tủ lạnh</span>
              <span class="inline-block text-white xl:text-9xl translate-x-60">của bạn</span>
              <span class="block mt-5 xl:text-7xl pb-2block bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent">
                Hôm nay còn gì?
              </span>
            </h1>
          </div>

          <!-- Subheadline -->
          <p ref="subheadline" class="text-lg md:text-xl lg:text-2xl text-neutral-300 leading-relaxed max-w-2xl">
            Chọn <span class="text-primary-400 font-semibold">3-5 nguyên liệu</span> đang có, 
            nhận gợi ý món nấu trong <span class="text-secondary-400 font-semibold">3 giây</span>. 
            Không cần mua thêm, không lãng phí.
          </p>

          <!-- CTAs -->
          <div ref="ctaButtons" class="flex flex-col sm:flex-row gap-4">
            <button
              @click="$emit('start')"
              class="group relative px-8 py-4 lg:py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-base lg:text-lg shadow-2xl hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <span class="relative z-10 flex items-center justify-center gap-3">
                <Sparkles :size="22" class="animate-pulse" />
                <span>Bắt đầu ngay</span>
                <ArrowRight :size="22" class="group-hover:translate-x-2 transition-transform" />
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </button>

            <button
              @click="$router.push('/impact')"
              class="group px-8 py-4 lg:py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl font-semibold text-base lg:text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <PlayCircle :size="20" />
              <span>Xem video (30s)</span>
            </button>
          </div>

          <!-- Stats -->
          <div ref="statsEl" class="grid grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8 border-t border-white/10">
            <div class="space-y-1">
              <p class="text-2xl lg:text-3xl font-bold text-white">45K+</p>
              <p class="text-xs lg:text-sm text-neutral-400">Bữa ăn</p>
            </div>
            <div class="space-y-1">
              <p class="text-2xl lg:text-3xl font-bold text-white">23</p>
              <p class="text-xs lg:text-sm text-neutral-400">Tấn tiết kiệm</p>
            </div>
            <div class="space-y-1">
              <p class="text-2xl lg:text-3xl font-bold text-white">3s</p>
              <p class="text-xs lg:text-sm text-neutral-400">Tìm món</p>
            </div>
          </div>
        </div>

        <!-- RIGHT: Visual (5 columns) - REDESIGNED -->
        <div class="lg:col-span-5 relative mt-12 lg:mt-0" v-motion-slide-visible-once-right>
          
          <!-- 3D Bento Grid Layout -->
          <div ref="mainDevice" class="relative">
            <!-- Main visual container -->
            <div class="relative max-w-md mx-auto">
              <!-- Glow effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/40 to-secondary-500/40 rounded-3xl blur-3xl"></div>
              
              <!-- Grid container -->
              <div class="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 lg:p-8 shadow-2xl">
  

                <!-- Bento Grid - Ingredient Cards -->
                <div class="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                  <div 
                    v-for="(item, i) in ingredients" 
                    :key="i"
                    :class="[
                      'relative group cursor-pointer transition-all duration-300',
                      item.size === 'large' ? 'col-span-2 row-span-2' : ''
                    ]"
                  >
                    <div class="relative aspect-square bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group-hover:scale-105 group-hover:-rotate-2">
                      <!-- Emoji -->
                      <div class="absolute inset-0 flex items-center justify-center">
                        <span :class="[
                          'transition-all duration-300 group-hover:scale-110',
                          item.size === 'large' ? 'text-6xl' : 'text-3xl lg:text-4xl'
                        ]">
                          {{ item.emoji }}
                        </span>
                      </div>
                      <!-- Checkmark on hover -->
                      <div class="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 :size="14" class="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Result Badge -->
                <div class="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                      <Sparkles :size="20" class="text-success" />
                    </div>
                    <div class="flex-1">
                      <div class="h-2 bg-white/20 rounded-full w-3/4 mb-2"></div>
                      <div class="h-2 bg-white/20 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         <div ref="floatingElements">
            <!-- Floating card 1 - Parallax slow -->
            <div 
              ref="float1"
              class="absolute -top-8 -left-12 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl  animate-float"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-success rounded-xl flex items-center justify-center">
                  <CheckCircle2 :size="20" class="text-white" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">Đã tìm món!</p>
                </div>
              </div>
            </div>

            <!-- Floating card 2 - Parallax medium -->
            <div 
              ref="float2"
              class="absolute -bottom-8 -right-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-warning rounded-xl flex items-center justify-center">
                  <Clock :size="20" class="text-white" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">Chỉ 15 phút</p>
                  <p class="text-xs text-neutral-400">Nhanh gọn</p>
                </div>
              </div>
            </div>

            <!-- Floating emoji - Parallax fast
            <div ref="float3" class="absolute top-1/4 -right-1 text-6xl animate-float">
              🍳
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div 
      ref="scrollIndicator"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce-subtle"
    >
      <span class="text-xs uppercase tracking-wider font-medium">Cuộn xuống</span>
      <ChevronDown :size="10" />
    </div>

    <!-- Corner accents -->
    <div class="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white/10 rounded-tl-3xl"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/10 rounded-br-3xl"></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle,
  CheckCircle2,
  Clock,
  ChevronDown
} from 'lucide-vue-next'

defineEmits(['start'])

const heroRef = ref(null)
const h1Line1 = ref(null)
const subheadline = ref(null)
const ctaButtons = ref(null)
const statsEl = ref(null)
const mainDevice = ref(null)
const float1 = ref(null)
const float2 = ref(null)
const meshBg = ref(null)
const scrollIndicator = ref(null)

const { parallax, fadeInUp, scaleIn } = useScrollAnimation()

const ingredients = [
  { emoji: '🥕', size: 'normal' },
  { emoji: '🍗', size: 'large' }, // Large item
  { emoji: '🥦', size: 'normal' },
  { emoji: '🍅', size: 'normal' },
  { emoji: '🧅', size: 'normal' },
  { emoji: '🧅', size: 'normal' },
]

onMounted(() => {
  // Parallax effects
  if (meshBg.value) parallax(meshBg.value, 0.3)
  if (mainDevice.value) parallax(mainDevice.value, 0.15)
  if (float1.value) parallax(float1.value, 0.4)
  if (float2.value) parallax(float2.value, 0.5)
  if (statsEl.value) parallax(statsEl.value, 0.6)



  // Fade in animations
  if (h1Line1.value) fadeInUp(h1Line1.value, 0)
  if (subheadline.value) fadeInUp(subheadline.value, 0.2)
  if (ctaButtons.value) fadeInUp(ctaButtons.value, 0.4)
  if (mainDevice.value) scaleIn(mainDevice.value, 0.3)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>