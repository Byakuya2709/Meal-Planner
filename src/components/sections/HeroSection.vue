<template>
  <section
    ref="heroRef"
    class="relative h-screen overflow-hidden bg-neutral-500 flex flex-col pt-20"
  >
    <!-- ===== ANIMATED BACKGROUND LAYERS ===== -->
    <div class="absolute inset-0">
      <!-- Gradient base -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-neutral-200/90 via-neutral-600 to-primary-700/30"
      ></div>

      <!-- Animated mesh gradient -->
      <div ref="meshBg" class="absolute inset-0 opacity-40">
        <div
          ref="blob1"
          class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-300/30 rounded-full blur-[120px] animate-float transition-all duration-700 ease-out"
        ></div>
        <div
          ref="blob2"
          class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-500/30 rounded-full blur-[100px] animate-float-delayed transition-all duration-700 ease-out"
        ></div>
        <div
          ref="blob3"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-warning/20 rounded-full blur-[80px] animate-pulse-slow transition-all duration-700 ease-out"
        ></div>
      </div>

      <!-- Noise texture -->
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30"
      ></div>
    </div>

    <!-- ===== FLOATING STATS - Random Positions ===== -->
    <div class="absolute inset-0 pointer-events-none z-10 mt-20">
   
   
      <!-- Stat 1 - Top Left -->
      <div
        ref="stat1"
        class="absolute top-[12%] left-[5%] lg:left-[8%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 lg:p-4 shadow-xl animate-float opacity-0 transition-opacity duration-700"
        style="animation-delay: 0s"
      >
        <div class="text-center space-y-1">
          <p class="text-2xl lg:text-4xl font-bold text-white">45K+</p>
          <p class="text-xs lg:text-sm text-neutral-300">Bữa ăn</p>
        </div>
      </div>

      <!-- Stat 2 - Top Right -->
      <div
        ref="stat2"
        class="absolute top-[20%] right-[5%] lg:right-[10%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 lg:p-4 shadow-xl animate-float-delayed opacity-0 transition-opacity duration-700"
        style="animation-delay: 1s"
      >
        <div class="text-center space-y-1">
          <p class="text-2xl lg:text-4xl font-bold text-white">23</p>
          <p class="text-xs lg:text-sm text-neutral-300">Tấn tiết kiệm</p>
        </div>
      </div>

      <!-- Stat 3 - Middle Left -->
      <div
        ref="stat3"
        class="absolute top-[42%] left-[3%] lg:left-[5%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 lg:p-4 shadow-xl animate-float opacity-0 transition-opacity duration-700"
        style="animation-delay: 2s"
      >
        <div class="text-center space-y-1">
          <p class="text-2xl lg:text-4xl font-bold text-white">3s</p>
          <p class="text-xs lg:text-sm text-neutral-300">Tìm món</p>
        </div>
      </div>
    </div>

    <!-- ===== MAIN CONTENT WRAPPER ===== -->
    <div
      class="relative flex-1 flex flex-col justify-center items-center px-4 py-6 lg:py-8"
    >
      <div class="container mx-auto max-w-7xl w-full">
        <!-- ===== TOP: HEADLINE SECTION ===== -->
        <div class="w-full text-center space-y-4 lg:space-y-6">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full opacity-0 animate-fade-in"
            style="animation-delay: 0.2s"
          >
            <div
              class="w-2 h-2 bg-primary-400 rounded-full animate-pulse"
            ></div>
            <span class="text-xs lg:text-sm font-medium text-white/90">
              🌱 Đang có 12,458 người dùng
            </span>
          </div>

          <!-- Headline -->
          <div class="space-y-2 lg:space-y-3">
            <h1
              ref="h1Line1"
              class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight opacity-0 animate-fade-in"
              style="animation-delay: 0.4s"
            >
              <span class="block text-white font-bangers tracking-wider">
                Tủ lạnh của bạn
              </span>

              <span
                class="font-meow tracking-wide block mt-2 lg:mt-4 pb-2 text-3xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent"
              >
                Hôm nay còn gì?
              </span>
            </h1>
          </div>

          <!-- Subheadline -->
          <p
            ref="subheadline"
            class="text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in"
            style="animation-delay: 0.6s"
          >
            Chọn
            <span class="text-primary-400 font-semibold">
              3-5 nguyên liệu
            </span>
            đang có, nhận gợi ý món nấu trong
            <span class="text-secondary-400 font-semibold"> 3 giây </span>.
            Không cần mua thêm, không lãng phí.
          </p>

          <!-- CTAs -->
        </div>

        <!-- ===== BOTTOM: BENTO GRID SHOWCASE WITH 3D PERSPECTIVE ===== -->
        <div class="w-full flex justify-center perspective-container">
          <div
            ref="mainDevice"
            class="relative max-w-sm w-full opacity-0 animate-scale-in-3d"
            style="animation-delay: 1s"
          >
            <!-- Glow effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-3xl blur-3xl transform-3d-base"
            ></div>

            <!-- Grid container with 3D transform -->
            <div
              class="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 lg:p-5 shadow-2xl transform-3d-base"
            >
              <!-- Bento Ingredient Grid -->
              <div class="grid grid-cols-4 gap-2 mb-3">
                <!-- Large item -->
                <div
                  class="col-span-2 row-span-2 group cursor-pointer bento-card"
                  style="animation-delay: 0.1s"
                >
                  <div class="bento-item h-full">
                    <span class="text-5xl lg:text-6xl">🍗</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="18" class="text-white" />
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-1 row-span-2 group cursor-pointer bento-card"
                  style="animation-delay: 0.2s"
                >
                  <div class="bento-item h-full">
                    <span class="text-4xl lg:text-5xl">🥕</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="16" class="text-white" />
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-1 group cursor-pointer bento-card"
                  style="animation-delay: 0.3s"
                >
                  <div class="bento-item aspect-square">
                    <span class="text-3xl">🥦</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="14" class="text-white" />
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-1 group cursor-pointer bento-card"
                  style="animation-delay: 0.4s"
                >
                  <div class="bento-item aspect-square">
                    <span class="text-3xl">🍅</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="14" class="text-white" />
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-1 group cursor-pointer bento-card"
                  style="animation-delay: 0.5s"
                >
                  <div class="bento-item aspect-square">
                    <span class="text-3xl">🧅</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="14" class="text-white" />
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-1 group cursor-pointer bento-card"
                  style="animation-delay: 0.6s"
                >
                  <div class="bento-item aspect-square">
                    <span class="text-3xl">🧄</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="14" class="text-white" />
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-2 group cursor-pointer bento-card"
                  style="animation-delay: 0.7s"
                >
                  <div class="bento-item aspect-[2/1]">
                    <span class="text-3xl">🌶️</span>
                    <div class="checkmark">
                      <CheckCircle2 :size="14" class="text-white" />
                    </div>
                  </div>
                </div>
              </div>
        <!-- Floating Cards -->
            <div class="hidden lg:block">
              <div
                ref="float1"
                class="absolute -top-6 -left-20 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl animate-float opacity-0"
                style="animation-delay: 1.8s"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-10 h-10 bg-success rounded-xl flex items-center justify-center"
                  >
                    <CheckCircle2 :size="18" class="text-white" />
                  </div>

                  <p class="text-sm font-semibold text-white whitespace-nowrap">
                    Đã tìm món!
                  </p>
                </div>
              </div>

              <div
                ref="float2"
                class="absolute -bottom-6 -right-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl animate-float-delayed opacity-0"
                style="animation-delay: 2s"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-10 h-10 bg-warning rounded-xl flex items-center justify-center"
                  >
                    <Clock :size="18" class="text-white" />
                  </div>

                  <div >
                    <p
                      class="text-sm font-semibold text-white whitespace-nowrap"
                    >
                      Chỉ 15 phút
                    </p>
                    <p class="text-xs text-neutral-400">Nhanh gọn</p>
                  </div>
                </div>
              </div>
            </div>
              <!-- Result Badge -->
              <div
                class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 opacity-0 animate-fade-in"
                style="animation-delay: 1.5s"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center"
                  >
                    <Sparkles :size="20" class="text-success animate-pulse" />
                  </div>

                  <div class="flex-1">
                    <div
                      class="h-2 bg-white/30 rounded-full w-3/4 mb-2 overflow-hidden"
                    >
                      <div
                        class="h-full bg-success rounded-full animate-progress"
                        style="width: 85%"
                      ></div>
                    </div>

                    <div
                      class="h-2 bg-white/30 rounded-full w-1/2 overflow-hidden"
                    >
                      <div
                        class="h-full bg-primary-400 rounded-full animate-progress"
                        style="width: 65%; animation-delay: 0.3s"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>


              
            </div>
          </div>
        </div>
      </div>
      <div
        ref="ctaButtons"
        class="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center opacity-0 animate-fade-in -mt-5"
        style="animation-delay: 0.8s"
      >
        <button
          @click="$emit('start')"
          class="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-sm lg:text-base shadow-2xl hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all duration-500 hover:scale-105 overflow-hidden"
        >
          <span
            class="relative z-10 flex items-center justify-center gap-2 lg:gap-3"
          >
            <Sparkles :size="20" class="animate-pulse" />
            <span>Bắt đầu ngay</span>
            <ArrowRight
              :size="20"
              class="group-hover:translate-x-2 transition-transform"
            />
          </span>

          <div
            class="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <div
            class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          ></div>
        </button>

        <button
          @click="$router.push('/impact')"
          class="group px-6 lg:px-8 py-3 lg:py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl font-semibold text-sm lg:text-base hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <PlayCircle :size="18" />
          <span>Xem video (30s)</span>
        </button>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <!-- <div
      ref="scrollIndicator"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce-subtle"
    >
      <span class="text-xs uppercase tracking-wider font-medium"
        >Cuộn xuống</span
      >
      <ChevronDown :size="10" />
    </div> -->

    <!-- Corner accents -->
    <div
      class="absolute top-0 left-0 w-24 h-24 lg:w-32 lg:h-32 border-l-2 border-t-2 border-white/10 rounded-tl-3xl"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-24 h-24 lg:w-32 lg:h-32 border-r-2 border-b-2 border-white/10 rounded-br-3xl"
    ></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useScrollAnimation } from "../../composables/useScrollAnimation";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
} from "lucide-vue-next";

