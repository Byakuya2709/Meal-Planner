<!-- src/App.vue -->
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useFavoritesStore } from './stores/favoritesStore'
import { clearExpiredItems } from './utils/storageExpire'
import { cleanupStorage } from './utils/cleanupStorage'

const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

onMounted(async () => {
  // Clean up storage trước
  cleanupStorage()
  
  // Clear expired items
  clearExpiredItems()
  
  // Initialize auth
  await authStore.initAuth()
  
  // Load favorites nếu đã đăng nhập
  if (authStore.isAuthenticated) {
    await favoritesStore.loadFavorites()
  }
})
</script>

<template>
  <RouterView />
</template>