<!-- RecipeCard.vue - Phiên bản nền sáng, UI rõ ràng -->
<template>
  <div 
    class="recipe-card group relative overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-card hover:shadow-float transition-all duration-500 cursor-pointer hover:-translate-y-2"
    @click="handleClick"
  >
    <!-- Image Container - Cố định tỷ lệ, không tràn -->
    <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
      <img 
        :src="recipe.image_url" 
        :alt="recipe.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      <!-- Overlay gradient nhẹ -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <!-- Time badge -->
      <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md transform group-hover:scale-105 transition-transform duration-300">
        <div class="flex items-center gap-1.5">
          <Clock :size="14" class="text-primary-600" />
          <span class="text-sm font-bold text-neutral-800">{{ recipe.time_minutes }}p</span>
        </div>
      </div>

      <!-- Difficulty badge - Max 5 levels -->
      <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
        <div class="flex items-center gap-1">
          <div 
            v-for="n in 5" 
            :key="n"
            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
            :class="n <= recipe.difficulty_score ? 'bg-warning scale-110' : 'bg-neutral-300'"
          ></div>
        </div>
      </div>

      <!-- Like count -->
      <div 
        v-if="recipe.likeCount > 0"
        class="absolute bottom-3 right-3 bg-error/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md flex items-center gap-1.5"
      >
        <Heart :size="14" class="text-white fill-white" />
        <span class="text-xs font-bold text-white">{{ recipe.likeCount }}</span>
      </div>
    </div>

    <!-- Content - Nền trắng rõ ràng, tách biệt hoàn toàn -->
    <div class="relative p-5 bg-white space-y-4">
      <div>
        <h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
          {{ recipe.title }}
        </h3>
        <p class="text-neutral-600 text-sm leading-relaxed line-clamp-2">
          {{ recipe.description }}
        </p>
      </div>

      <!-- Nutrition highlights (compact) -->
      <div 
        v-if="recipe.nutrition_facts"
        class="grid grid-cols-4 gap-2"
      >
        <div class="bg-neutral-50 rounded-lg p-2 text-center border border-neutral-200">
          <p class="text-xs text-neutral-500 mb-0.5">Cal</p>
          <p class="text-sm font-bold text-neutral-900">{{ recipe.nutrition_facts.calories }}</p>
        </div>
        <div class="bg-neutral-50 rounded-lg p-2 text-center border border-neutral-200">
          <p class="text-xs text-neutral-500 mb-0.5">Protein</p>
          <p class="text-sm font-bold text-success">{{ recipe.nutrition_facts.protein_g }}g</p>
        </div>
        <div class="bg-neutral-50 rounded-lg p-2 text-center border border-neutral-200">
          <p class="text-xs text-neutral-500 mb-0.5">Carbs</p>
          <p class="text-sm font-bold text-warning">{{ recipe.nutrition_facts.carbohydrates_g }}g</p>
        </div>
        <div class="bg-neutral-50 rounded-lg p-2 text-center border border-neutral-200">
          <p class="text-xs text-neutral-500 mb-0.5">Fat</p>
          <p class="text-sm font-bold text-info">{{ recipe.nutrition_facts.fat_total_g }}g</p>
        </div>
      </div>

      <!-- Tags - Giữ nguyên -->
      <div v-if="recipe.tags && recipe.tags.length > 0" class="flex flex-wrap gap-2">
        <span 
          v-for="tag in recipe.tags.slice(0, 3)" 
          :key="tag"
          class="px-3 py-1 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold rounded-full group-hover:bg-primary-100 transition-colors duration-300"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- CTA Arrow -->
      <div class="flex items-center justify-end pt-2 border-t border-neutral-100">
        <div class="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
          <span>Xem công thức</span>
          <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Clock, Heart, ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const handleClick = () => {
  router.push(`/recipe/${props.recipe._id}`)
}
</script>

<style scoped>
.recipe-card {
  /* Animation mượt mà */
  will-change: transform, box-shadow;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>