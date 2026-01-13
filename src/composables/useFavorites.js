// src/composables/useFavorites.js

import { ref, computed } from 'vue'
import { favoritesService } from '../services/favoritesService'
import { useAuth } from './useAuth'

export function useFavorites() {
  const { isAuthenticated } = useAuth()
  
  const favorites = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Toggle favorite
  const toggleFavorite = async (recipeId) => {
    if (!isAuthenticated.value) {
      error.value = 'Vui lòng đăng nhập để lưu món yêu thích'
      return { success: false, error: error.value }
    }

    loading.value = true
    error.value = null

    // Check if already favorited
    const checkResponse = await favoritesService.isFavorite(recipeId)
    
    if (!checkResponse.success) {
      error.value = checkResponse.error
      loading.value = false
      return checkResponse
    }

    const isFav = checkResponse.data
    let response

    if (isFav) {
      response = await favoritesService.removeFavorite(recipeId)
    } else {
      response = await favoritesService.addFavorite(recipeId)
    }

    if (response.success) {
      // Update local favorites list
      await loadFavorites()
    } else {
      error.value = response.error
    }

    loading.value = false
    return response
  }

  // Load user favorites
  const loadFavorites = async () => {
    if (!isAuthenticated.value) return

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

  // Check if recipe is favorited
  const isFavorite = async (recipeId) => {
    const response = await favoritesService.isFavorite(recipeId)
    return response.success ? response.data : false
  }

  const favoriteIds = computed(() => {
    return favorites.value.map(r => r.id)
  })

  return {
    favorites,
    loading,
    error,
    favoriteIds,
    toggleFavorite,
    loadFavorites,
    isFavorite,
  }
}