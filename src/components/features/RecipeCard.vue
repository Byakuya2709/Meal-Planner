<template>
  <BaseCard :hoverable="true" no-padding @click="handleClick">
    <div class="recipe-card">
      <!-- Image -->
      <div class="relative aspect-[4/3] overflow-hidden">
        <img 
          :src="recipe.image" 
          :alt="recipe.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 shadow-sm">
          <span class="text-sm font-medium text-neutral-700">⏱️ {{ recipe.cookTime }} phút</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-5">
        <h3 class="text-xl font-semibold text-neutral-900 mb-2">
          {{ recipe.name }}
        </h3>
        <p class="text-neutral-600 text-sm line-clamp-2 mb-4">
          {{ recipe.description }}
        </p>

        <!-- Meta info -->
        <div class="flex items-center gap-4 text-sm text-neutral-500">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {{ recipe.servings }} người
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {{ recipe.difficulty }}
          </span>
        </div>

        <!-- Tags -->
        <div v-if="recipe.tags" class="flex flex-wrap gap-2 mt-4">
          <span 
            v-for="tag in recipe.tags.slice(0, 3)" 
            :key="tag"
            class="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseCard from '../ui/BaseCard.vue'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const handleClick = () => {
  router.push(`/recipe/${props.recipe.id}`)
}
</script>

<style scoped>
.recipe-card {
  @apply cursor-pointer;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>