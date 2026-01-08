<template>
  <MainLayout>
    <div class="recipe-page">
      <!-- Loading State -->
      <LoadingSpinner 
        v-if="loading" 
        :full-screen="true"
        size="xl" 
        text="Đang tải công thức..."
      />

      <!-- Error State -->
      <div v-else-if="error" class="container mx-auto px-4 py-16">
        <div class="max-w-2xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-error/10 rounded-full mb-6">
            <svg class="w-10 h-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="heading-2 mb-4">Không tìm thấy công thức</h1>
          <p class="body-lg text-neutral-600 mb-8">{{ error }}</p>
          <BaseButton variant="primary" tag="router-link" to="/">
            Quay về trang chủ
          </BaseButton>
        </div>
      </div>

      <!-- Recipe Content -->
      <div v-else-if="recipe">
        <!-- Hero Image -->
        <section class="relative h-[400px] md:h-[500px] overflow-hidden">
          <img 
            :src="recipe.image" 
            :alt="recipe.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div class="absolute bottom-0 left-0 right-0 text-white p-8">
            <div class="container mx-auto">
              <h1 class="text-4xl md:text-5xl font-bold font-display mb-4">
                {{ recipe.name }}
              </h1>
              <p class="text-xl text-white/90 max-w-3xl">
                {{ recipe.description }}
              </p>
            </div>
          </div>
        </section>

        <!-- Recipe Info -->
        <section class="bg-white border-b border-neutral-200">
          <div class="container mx-auto px-4 py-8">
            <div class="flex flex-wrap items-center gap-8">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-neutral-600">Thời gian nấu</p>
                  <p class="font-semibold text-neutral-900">{{ recipe.cookTime }} phút</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-neutral-600">Khẩu phần</p>
                  <p class="font-semibold text-neutral-900">{{ recipe.servings }} người</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-neutral-600">Độ khó</p>
                  <p class="font-semibold text-neutral-900">{{ recipe.difficulty }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Why This Recipe -->
        <section class="bg-primary-50 py-12">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
              <h2 class="heading-3 mb-6 flex items-center gap-3">
                <span class="text-3xl">✨</span>
                Tại sao chúng tôi gợi ý món này?
              </h2>
              <ul class="space-y-4">
                <li 
                  v-for="(reason, index) in recipe.whyChosen" 
                  :key="index"
                  class="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft"
                >
                  <div class="w-8 h-8 bg-primary-400 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                    {{ index + 1 }}
                  </div>
                  <p class="text-neutral-700 text-lg pt-1">{{ reason }}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Ingredients & Steps -->
        <section class="py-12 md:py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              
              <!-- Ingredients -->
              <div>
                <h2 class="heading-3 mb-6">🛒 Nguyên liệu</h2>
                <BaseCard>
                  <ul class="space-y-3">
                    <li 
                      v-for="(ingredient, index) in recipe.ingredients" 
                      :key="index"
                      class="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
                    >
                      <span class="text-neutral-700">{{ ingredient.name }}</span>
                      <span class="font-semibold text-neutral-900">{{ ingredient.amount }}</span>
                    </li>
                  </ul>
                </BaseCard>

                <!-- Nutrition (if available) -->
                <div v-if="recipe.nutrition" class="mt-6">
                  <h3 class="text-xl font-semibold mb-4">📊 Dinh dưỡng (1 khẩu phần)</h3>
                  <BaseCard variant="bordered">
                    <div class="grid grid-cols-2 gap-4">
                      <div class="text-center p-4 bg-neutral-50 rounded-lg">
                        <p class="text-2xl font-bold text-primary-600">{{ recipe.nutrition.calories }}</p>
                        <p class="text-sm text-neutral-600">Calo</p>
                      </div>
                      <div class="text-center p-4 bg-neutral-50 rounded-lg">
                        <p class="text-2xl font-bold text-primary-400">{{ recipe.nutrition.protein }}g</p>
                        <p class="text-sm text-neutral-600">Protein</p>
                      </div>
                      <div class="text-center p-4 bg-neutral-50 rounded-lg">
                        <p class="text-2xl font-bold text-warning">{{ recipe.nutrition.carbs }}g</p>
                        <p class="text-sm text-neutral-600">Carbs</p>
                      </div>
                      <div class="text-center p-4 bg-neutral-50 rounded-lg">
                        <p class="text-2xl font-bold text-info">{{ recipe.nutrition.fat }}g</p>
                        <p class="text-sm text-neutral-600">Chất béo</p>
                      </div>
                    </div>
                  </BaseCard>
                </div>
              </div>

              <!-- Steps -->
              <div>
                <h2 class="heading-3 mb-6">👩‍🍳 Cách làm</h2>
                <div class="space-y-6">
                  <div 
                    v-for="(step, index) in recipe.steps" 
                    :key="index"
                    class="flex gap-4"
                  >
                    <div class="w-10 h-10 bg-primary-400 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      {{ index + 1 }}
                    </div>
                    <div class="flex-1 pt-2">
                      <p class="text-neutral-700 leading-relaxed">{{ step }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Actions -->
        <section class="bg-neutral-100 py-12">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="heading-3 mb-6">Bạn thích món này chứ? 😊</h2>
              <div class="flex flex-wrap justify-center gap-4">
                <BaseButton variant="primary" size="lg" tag="router-link" to="/">
                  Tìm món khác
                </BaseButton>
                <BaseButton variant="outline" size="lg" tag="router-link" to="/community">
                  Xem công thức cộng đồng
                </BaseButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import { useRecipe } from '../composables/useRecipe'

const route = useRoute()
const { recipe, loading, error, getRecipeById } = useRecipe()

onMounted(async () => {
  const recipeId = route.params.id
  await getRecipeById(recipeId)
})
</script>