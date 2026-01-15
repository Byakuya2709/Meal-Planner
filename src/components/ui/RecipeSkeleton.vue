<!-- src/components/ui/RecipeSkeleton.vue -->
<template>
  <div class="bg-white rounded-2xl border border-neutral-200 shadow-card overflow-hidden animate-pulse">
    <!-- Image skeleton -->
    <div class="aspect-[4/3] bg-neutral-200"></div>
    
    <!-- Content skeleton -->
    <div class="p-5">
      <!-- Title -->
      <div class="h-6 bg-neutral-200 rounded-lg mb-3 w-3/4"></div>
      <div class="h-6 bg-neutral-200 rounded-lg mb-4 w-1/2"></div>
      
      <!-- Author -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 rounded-full bg-neutral-200"></div>
        <div class="flex-1">
          <div class="h-4 bg-neutral-200 rounded w-1/3 mb-1"></div>
          <div class="h-3 bg-neutral-200 rounded w-1/4"></div>
        </div>
      </div>
      
      <!-- Tags -->
      <div class="flex gap-2 mb-4">
        <div class="h-6 bg-neutral-200 rounded-full w-16"></div>
        <div class="h-6 bg-neutral-200 rounded-full w-20"></div>
        <div class="h-6 bg-neutral-200 rounded-full w-14"></div>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div class="h-5 bg-neutral-200 rounded w-12"></div>
        <div class="h-5 bg-neutral-200 rounded w-24"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Skeleton loading component cho recipe card
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>