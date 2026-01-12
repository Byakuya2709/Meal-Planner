<!-- Recipe.vue - Tuân thủ quy tắc 60-30-10 -->
<template>
  <MainLayout>
    <div class="recipe-page bg-neutral-50 min-h-screen">
      <!-- Loading State -->
      <LoadingSpinner
        v-if="loading"
        :full-screen="true"
        size="xl"
        text="Đang tải công thức..."
      />

      <!-- Error State -->
      <div
        v-else-if="error"
        class="min-h-screen flex items-center justify-center bg-white"
      >
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-2xl mx-auto text-center">
            <div
              class="inline-flex items-center justify-center w-24 h-24 bg-error/10 border border-error/20 rounded-3xl mb-6"
            >
              <AlertCircle :size="48" class="text-error" />
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Không tìm thấy công thức
            </h1>
            <p class="text-xl text-neutral-600 mb-8">{{ error }}</p>
            <button
              @click="$router.push('/')"
              class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Home :size="20" />
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>

      <!-- Recipe Content -->
      <div v-else-if="recipe" class="recipe-content">
        <!-- Hero Section - 60% Secondary background -->
        <section
          class="relative bg-secondary-50 border-b border-secondary-200 pt-[80px] lg:pt-[90px]"
        >
          <div class="container mx-auto px-4 py-8 md:py-12">
            <div class="max-w-6xl mx-auto">
              <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <!-- Image Column -->
                <div class="order-2 md:order-1">
                  <div
                    class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-neutral-100 border-2 border-primary-200"
                  >
                    <img
                      :src="recipe.image_url"
                      :alt="recipe.title"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <!-- Content Column - 30% Primary colors -->
                <div class="order-1 md:order-2">
                  <!-- Badge - Primary -->
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-300 rounded-full mb-4"
                  >
                    <Sparkles :size="16" class="text-primary-600" />
                    <span class="text-sm font-semibold text-primary-700">
                      Gợi ý hoàn hảo
                    </span>
                  </div>

                  <!-- Title -->
                  <h1
                    class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight"
                  >
                    {{ recipe.title }}
                  </h1>

                  <!-- Description -->
                  <p
                    class="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6"
                  >
                    {{ recipe.description }}
                  </p>

                  <!-- Tags -->
                  <div
                    v-if="recipe.tags && recipe.tags.length > 0"
                    class="flex flex-wrap gap-2 mb-6"
                  >
                    <span
                      v-for="tag in recipe.tags"
                      :key="tag"
                      class="px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold rounded-full"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Meta Info Cards - Primary color -->
                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div
                      class="bg-primary-50 border border-primary-200 rounded-xl p-4 hover:border-primary-400 hover:bg-primary-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <Clock :size="16" class="text-primary-600" />
                        <p class="text-xs font-semibold text-primary-700">Thời gian</p>
                      </div>
                      <p class="text-lg font-bold text-primary-900">
                        {{ recipe.time_minutes }} phút
                      </p>
                    </div>

                    <div
                      class="bg-secondary-50 border border-secondary-200 rounded-xl p-4 hover:border-secondary-400 hover:bg-secondary-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <ChefHat :size="16" class="text-secondary-600" />
                        <p class="text-xs font-semibold text-secondary-700">Độ khó</p>
                      </div>
                      <p class="text-lg font-bold text-secondary-900">
                        {{ getDifficultyText(recipe.difficulty_score) }}
                      </p>
                    </div>

                    <div
                      class="bg-primary-50 border border-primary-200 rounded-xl p-4 hover:border-primary-400 hover:bg-primary-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <Users :size="16" class="text-primary-600" />
                        <p class="text-xs font-semibold text-primary-700 ">Khẩu phần</p>
                      </div>
                      <p class="text-lg font-bold text-primary-900 text-center">
                        {{ recipe.nutrition_facts?.serving_size || '2-3 người' }}
                      </p>
                    </div>

                    <div
                      class="bg-accent-50 border border-accent-200 rounded-xl p-4 hover:border-accent-400 hover:bg-accent-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <Flame :size="16" class="text-accent-600" />
                        <p class="text-xs font-semibold text-accent-700">Calories</p>
                      </div>
                      <p class="text-lg font-bold text-accent-900">
                        {{ recipe.nutrition_facts?.calories || 'N/A' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Main Content Section - 60% Secondary background -->
        <section class="relative bg-gradient-to-b from-secondary-50 via-secondary-100/50 to-white py-16 md:py-24">
          <!-- Decorative elements -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              class="absolute top-1/4 -left-20 w-64 h-64 bg-primary-200/20 rounded-full blur-[120px]"
            ></div>
            <div
              class="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary-200/20 rounded-full blur-[120px]"
            ></div>
          </div>

          <div class="relative container mx-auto px-4">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-[1fr,400px] gap-12">
              <!-- Left Column: Ingredients & Instructions -->
              <div class="space-y-12">
                <!-- Ingredients Section - Primary color -->
                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <ShoppingCart :size="24" class="text-white" />
                    </div>
                    <div>
                      <h2 class="heading-2 text-neutral-900">Nguyên liệu</h2>
                      <p class="text-neutral-600">
                        {{ recipe.ingredients_list?.length || 0 }} nguyên liệu
                      </p>
                    </div>
                  </div>

                  <!-- Ingredients List -->
                  <div
                    class="bg-white border-2 border-primary-100 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm"
                  >
                    <div
                      v-for="(ingredient, index) in recipe.ingredients_list"
                      :key="index"
                      class="flex items-center justify-between py-4 border-b border-neutral-200 last:border-0 group hover:bg-primary-50 px-4 rounded-xl transition-all duration-300"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center font-bold text-primary-700 group-hover:scale-110 transition-transform"
                        >
                          {{ index + 1 }}
                        </div>
                        <span class="font-medium text-neutral-900">
                          {{ ingredient }}
                        </span>
                      </div>
                      <CheckCircle2 :size="20" class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <!-- Seasoning - Accent color -->
                  <div v-if="recipe.seasoning && recipe.seasoning.length > 0">
                    
                    <h3
                      class="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2"
                    >
                    
                      <span class="text-accent-500">🧂</span>
                      Gia vị
                    </h3>
                    <div
                      class="bg-accent-50 border-2 border-accent-200 rounded-2xl p-6 space-y-3"
                    >
                      <div
                        v-for="(item, index) in recipe.seasoning"
                        :key="index"
                        class="flex items-center gap-3"
                      >
                        <div class="w-2 h-2 bg-accent-500 rounded-full"></div>
                        <span class="text-neutral-800">{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Instructions Section - Secondary color -->
                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <ChefHat :size="24" class="text-white" />
                    </div>
                    <div>
                      <h2 class="heading-2 text-neutral-900">Cách làm</h2>
                      <p class="text-neutral-600">{{ recipe.instructions?.length || 0 }} bước</p>
                    </div>
                  </div>

                  <!-- Steps -->
                  <div class="space-y-6">
                    <div
                      v-for="(step, index) in recipe.instructions"
                      :key="index"
                      class="flex gap-6 group"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="w-12 h-12  bg-secondary-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md"
                        >
                          {{ index + 1 }}
                        </div>
                      </div>
                      <div
                        class="flex-1 bg-white border-2 border-secondary-100 rounded-2xl p-6 group-hover:border-secondary-300 group-hover:shadow-lg transition-all duration-300"
                      >
                        <p class="text-neutral-800 leading-relaxed">{{ step }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Nutrition & Tags - Primary -->
              <div class="space-y-8 lg:sticky lg:top-24 lg:self-start">
                <!-- Nutrition Facts -->
                <div
                  v-if="recipe.nutrition_facts"
                  class="bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center"
                    >
                      <Flame :size="24" class="text-white" />
                    </div>
                    <h3 class="text-2xl font-bold text-neutral-900">Dinh dưỡng</h3>
                  </div>

                  <div class="space-y-4">
                    <!-- Calories - Large -->
                    <div
                      class="bg-white border-2 border-primary-300 rounded-2xl p-6 text-center shadow-sm"
                    >
                      <p class="text-5xl font-bold text-accent-500 mb-1">
                        {{ recipe.nutrition_facts.calories || 0 }}
                      </p>
                      <p class="text-sm font-semibold text-neutral-600">Calories</p>
                    </div>

                    <!-- Other nutrients -->
                    <div class="grid grid-cols-2 gap-4">
                      <div class="bg-white border border-primary-200 rounded-xl p-4 text-center">
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.protein_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">Protein</p>
                      </div>
                      <div class="bg-white border border-primary-200 rounded-xl p-4 text-center">
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.carbohydrates_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">Carbs</p>
                      </div>
                      <div class="bg-white border border-primary-200 rounded-xl p-4 text-center">
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.fat_total_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">Chất béo</p>
                      </div>
                      <div class="bg-white border border-primary-200 rounded-xl p-4 text-center">
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.fiber_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">Chất xơ</p>
                      </div>
                    </div>

                    <div class="text-xs text-neutral-500 text-center pt-2 font-medium">
                      * Giá trị dinh dưỡng/khẩu phần
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div
                  v-if="recipe.tags && recipe.tags.length > 0"
                  class="bg-white border-2 border-neutral-200 rounded-3xl p-6 space-y-4 shadow-sm"
                >
                  <h3
                    class="text-xl font-bold text-neutral-900 flex items-center gap-2"
                  >
                    <Tag :size="20" class="text-primary-600" />
                    Thẻ tag
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in recipe.tags"
                      :key="tag"
                      class="px-4 py-2 bg-primary-50 border-2 border-primary-200 text-primary-700 text-sm font-semibold rounded-full hover:bg-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Share Section - Accent button -->
                <div
                  class="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-3xl p-6 space-y-4 shadow-sm"
                >
                  <h3
                    class="text-xl font-bold text-neutral-900 flex items-center gap-2"
                  >
                    <Share2 :size="20" class="text-primary-600" />
                    Chia sẻ công thức
                  </h3>
                  <p class="text-neutral-700 text-sm font-medium">
                    Bạn thích món này? Chia sẻ với bạn bè nhé!
                  </p>
                  <button
                    class="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Heart :size="18" />
                    Yêu thích
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section - 10% Accent for main CTA -->
        <section
          class="relative bg-gradient-to-b from-neutral-900 to-black py-16 md:py-20 overflow-hidden"
        >
          <!-- Decorative background -->
          <div class="absolute inset-0">
            <div
              class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[150px]"
            ></div>
            <div
              class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[150px]"
            ></div>
          </div>

          <div class="relative container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center space-y-8">
              <div
                class="inline-flex items-center justify-center w-20 h-20 bg-primary-500/20 backdrop-blur-md border border-primary-400/30 rounded-3xl mb-4"
              >
                <Sparkles :size="40" class="text-primary-300" />
              </div>

              <h2 class="text-4xl md:text-5xl font-bold text-white">
                Bạn thích món này chứ? 😊
              </h2>

              <p class="text-xl text-neutral-300 max-w-2xl mx-auto">
                Hãy thử nấu món này ngay hôm nay hoặc khám phá thêm nhiều công
                thức tuyệt vời khác!
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <!-- 10% Accent: CTA button chính -->
                <button
                  @click="$router.push('/')"
                  class="group px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[0_0_50px_rgba(251,146,60,0.5)] transition-all duration-500 hover:scale-105 overflow-hidden relative"
                >
                  <span
                    class="relative z-10 flex items-center justify-center gap-3"
                  >
                    <Sparkles :size="20" class="animate-pulse" />
                    <span>Tìm món khác</span>
                    <ArrowRight
                      :size="20"
                      class="group-hover:translate-x-2 transition-transform"
                    />
                  </span>
                  <div
                    class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  ></div>
                </button>

                <button
                  @click="$router.push('/community')"
                  class="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Users :size="20" />
                  <span>Cộng đồng</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import { useRecipe } from "../composables/useRecipe";
import { useScrollAnimation } from "../composables/useScrollAnimation";
import {
  Sparkles,
  Clock,
  ChefHat,
  Flame,
  Heart,
  ShoppingCart,
  CheckCircle2,
  Tag,
  Share2,
  ArrowRight,
  Users,
  Home,
  AlertCircle,
} from "lucide-vue-next";

const route = useRoute();
const { recipe, loading, error, getRecipeById } = useRecipe();
const { parallax } = useScrollAnimation();

const heroSection = ref(null);
const parallaxBg = ref(null);

// Helper function để chuyển difficulty_score thành text
const getDifficultyText = (score) => {
  if (score === 1) return 'Dễ';
  if (score === 2) return 'Trung bình';
  if (score === 3) return 'Khó';
  return 'Dễ';
};

onMounted(async () => {
  const recipeId = route.params.id;
  await getRecipeById(recipeId);

  // Setup parallax effect for background
  if (parallaxBg.value) {
    parallax(parallaxBg.value, 0.5);
  }
});
</script>

<style scoped>
/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
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

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>