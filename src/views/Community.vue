<template>
  <MainLayout>
    <div class="community-page">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 md:py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="heading-1 mb-6">
              Cộng đồng chia sẻ công thức 👨‍🍳
            </h1>
            <p class="body-lg text-neutral-600 mb-8">
              Khám phá và học hỏi từ những công thức nấu ăn của cộng đồng người dùng
            </p>

            <div class="flex flex-wrap justify-center gap-4">
              <BaseButton variant="primary" size="lg">
                Chia sẻ công thức của bạn
              </BaseButton>
              <BaseButton variant="outline" size="lg">
                Công thức đã lưu
              </BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="border-b border-neutral-200 bg-white">
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-600 mb-1">1,234</p>
              <p class="text-sm text-neutral-600">Công thức</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-400 mb-1">5,678</p>
              <p class="text-sm text-neutral-600">Thành viên</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-success mb-1">12.5K</p>
              <p class="text-sm text-neutral-600">Lượt thích</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-warning mb-1">3.2K</p>
              <p class="text-sm text-neutral-600">Chia sẻ</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Recipes Grid -->
      <section class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            
            <!-- Filters -->
            <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 class="heading-3">Công thức nổi bật</h2>
              <div class="flex gap-3">
                <select class="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Mới nhất</option>
                  <option>Nhiều vote nhất</option>
                  <option>Dễ làm nhất</option>
                </select>
              </div>
            </div>

            <!-- Loading State -->
            <LoadingSpinner 
              v-if="loading" 
              size="lg" 
              text="Đang tải công thức..."
            />

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
              <p class="text-error font-medium">{{ error }}</p>
            </div>

            <!-- Recipes List -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BaseCard 
                v-for="recipe in recipes" 
                :key="recipe.id"
                no-padding
                hoverable
                class="community-recipe-card"
              >
                <!-- Image -->
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img 
                    :src="recipe.image" 
                    :alt="recipe.name"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div class="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 shadow-sm">
                    <span class="text-sm font-medium">⏱️ {{ recipe.cookTime }}p</span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-5">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-3">
                    {{ recipe.name }}
                  </h3>

                  <!-- Author -->
                  <div class="flex items-center gap-3 mb-4">
                    <img 
                      :src="recipe.authorAvatar" 
                      :alt="recipe.author"
                      class="w-8 h-8 rounded-full"
                    />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-neutral-900">{{ recipe.author }}</p>
                      <p class="text-xs text-neutral-500">{{ formatDate(recipe.createdAt) }}</p>
                    </div>
                  </div>

                  <!-- Ingredients preview -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span 
                      v-for="ingredientId in recipe.ingredients.slice(0, 4)" 
                      :key="ingredientId"
                      class="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md"
                    >
                      {{ getIngredientName(ingredientId) }}
                    </span>
                    <span 
                      v-if="recipe.ingredients.length > 4"
                      class="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md"
                    >
                      +{{ recipe.ingredients.length - 4 }}
                    </span>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <button
                      @click="handleVote(recipe.id)"
                      class="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span class="text-sm font-medium">{{ recipe.votes }}</span>
                    </button>

                    <BaseButton variant="ghost" size="sm">
                      Xem chi tiết
                    </BaseButton>
                  </div>
                </div>
              </BaseCard>
            </div>

            <!-- Load More -->
            <div v-if="recipes.length > 0" class="text-center mt-12">
              <BaseButton variant="outline" size="lg">
                Xem thêm công thức
              </BaseButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import { useCommunity } from '../composables/useCommunity'
import { ingredients } from '../services/mockData'

const { recipes, loading, error, fetchRecipes, voteRecipe } = useCommunity()

onMounted(() => {
  fetchRecipes(12)
})

const getIngredientName = (id) => {
  const ingredient = ingredients.find(i => i.id === id)
  return ingredient?.name || id
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return 'Hôm qua'
  if (diffDays < 7) return `${diffDays} ngày trước`
  
  return date.toLocaleDateString('vi-VN')
}

const handleVote = async (recipeId) => {
  await voteRecipe(recipeId)
}
</script>