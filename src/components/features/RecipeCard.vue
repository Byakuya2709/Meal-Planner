<!-- src/components/features/RecipeCard.vue -->
<template>
  <div
    class="group bg-white rounded-2xl border border-neutral-200 shadow-card hover:shadow-float overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer relative"
  >
    <!-- Favorite Button -->
    <button
      v-if="authStore.isAuthenticated"
      @click.stop="$emit('toggle-favorite')"
      class="absolute top-3 right-3 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      :class="isFavorite ? 'text-error' : 'text-neutral-400'"
    >
      <Heart
        :size="20"
        :fill="isFavorite ? 'currentColor' : 'none'"
      />
    </button>

    <!-- Clickable Area -->
    <div @click="goToRecipe">
      <!-- Image -->
      <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          :src="recipe.image_url"
          :alt="recipe.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <!-- Time badge -->
        <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
          <span class="text-sm font-bold text-neutral-800">⏱️ {{ recipe.time_minutes }}p</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-5">
        <h3 class="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {{ recipe.title }}
        </h3>

        <!-- Meta -->
        <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div class="flex items-center gap-2 text-neutral-600">
            <Heart :size="18" class="text-error" />
            <span class="text-sm font-semibold">{{ recipe.like_count || 0 }}</span>
          </div>

          <div class="flex items-center gap-2 text-primary-600 font-semibold text-sm">
            <span>Xem chi tiết</span>
            <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { Heart, ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-favorite'])

const router = useRouter()
const authStore = useAuthStore()

const goToRecipe = () => {
  router.push(`/recipe/${props.recipe.id || props.recipe._id}`)
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