defineEmits(["start"]);

const heroRef = ref(null);
const h1Line1 = ref(null);
const subheadline = ref(null);
const ctaButtons = ref(null);
const stat1 = ref(null);
const stat2 = ref(null);
const stat3 = ref(null);
const mainDevice = ref(null);
const float1 = ref(null);
const float2 = ref(null);
const meshBg = ref(null);
const scrollIndicator = ref(null);

const { parallax } = useScrollAnimation();

onMounted(() => {
  // Parallax effects
  if (meshBg.value) parallax(meshBg.value, 0.3);
  if (mainDevice.value) parallax(mainDevice.value, 0.15);
  if (float1.value) parallax(float1.value, 0.4);
  if (float2.value) parallax(float2.value, 0.5);

  // Parallax for floating stats
  if (stat1.value) {
    parallax(stat1.value, 0.2);
    setTimeout(() => stat1.value.classList.add("opacity-100"), 100);
  }
  if (stat2.value) {
    parallax(stat2.value, 0.35);
    setTimeout(() => stat2.value.classList.add("opacity-100"), 300);
  }
  if (stat3.value) {
    parallax(stat3.value, 0.25);
    setTimeout(() => stat3.value.classList.add("opacity-100"), 500);
  }

  // Show floating cards after delay
  if (float1.value) {
    setTimeout(() => float1.value.classList.add("opacity-100"), 1800);
  }
  if (float2.value) {
    setTimeout(() => float2.value.classList.add("opacity-100"), 2000);
  }
});
</script>

