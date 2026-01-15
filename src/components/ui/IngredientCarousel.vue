<template>
  <div class="ingredient-carousel relative">
    <!-- Navigation Buttons -->
    <button
      v-if="showNavigation && canScrollLeft"
      @click="scrollLeft"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 -ml-5"
      aria-label="Cuộn sang trái"
    >
      <svg class="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Carousel Container with Touch Support -->
    <div
      ref="carouselContainer"
      class="overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
      @scroll="updateScrollState"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
    >
      <div class="flex gap-4 pt-2">
        <slot />
      </div>
    </div>

    <button
      v-if="showNavigation && canScrollRight"
      @click="scrollRight"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 -mr-5"
      aria-label="Cuộn sang phải"
    >
      <svg class="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Scroll Indicators (dots) -->
    <div v-if="showIndicators && totalPages > 1" class="flex justify-center gap-2 mt-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="scrollToPage(page - 1)"
        :class="[
          'w-2 h-2 rounded-full transition-all duration-200',
          currentPage === page - 1
            ? 'bg-primary-600 w-6'
            : 'bg-neutral-300 hover:bg-primary-300'
        ]"
        :aria-label="`Đến trang ${page}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  showNavigation: {
    type: Boolean,
    default: true
  },
  showIndicators: {
    type: Boolean,
    default: false
  }
})

const carouselContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const currentPage = ref(0)
const totalPages = ref(1)

// Touch/Mouse drag state
const isDragging = ref(false)
const startX = ref(0)
const scrollLeftStart = ref(0)
const velocity = ref(0)
const lastX = ref(0)
const lastTime = ref(0)

const updateScrollState = () => {
  if (!carouselContainer.value) return

  const { scrollLeft, scrollWidth, clientWidth } = carouselContainer.value
  
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10
  
  // Calculate current page
  const pageWidth = clientWidth
  currentPage.value = Math.round(scrollLeft / pageWidth)
  totalPages.value = Math.ceil(scrollWidth / pageWidth)
}

const scrollLeft = () => {
  if (!carouselContainer.value) return
  const scrollAmount = carouselContainer.value.clientWidth * 0.8
  carouselContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

const scrollRight = () => {
  if (!carouselContainer.value) return
  const scrollAmount = carouselContainer.value.clientWidth * 0.8
  carouselContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

const scrollToPage = (pageIndex) => {
  if (!carouselContainer.value) return
  const pageWidth = carouselContainer.value.clientWidth
  carouselContainer.value.scrollTo({ left: pageWidth * pageIndex, behavior: 'smooth' })
}

// ===== TOUCH GESTURES =====
const handleTouchStart = (e) => {
  if (!carouselContainer.value) return
  
  isDragging.value = true
  startX.value = e.touches[0].pageX
  scrollLeftStart.value = carouselContainer.value.scrollLeft
  lastX.value = e.touches[0].pageX
  lastTime.value = Date.now()
  velocity.value = 0
  
  // Remove smooth scrolling during drag
  carouselContainer.value.style.scrollBehavior = 'auto'
}

const handleTouchMove = (e) => {
  if (!isDragging.value || !carouselContainer.value) return
  
  e.preventDefault()
  
  const currentX = e.touches[0].pageX
  const currentTime = Date.now()
  const deltaX = startX.value - currentX
  const deltaTime = currentTime - lastTime.value
  
  // Calculate velocity for momentum scrolling
  if (deltaTime > 0) {
    velocity.value = (currentX - lastX.value) / deltaTime
  }
  
  carouselContainer.value.scrollLeft = scrollLeftStart.value + deltaX
  
  lastX.value = currentX
  lastTime.value = currentTime
}

const handleTouchEnd = () => {
  if (!isDragging.value || !carouselContainer.value) return
  
  isDragging.value = false
  
  // Apply momentum scrolling
  const momentumDistance = velocity.value * 300 // Adjust multiplier for momentum strength
  const targetScroll = carouselContainer.value.scrollLeft - momentumDistance
  
  // Re-enable smooth scrolling
  carouselContainer.value.style.scrollBehavior = 'smooth'
  
  // Apply momentum with bounds checking
  const maxScroll = carouselContainer.value.scrollWidth - carouselContainer.value.clientWidth
  const boundedScroll = Math.max(0, Math.min(targetScroll, maxScroll))
  
  carouselContainer.value.scrollLeft = boundedScroll
}

// ===== MOUSE DRAG (Desktop) =====
const handleMouseDown = (e) => {
  if (!carouselContainer.value) return
  
  isDragging.value = true
  startX.value = e.pageX
  scrollLeftStart.value = carouselContainer.value.scrollLeft
  lastX.value = e.pageX
  lastTime.value = Date.now()
  velocity.value = 0
  
  carouselContainer.value.style.scrollBehavior = 'auto'
  
  // Prevent text selection during drag
  e.preventDefault()
}

const handleMouseMove = (e) => {
  if (!isDragging.value || !carouselContainer.value) return
  
  e.preventDefault()
  
  const currentX = e.pageX
  const currentTime = Date.now()
  const deltaX = startX.value - currentX
  const deltaTime = currentTime - lastTime.value
  
  if (deltaTime > 0) {
    velocity.value = (currentX - lastX.value) / deltaTime
  }
  
  carouselContainer.value.scrollLeft = scrollLeftStart.value + deltaX
  
  lastX.value = currentX
  lastTime.value = currentTime
}

const handleMouseUp = () => {
  if (!isDragging.value || !carouselContainer.value) return
  
  isDragging.value = false
  
  // Apply momentum
  const momentumDistance = velocity.value * 200
  const targetScroll = carouselContainer.value.scrollLeft - momentumDistance
  
  carouselContainer.value.style.scrollBehavior = 'smooth'
  
  const maxScroll = carouselContainer.value.scrollWidth - carouselContainer.value.clientWidth
  const boundedScroll = Math.max(0, Math.min(targetScroll, maxScroll))
  
  carouselContainer.value.scrollLeft = boundedScroll
}

const handleMouseLeave = () => {
  if (isDragging.value) {
    handleMouseUp()
  }
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('resize', updateScrollState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScrollState)
})
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Prevent text selection during drag */
.cursor-grabbing * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Smooth transitions */
.ingredient-carousel {
  touch-action: pan-y pinch-zoom;
}
</style>