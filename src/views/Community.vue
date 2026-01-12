<!-- Community.vue - Cập nhật phần card -->
<template>
  <MainLayout>
    <div class="community-page bg-neutral-50 min-h-screen">
      <!-- Hero Section - Nền sáng -->
      <section class="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-20 border-b border-neutral-200">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Cộng đồng chia sẻ công thức 👨‍🍳
            </h1>
            <p class="text-lg md:text-xl text-neutral-700 mb-8 leading-relaxed">
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
              <p class="text-3xl font-bold text-primary-500 mb-1">5,678</p>
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
              <h2 class="text-2xl md:text-3xl font-bold text-neutral-900">Công thức nổi bật</h2>
              <div class="flex gap-3">
                <select class="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
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
              <div class="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-2xl mb-4">
                <svg class="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-error font-medium text-lg">{{ error }}</p>
            </div>

            <!-- Recipes List -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="recipe in recipes" 
                :key="recipe._id"
                class="group bg-white rounded-2xl border border-neutral-200 shadow-card hover:shadow-float overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                @click="goToRecipe(recipe._id)"
              >
                <!-- Image - Cố định tỷ lệ -->
                <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img 
                    :src="recipe.image_url" 
                    :alt="recipe.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <!-- Time badge -->
                  <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                    <span class="text-sm font-bold text-neutral-800">⏱️ {{ recipe.time_minutes }}p</span>
                  </div>
                  
                  <!-- Difficulty badge - Max 5 -->
                  <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                    <div class="flex items-center gap-1">
                      <div 
                        v-for="n in 5" 
                        :key="n"
                        class="w-1.5 h-1.5 rounded-full"
                        :class="n <= recipe.difficulty_score ? 'bg-warning' : 'bg-neutral-300'"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Content - Nền trắng, tách biệt -->
                <div class="p-5 bg-white">
                  <h3 class="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {{ recipe.title }}
                  </h3>

                  <!-- Author -->
                  <div class="flex items-center gap-3 mb-4" v-if="recipe.author">
                    <img 
                      :src="recipe.author.avatar" 
                      :alt="recipe.author.name"
                      class="w-8 h-8 rounded-full ring-2 ring-primary-100"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-neutral-900 truncate">{{ recipe.author.name }}</p>
                      <p class="text-xs text-neutral-500">{{ formatDate(recipe.created_at) }}</p>
                    </div>
                  </div>

                  <!-- Tags - Giữ nguyên -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span 
                      v-for="tag in recipe.tags.slice(0, 3)" 
                      :key="tag"
                      class="text-xs px-2.5 py-1 bg-primary-50 border border-primary-200 text-primary-700 rounded-full font-medium"
                    >
                      #{{ tag }}
                    </span>
                    <span 
                      v-if="recipe.tags.length > 3"
                      class="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full font-medium"
                    >
                      +{{ recipe.tags.length - 3 }}
                    </span>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <button
                      @click.stop="handleVote(recipe._id)"
                      class="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span class="text-sm font-semibold">{{ recipe.likeCount }}</span>
                    </button>

                    <div class="flex items-center gap-2 text-primary-600 font-semibold text-sm">
                      <span>Xem chi tiết</span>
                      <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import { useCommunity } from '../composables/useCommunity'
import { ingredients } from '../services/mockData'

const router = useRouter()
const { recipes, loading, error, fetchRecipes, voteRecipe } = useCommunity()

onMounted(() => {
  fetchRecipes()
})

const getIngredientName = (id) => {
  const ingredient = ingredients.find(i => i.id === id)
  return ingredient ? ingredient.name : id
}

const formatDate = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
  
  if (diff === 0) return 'Hôm nay'
  if (diff === 1) return 'Hôm qua'
  if (diff < 7) return `${diff} ngày trước`
  if (diff < 30) return `${Math.floor(diff / 7)} tuần trước`
  return `${Math.floor(diff / 30)} tháng trước`
}

const handleVote = async (recipeId) => {
  await voteRecipe(recipeId)
}

const goToRecipe = (recipeId) => {
  router.push(`/recipe/${recipeId}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>