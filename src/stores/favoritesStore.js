// src/stores/favoritesStore.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { favoritesService } from '../services/favoritesService'
import { useAuthStore } from './authStore'

export const useFavoritesStore = defineStore('favorites', () => {
  const authStore = useAuthStore()
  
  // State
  const favorites = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const favoriteIds = computed(() => {
    return favorites.value.map(r => r.id)
  })

  const isFavorite = computed(() => (recipeId) => {
    return favoriteIds.value.includes(recipeId)
  })

  const favoriteCount = computed(() => favorites.value.length)

  // Actions
  async function loadFavorites() {
    if (!authStore.isAuthenticated) {
      favorites.value = []
      return
    }

    loading.value = true
    error.value = null

    const response = await favoritesService.getUserFavorites()

    if (response.success) {
      favorites.value = response.data
    } else {
      error.value = response.error
    }

    loading.value = false
  }

  async function addFavorite(recipeId) {
    if (!authStore.isAuthenticated) {
      error.value = 'Vui lòng đăng nhập để lưu món yêu thích'
      return { success: false, error: error.value }
    }

    loading.value = true
    error.value = null

    const response = await favoritesService.addFavorite(recipeId)

    if (response.success) {
      await loadFavorites()
    } else {
      error.value = response.error
    }

    loading.value = false
    return response
  }

  async function removeFavorite(recipeId) {
    if (!authStore.isAuthenticated) {
      return { success: false, error: 'Not authenticated' }
    }

    loading.value = true
    error.value = null

    const response = await favoritesService.removeFavorite(recipeId)

    if (response.success) {
      favorites.value = favorites.value.filter(r => r.id !== recipeId)
    } else {
      error.value = response.error
    }

    loading.value = false
    return response
  }

  async function toggleFavorite(recipeId) {
    if (isFavorite.value(recipeId)) {
      return await removeFavorite(recipeId)
    } else {
      return await addFavorite(recipeId)
    }
  }

  function clearError() {
    error.value = null
  }

  function clearFavorites() {
    favorites.value = []
  }

  return {
    favorites,
    loading,
    error,
    favoriteIds,
    isFavorite,
    favoriteCount,
    loadFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearError,
    clearFavorites,
  }
}, {
  // Persist favorites với thời gian ngắn hơn (1 ngày)
  persist: {
    key: 'favorites-storage',
    storage: localStorage,
    paths: ['favorites'],
  }
})