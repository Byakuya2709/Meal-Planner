<!-- src/components/features/RecipeSelectionModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="handleClose"
      >
        <div class="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          
          <!-- Header - Compact hơn -->
          <div class="relative bg-gradient-to-r from-primary-500 to-accent-500 px-4 md:px-6 py-3 md:py-4">
            <button
              @click="handleClose"
              class="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-9 md:h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X :size="16" class="md:hidden" />
              <X :size="18" class="hidden md:block" />
            </button>
            
            <div class="text-center text-white pr-8 md:pr-0">
              <div class="inline-flex items-center gap-2 bg-white/20 px-3 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold mb-1.5 md:mb-2">
                <Sparkles :size="12" class="md:hidden" />
                <Sparkles :size="14" class="hidden md:block" />
                <span>Kết quả tìm kiếm</span>
              </div>
              <h2 class="text-lg md:text-2xl font-bold mb-1">
                Món phù hợp với nguyên liệu của bạn
              </h2>
              <p class="text-white/90 text-xs md:text-sm hidden sm:block">
                Chọn món bạn muốn nấu hôm nay
              </p>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex-1 flex items-center justify-center py-8 md:py-12">
            <div class="text-center px-4">
              <div class="flex justify-center gap-2 mb-3 md:mb-4">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-xl flex items-center justify-center text-xl md:text-2xl animate-bounce"
                  :style="{ animationDelay: `${n * 0.1}s` }"
                >
                  {{ ['🥘', '🍳', '🥗', '🍜', '🍲'][n - 1] }}
                </div>
              </div>
              <LoadingSpinner size="md" />
              <p class="text-base md:text-lg font-semibold text-neutral-700 mt-3">
                Đang phân tích nguyên liệu...
              </p>
              <p class="text-xs md:text-sm text-neutral-500 mt-1.5">
                Tìm món phù hợp nhất cho bạn
              </p>
            </div>
          </div>

          <!-- Recipe Results -->
          <div v-else class="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-5">
            <!-- Selected Ingredients Summary - Compact -->
            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-primary-200">
              <div class="flex items-center gap-2 mb-2 md:mb-3">
                <div class="w-7 h-7 md:w-8 md:h-8 bg-primary-500 rounded-lg flex items-center justify-center text-base md:text-lg">
                  🧺
                </div>
                <h3 class="font-bold text-sm md:text-base text-neutral-900">Nguyên liệu đã chọn:</h3>
              </div>
              <div class="flex flex-wrap gap-1.5 md:gap-2">
                <div
                  v-for="ingredient in selectedIngredients"
                  :key="ingredient.id"
                  class="inline-flex items-center gap-1 md:gap-1.5 bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-primary-200 shadow-sm"
                >
                  <span class="text-sm md:text-base">{{ ingredient.icon }}</span>
                  <span class="font-semibold text-xs md:text-sm text-neutral-800">{{ ingredient.name }}</span>
                </div>
              </div>
            </div>

            <!-- Recipe Cards - Special Layout -->
            <div v-if="recipes.length > 0" class="mb-3 md:mb-4">
              <!-- <h3 class="text-base md:text-lg font-bold text-neutral-900 mb-3 md:mb-4 flex items-center gap-2 justify-center">
                <Sparkles :size="16" class="text-accent-500 md:hidden" />
                <Sparkles :size="18" class="text-accent-500 hidden md:block" />
                <span>Top {{ recipes.length }} món được đề xuất</span>
              </h3>
               -->
              <!-- Desktop: Special Layout - Top 1 ở giữa to hơn -->
              <div class="hidden md:block">
                <!-- 1 món: hiển thị giữa -->
                <div v-if="recipes.length === 1" class="max-w-md mx-auto">
                  <div 
                    class="group relative bg-white rounded-xl border-2 border-accent-400 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    @click="selectRecipe(recipes[0])"
                  >
                    <div class="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                      <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Star :size="14" fill="currentColor" />
                        <span class="text-xs font-bold">TOP 1</span>
                      </div>
                    </div>

                    <div class="absolute top-3 right-3 z-10">
                      <div class="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2.5 py-1 rounded-lg shadow-lg">
                        <span class="text-xs font-bold">{{ recipes[0].matchScore }}%</span>
                      </div>
                    </div>

                    <div class="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <img :src="recipes[0].image_url" :alt="recipes[0].title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div class="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md">
                        <span class="text-xs font-bold text-neutral-800">⏱️ {{ recipes[0].time_minutes }}p</span>
                      </div>
                    </div>

                    <div class="p-4">
                      <h4 class="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors">
                        {{ recipes[0].title }}
                      </h4>
                      <p class="text-sm text-neutral-600 mb-3 line-clamp-2">{{ recipes[0].description }}</p>

                      <div v-if="recipes[0].matchedIngredients && recipes[0].matchedIngredients.length > 0" class="mb-3">
                        <div class="flex flex-wrap gap-1.5">
                          <span v-for="ing in recipes[0].matchedIngredients" :key="ing.id" class="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-semibold border border-green-200">
                            <Check :size="10" />
                            {{ ing.name }}
                          </span>
                        </div>
                      </div>

                      <BaseButton variant="accent" size="md" class="w-full" @click.stop="selectRecipe(recipes[0])">
                        <span class="flex items-center gap-2 justify-center text-sm">
                          <span class="font-bold">Chọn món này</span>
                          <ArrowRight :size="14" />
                        </span>
                      </BaseButton>
                    </div>
                  </div>
                </div>
                
                <!-- 2 món: hiển thị 2 cột -->
                <div v-else-if="recipes.length === 2" class="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
                  <div 
                    v-for="(recipe, index) in recipes"
                    :key="recipe._id || recipe.id"
                    class="group relative bg-white rounded-xl border-2 border-neutral-200 hover:border-accent-400 shadow-card hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    @click="selectRecipe(recipe)"
                  >
                    <div class="absolute top-2 left-2 z-10">
                      <div :class="['w-9 h-9 rounded-full flex items-center justify-center font-bold text-base shadow-lg bg-gradient-to-br', getMedalClass(index + 1)]">
                        <span class="text-white">{{ index + 1 }}</span>
                      </div>
                    </div>

                    <div class="absolute top-2 right-2 z-10">
                      <div class="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2 py-1 rounded-lg shadow-md">
                        <span class="text-xs font-bold">{{ recipe.matchScore }}%</span>
                      </div>
                    </div>

                    <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                      <img :src="recipe.image_url" :alt="recipe.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div class="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
                        <span class="text-xs font-bold text-neutral-800">⏱️ {{ recipe.time_minutes }}p</span>
                      </div>
                    </div>

                    <div class="p-3">
                      <h4 class="text-sm font-bold text-neutral-900 mb-1.5 line-clamp-2 group-hover:text-accent-600 transition-colors">
                        {{ recipe.title }}
                      </h4>
                      <p class="text-xs text-neutral-600 mb-2 line-clamp-2">{{ recipe.description }}</p>

                      <div v-if="recipe.matchedIngredients && recipe.matchedIngredients.length > 0" class="mb-2">
                        <div class="flex flex-wrap gap-1">
                          <span v-for="ing in recipe.matchedIngredients" :key="ing.id" class="inline-flex items-center gap-0.5 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold border border-green-200">
                            <Check :size="9" />
                            {{ ing.name }}
                          </span>
                        </div>
                      </div>

                      <BaseButton variant="accent" size="sm" class="w-full" @click.stop="selectRecipe(recipe)">
                        <span class="flex items-center gap-1 justify-center text-xs">
                          <span>Chọn</span>
                          <ArrowRight :size="12" />
                        </span>
                      </BaseButton>
                    </div>
                  </div>
                </div>
                
                <!-- 3 món: Layout đặc biệt - Top 1 ở CHÍNH GIỮA, to hơn -->
                <div v-else class="relative">
                  <div class="flex items-start justify-center gap-3 max-w-4xl mx-auto">
                    <!-- Card #2 - Trái (Nhỏ hơn) -->
                    <div class="w-[240px] mt-16 flex-shrink-0">
                      <div 
                        class="group relative bg-white rounded-lg border-2 border-neutral-200 hover:border-primary-400 shadow-card hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        @click="selectRecipe(recipes[1])"
                      >
                        <div class="absolute top-2 left-2 z-10">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg bg-gradient-to-br from-gray-300 to-gray-400 text-white">
                            2
                          </div>
                        </div>

                        <div class="absolute top-2 right-2 z-10">
                          <div class="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-md">
                            <span class="text-xs font-bold text-accent-600">{{ recipes[1].matchScore }}%</span>
                          </div>
                        </div>

                        <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                          <img :src="recipes[1].image_url" :alt="recipes[1].title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                          <div class="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-sm rounded-md px-2 py-0.5 shadow-md">
                            <span class="text-xs font-bold text-neutral-800">⏱️ {{ recipes[1].time_minutes }}p</span>
                          </div>
                        </div>

                        <div class="p-3">
                          <h4 class="text-sm font-bold text-neutral-900 mb-1.5 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {{ recipes[1].title }}
                          </h4>

                          <div v-if="recipes[1].matchedIngredients && recipes[1].matchedIngredients.length > 0" class="mb-2">
                            <div class="flex flex-wrap gap-1">
                              <span v-for="ing in recipes[1].matchedIngredients.slice(0, 2)" :key="ing.id" class="inline-flex items-center gap-0.5 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold border border-green-200">
                                <Check :size="9" />
                                {{ ing.name }}
                              </span>
                              <span v-if="recipes[1].matchedIngredients.length > 2" class="text-xs text-neutral-500 self-center">
                                +{{ recipes[1].matchedIngredients.length - 2 }}
                              </span>
                            </div>
                          </div>

                          <BaseButton variant="primary" size="sm" class="w-full" @click.stop="selectRecipe(recipes[1])">
                            <span class="flex items-center gap-1 justify-center text-xs">
                              <span>Chọn</span>
                              <ArrowRight :size="12" />
                            </span>
                          </BaseButton>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Card #1 - CHÍNH GIỮA (To nhất) -->
                    <div class="w-[300px] flex-shrink-0">
                      <div 
                        class="group relative bg-white rounded-xl border-2 border-accent-400 shadow-2xl hover:shadow-float overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        @click="selectRecipe(recipes[0])"
                      >
                        <div class="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                          <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5">
                            <Star :size="14" fill="currentColor" />
                            <span class="text-xs font-bold">TOP 1</span>
                          </div>
                        </div>

                        <div class="absolute top-3 right-3 z-10">
                          <div class="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2.5 py-1.5 rounded-lg shadow-lg">
                            <span class="text-xs font-bold">{{ recipes[0].matchScore }}%</span>
                          </div>
                        </div>

                        <div class="relative aspect-[16/11] overflow-hidden bg-neutral-100">
                          <img :src="recipes[0].image_url" :alt="recipes[0].title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                          <div class="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                            <span class="text-sm font-bold text-neutral-800">⏱️ {{ recipes[0].time_minutes }}p</span>
                          </div>
                        </div>

                        <div class="p-4">
                          <h4 class="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors">
                            {{ recipes[0].title }}
                          </h4>
                          <p class="text-sm text-neutral-600 mb-3 line-clamp-2">{{ recipes[0].description }}</p>

                          <div v-if="recipes[0].matchedIngredients && recipes[0].matchedIngredients.length > 0" class="mb-3">
                            <div class="flex flex-wrap gap-1.5">
                              <span v-for="ing in recipes[0].matchedIngredients" :key="ing.id" class="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-semibold border border-green-200">
                                <Check :size="11" />
                                {{ ing.name }}
                              </span>
                            </div>
                          </div>

                          <BaseButton variant="accent" size="md" class="w-full" @click.stop="selectRecipe(recipes[0])">
                            <span class="flex items-center gap-1.5 justify-center text-sm">
                              <span class="font-bold">Chọn món này</span>
                              <ArrowRight :size="14" />
                            </span>
                          </BaseButton>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Card #3 - Phải (Nhỏ hơn) -->
                    <div class="w-[240px] mt-16 flex-shrink-0">
                      <div 
                        class="group relative bg-white rounded-lg border-2 border-neutral-200 hover:border-primary-400 shadow-card hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        @click="selectRecipe(recipes[2])"
                      >
                        <div class="absolute top-2 left-2 z-10">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg bg-gradient-to-br from-amber-600 to-amber-700 text-white">
                            3
                          </div>
                        </div>

                        <div class="absolute top-2 right-2 z-10">
                          <div class="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-md">
                            <span class="text-xs font-bold text-accent-600">{{ recipes[2].matchScore }}%</span>
                          </div>
                        </div>

                        <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                          <img :src="recipes[2].image_url" :alt="recipes[2].title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                          <div class="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-sm rounded-md px-2 py-0.5 shadow-md">
                            <span class="text-xs font-bold text-neutral-800">⏱️ {{ recipes[2].time_minutes }}p</span>
                          </div>
                        </div>

                        <div class="p-3">
                          <h4 class="text-sm font-bold text-neutral-900 mb-1.5 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {{ recipes[2].title }}
                          </h4>

                          <div v-if="recipes[2].matchedIngredients && recipes[2].matchedIngredients.length > 0" class="mb-2">
                            <div class="flex flex-wrap gap-1">
                              <span v-for="ing in recipes[2].matchedIngredients.slice(0, 2)" :key="ing.id" class="inline-flex items-center gap-0.5 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold border border-green-200">
                                <Check :size="9" />
                                {{ ing.name }}
                              </span>
                              <span v-if="recipes[2].matchedIngredients.length > 2" class="text-xs text-neutral-500 self-center">
                                +{{ recipes[2].matchedIngredients.length - 2 }}
                              </span>
                            </div>
                          </div>

                          <BaseButton variant="primary" size="sm" class="w-full" @click.stop="selectRecipe(recipes[2])">
                            <span class="flex items-center gap-1 justify-center text-xs">
                              <span>Chọn</span>
                              <ArrowRight :size="12" />
                            </span>
                          </BaseButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mobile: Stack vertically -->
              <div class="md:hidden space-y-3">
                <div 
                  v-for="(recipe, index) in recipes"
                  :key="recipe._id || recipe.id"
                  :class="[
                    'group relative bg-white rounded-lg border-2 shadow-card hover:shadow-lg overflow-hidden transition-all duration-300 cursor-pointer',
                    index === 0 ? 'border-accent-400' : 'border-neutral-200'
                  ]"
                  @click="selectRecipe(recipe)"
                >
                  <div class="absolute top-2 left-2 z-10">
                    <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg bg-gradient-to-br', getMedalClass(index + 1)]">
                      <span class="text-white">{{ index + 1 }}</span>
                    </div>
                  </div>

                  <div class="absolute top-2 right-2 z-10">
                    <div class="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2 py-1 rounded-md shadow-lg">
                      <span class="text-xs font-bold">{{ recipe.matchScore }}%</span>
                    </div>
                  </div>

                  <div class="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <img :src="recipe.image_url" :alt="recipe.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div class="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-md">
                      <span class="text-xs font-bold text-neutral-800">⏱️ {{ recipe.time_minutes }}p</span>
                    </div>
                  </div>

                  <div class="p-3">
                    <h4 :class="['font-bold text-neutral-900 mb-1.5 line-clamp-2 group-hover:text-accent-600 transition-colors', index === 0 ? 'text-base' : 'text-sm']">
                      {{ recipe.title }}
                    </h4>
                    <p class="text-xs text-neutral-600 mb-2 line-clamp-2">{{ recipe.description }}</p>

                    <div v-if="recipe.matchedIngredients && recipe.matchedIngredients.length > 0" class="mb-2">
                      <div class="flex flex-wrap gap-1">
                        <span v-for="ing in recipe.matchedIngredients" :key="ing.id" class="inline-flex items-center gap-0.5 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold border border-green-200">
                          <Check :size="10" />
                          {{ ing.name }}
                        </span>
                      </div>
                    </div>

                    <BaseButton :variant="index === 0 ? 'accent' : 'primary'" size="sm" class="w-full" @click.stop="selectRecipe(recipe)">
                      <span class="flex items-center gap-1.5 justify-center text-xs">
                        <span>{{ index === 0 ? 'Chọn món tốt nhất' : 'Chọn món này' }}</span>
                        <ArrowRight :size="12" />
                      </span>
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div v-if="!loading && recipes.length === 0" class="text-center py-6 md:py-8">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-neutral-100 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mx-auto mb-3">
                😕
              </div>
              <h3 class="text-lg md:text-xl font-bold text-neutral-900 mb-2">
                Không tìm thấy món phù hợp
              </h3>
              <p class="text-sm text-neutral-600 mb-4">
                Vui lòng thử với các nguyên liệu khác
              </p>
              <BaseButton variant="primary" size="sm" @click="handleClose">
                Chọn lại nguyên liệu
              </BaseButton>
            </div>
          </div>

          <!-- Footer - Compact -->
          <div class="border-t border-neutral-200 px-3 md:px-6 py-2 md:py-3 bg-neutral-50">
            <p class="text-xs text-neutral-600 text-center">
              💡 <strong>Mẹo:</strong> Món có % cao nhất sử dụng nhiều nguyên liệu bạn chọn nhất
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X, Sparkles, Star, Check, ArrowRight } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'
import LoadingSpinner from '../ui/LoadingSpinner.vue'
import IconBox from '../ui/IconBox.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  recipes: {
    type: Array,
    default: () => []
  },
  selectedIngredients: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'select'])

const handleClose = () => {
  if (!props.loading) {
    emit('close')
  }
}

const selectRecipe = (recipe) => {
  emit('select', recipe)
}

const getMedalClass = (rank) => {
  if (rank === 1) return 'from-yellow-400 to-yellow-500'
  if (rank === 2) return 'from-gray-300 to-gray-400'
  if (rank === 3) return 'from-amber-600 to-amber-700'
  return 'from-neutral-400 to-neutral-500'
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgb(203 213 225) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(203 213 225);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(148 163 184);
}
</style>