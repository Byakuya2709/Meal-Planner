<template>
  <section ref="sectionEl" class="section-md bg-white relative">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100/30 blur-3xl pointer-events-none -z-10"></div>

    <div class="container-narrow relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16">
        <div 
          class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          :class="isVisible ? 'animate-slide-down' : 'opacity-0 translate-y-[-30px]'"
        >
          <Zap :size="16" />
          <span>Điểm khác biệt</span>
        </div>
        
        <h2 
          class="heading-2 mb-4"
          :class="isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-[30px]'"
          style="animation-delay: 0.1s"
        >
          Vì sao <span class="text-primary-600">khác biệt</span>?
        </h2>
        
        <p 
          class="body-lg text-neutral-600 max-w-2xl mx-auto"
          :class="isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-[30px]'"
          style="animation-delay: 0.2s"
        >
          Không phải công thức nấu ăn thông thường. Đây là giải pháp cho bài toán "Hôm nay nấu gì?"
        </p>
      </div>

      <!-- Feature cards with stagger -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group relative bg-white rounded-3xl p-8 border-2 border-neutral-100 hover:border-primary-200 transition-all duration-500 hover:shadow-float hover:-translate-y-2"
          :class="isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-[30px]'"
          :style="{ animationDelay: `${0.3 + index * 0.1}s` }"
        >
          <!-- Glow effect on hover -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- Icon -->
          <div class="relative mb-6">
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-500',
              'group-hover:scale-110 group-hover:rotate-3',
              feature.iconBg
            ]">
              <component :is="feature.icon" :size="28" :class="feature.iconColor" />
            </div>
            <!-- Icon decoration -->
            <div :class="[
              'absolute -top-1 -right-1 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm',
              feature.glowColor
            ]"></div>
          </div>

          <!-- Content -->
          <h3 class="heading-4 mb-3 group-hover:text-primary-600 transition-colors">
            {{ feature.title }}
          </h3>
          <p class="body-base text-neutral-600 leading-relaxed">
            {{ feature.description }}
          </p>

          <!-- Hover arrow -->
          <div class="mt-6 flex items-center gap-2 text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span class="text-sm">Tìm hiểu thêm</span>
            <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Target, Zap, RefreshCw, ArrowRight } from 'lucide-vue-next'

const sectionEl = ref(null)
const isVisible = ref(false)

// Sử dụng Intersection Observer thủ công để tránh dependency @vueuse
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          // Chỉ trigger 1 lần, sau đó disconnect
          observer.disconnect()
        }
      })
    },
    {
      threshold: 0.2, // Trigger khi 20% section visible
      rootMargin: '0px' // Không offset
    }
  )

  if (sectionEl.value) {
    observer.observe(sectionEl.value)
  }

  // Cleanup
  onUnmounted(() => {
    observer.disconnect()
  })
})

const features = [
  {
    icon: Target,
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-600',
    glowColor: 'bg-primary-400',
    title: 'Chỉ 1 món duy nhất',
    description: 'Không rối loạn với 10-20 gợi ý. Chúng tôi chọn món PHÙ HỢP NHẤT với nguyên liệu bạn có.'
  },
  {
    icon: Zap,
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    glowColor: 'bg-warning',
    title: 'Không cần mua thêm',
    description: 'Tối đa chỉ thiếu 1 nguyên liệu phụ. Nấu ngay với những gì trong tủ lạnh.'
  },
  {
    icon: RefreshCw,
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    glowColor: 'bg-success',
    title: 'Giảm lãng phí',
    description: 'Mỗi bữa ăn là một bước giảm food waste. Tiết kiệm tiền, bảo vệ môi trường.'
  }
]
</script>