<template>
  <MainLayout>
    <div class="home-page">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-24">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="heading-1 mb-6">
              Tủ lạnh nhà bạn hôm nay có gì? 🧊
            </h1>
            <p class="body-lg text-neutral-600 mb-8">
              Chọn 3-5 nguyên liệu bạn đang có, chúng tôi sẽ gợi ý món nấu ngay - 
              Không cần mua thêm, giảm lãng phí thực phẩm
            </p>

            <!-- Selection Counter -->
            <div class="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-card">
              <div class="flex items-center gap-2">
                <div 
                  v-for="n in 5" 
                  :key="n"
                  :class="[
                    'w-3 h-3 rounded-full transition-all duration-200',
                    n <= selectedCount ? 'bg-primary-600 scale-110' : 'bg-neutral-200'
                  ]"
                />
              </div>
              <span class="text-neutral-700 font-medium">
                {{ selectedCount }}/5 nguyên liệu
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Ingredients Selection -->
      <section class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            
            <!-- Loading State -->
            <LoadingSpinner 
              v-if="loading" 
              size="lg" 
              text="Đang tải nguyên liệu..."
            />

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mb-4">
                <svg class="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-error font-medium">{{ error }}</p>
            </div>

            <!-- Ingredients Grid -->
            <div v-else>
              <!-- Category: Protein -->
              <div class="mb-12">
                <h2 class="heading-3 mb-6 flex items-center gap-3">
                  <span class="text-3xl">🥩</span>
                  Protein
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <IngredientCard
                    v-for="ingredient in getByCategory('protein')"
                    :key="ingredient.id"
                    :ingredient="ingredient"
                    :selected="isSelected(ingredient.id)"
                    @click="handleIngredientClick(ingredient)"
                  />
                </div>
              </div>

              <!-- Category: Vegetables -->
              <div class="mb-12">
                <h2 class="heading-3 mb-6 flex items-center gap-3">
                  <span class="text-3xl">🥬</span>
                  Rau củ
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <IngredientCard
                    v-for="ingredient in getByCategory('vegetable')"
                    :key="ingredient.id"
                    :ingredient="ingredient"
                    :selected="isSelected(ingredient.id)"
                    @click="handleIngredientClick(ingredient)"
                  />
                </div>
              </div>

              <!-- Category: Carbs -->
              <div class="mb-12">
                <h2 class="heading-3 mb-6 flex items-center gap-3">
                  <span class="text-3xl">🍚</span>
                  Tinh bột
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <IngredientCard
                    v-for="ingredient in getByCategory('carb')"
                    :key="ingredient.id"
                    :ingredient="ingredient"
                    :selected="isSelected(ingredient.id)"
                    @click="handleIngredientClick(ingredient)"
                  />
                </div>
              </div>

              <!-- Category: Dairy -->
              <div class="mb-12">
                <h2 class="heading-3 mb-6 flex items-center gap-3">
                  <span class="text-3xl">🥛</span>
                  Sữa & Phô mai
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <IngredientCard
                    v-for="ingredient in getByCategory('dairy')"
                    :key="ingredient.id"
                    :ingredient="ingredient"
                    :selected="isSelected(ingredient.id)"
                    @click="handleIngredientClick(ingredient)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section 
        v-if="selectedCount > 0"
        class="sticky bottom-0 bg-white border-t border-neutral-200 shadow-float py-6 z-40"
      >
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-center sm:text-left">
              <p class="font-semibold text-neutral-900">
                Đã chọn {{ selectedCount }} nguyên liệu
              </p>
              <p class="text-sm text-neutral-600">
                {{ canSubmit ? 'Sẵn sàng tìm món!' : `Chọn thêm ${3 - selectedCount} nguyên liệu nữa` }}
              </p>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              <BaseButton
                variant="ghost"
                size="md"
                @click="clearSelection"
              >
                Xóa tất cả
              </BaseButton>
              
              <BaseButton
                variant="primary"
                size="lg"
                :disabled="!canSubmit"
                :loading="findingRecipe"
                @click="handleFindRecipe"
                full-width
                class="sm:w-auto min-w-[200px]"
              >
                {{ findingRecipe ? 'Đang tìm...' : 'Gợi ý món nấu ngay' }}
              </BaseButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import IngredientCard from '../components/features/IngredientCard.vue'
import { useIngredients } from '../composables/useIngredients'
import { useRecipe } from '../composables/useRecipe'

const router = useRouter()

const {
  ingredients,
  selectedIngredients,
  loading,
  error,
  selectedCount,
  canSubmit,
  fetchIngredients,
  toggleIngredient,
  isSelected,
  clearSelection,
  getByCategory
} = useIngredients()

const { findRecipe } = useRecipe()
const findingRecipe = ref(false)

onMounted(() => {
  fetchIngredients()
})

const handleIngredientClick = (ingredient) => {
  if (!isSelected(ingredient.id) && selectedCount.value >= 5) {
    // Show toast notification (sẽ implement sau)
    alert('Bạn chỉ có thể chọn tối đa 5 nguyên liệu')
    return
  }
  
  toggleIngredient(ingredient)
}

const handleFindRecipe = async () => {
  if (!canSubmit.value) return

  findingRecipe.value = true
  
  try {
    const ingredientIds = selectedIngredients.value.map(i => i.id)
    const recipe = await findRecipe(ingredientIds)
    
    if (recipe) {
      // Navigate to recipe page
      router.push(`/recipe/${recipe.id}`)
    }
  } catch (err) {
    alert('Không thể tìm món phù hợp. Vui lòng thử lại!')
  } finally {
    findingRecipe.value = false
  }
}
</script>