<style scoped>
/* ===== 3D PERSPECTIVE STYLES ===== */
.perspective-container {
  perspective: 55px;
  perspective-origin: center top;
}

.transform-3d-base {
  transform-style: preserve-3d;
  transform: rotateX(65deg) translateY(-20px);
  transition: transform 0.6s cubic-bezier(0.35, 1.56, 0.64, 1);
}

.transform-3d-base:hover {
  transform: rotateX(65deg) translateY(-25px) scale(1.2);
}

/* Bento Grid Styles */
.bento-item {
  @apply relative w-full bg-white rounded-xl lg:rounded-2xl shadow-md
         flex items-center justify-center
         transition-all duration-300
         hover:scale-105 hover:shadow-xl hover:-rotate-2
         overflow-hidden;
  transform-style: preserve-3d;
}

.bento-card {
  animation: bento-appear-3d 0.6s ease-out forwards;
  opacity: 0;
  transform: translateZ(-50px) scale(0.8);
}

.checkmark {
  @apply absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full 
         flex items-center justify-center opacity-0 
         transition-opacity duration-300;
}

.bento-item:hover .checkmark {
  @apply opacity-100;
}

/* Animations */
@keyframes bento-appear-3d {
  to {
    opacity: 1;
    transform: translateZ(0) scale(1);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in-3d {
  from {
    opacity: 0;
    transform: rotateX(25deg) translateY(-40px) scale(0.85);
  }
  to {
    opacity: 1;
    transform: rotateX(12deg) translateY(-20px) scale(1);
  }
}

@keyframes progress {
  from {
    width: 0;
  }
  to {
    width: inherit;
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-scale-in-3d {
  animation: scale-in-3d 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-progress {
  animation: progress 1.5s ease-out forwards;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>
