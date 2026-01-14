// src/stores/favoritesStore.js - CẬP NHẬT

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { favoritesService } from '../services/favoritesService'
import { useAuthStore } from './authStore'

export const useFavoritesStore = defineStore('favorites', () => {
  const authStore = useAuthStore()
  const toast = useToast()
  
  // State
  const favorites = ref([])
  const loading = ref(false)
  const error = ref(null)
  const loaded = ref(false) // Track nếu đã load

  // Getters
  const favoriteIds = computed(() => {
    return favorites.value.map(r => r.id)
  })

  const isFavorite = computed(() => (recipeId) => {
    return favoriteIds.value.includes(recipeId)
  })

  const favoriteCount = computed(() => favorites.value.length)

  // Actions
  async function loadFavorites(force = false) {
    // Skip nếu đã load và không force
    if (loaded.value && !force) {
      console.log('[FavStore] Already loaded, skipping...')
      return
    }

    if (!authStore.isAuthenticated) {
      console.warn('[FavStore] Cannot load favorites - not authenticated')
      favorites.value = []
      loaded.value = false
      return
    }

    console.log('[FavStore] Loading favorites...')
    loading.value = true
    error.value = null

    const response = await favoritesService.getUserFavorites()

    if (response.success) {
      favorites.value = response.data
      loaded.value = true
      console.log('[FavStore] Loaded favorites:', favorites.value.length)
    } else {
      error.value = response.error
      console.error('[FavStore] Load error:', response.error)
      toast.error('Không thể tải danh sách yêu thích')
    }

    loading.value = false
  }

  async function addFavorite(recipeId) {
    if (!authStore.isAuthenticated) {
      error.value = 'Vui lòng đăng nhập để lưu món yêu thích'
      toast.warning('Vui lòng đăng nhập để lưu món yêu thích')
      return { success: false, error: error.value, requireAuth: true }
    }

    console.log('[FavStore] Adding favorite:', recipeId)
    loading.value = true
    error.value = null

    const response = await favoritesService.addFavorite(recipeId)

    if (response.success) {
      console.log('[FavStore] Add success, reloading favorites...')
      await loadFavorites(true) // Force reload
      toast.success('Đã thêm vào món yêu thích! ❤️')
    } else {
      error.value = response.error
      console.error('[FavStore] Add error:', response.error)
      
      if (response.error.includes('đã có trong danh sách')) {
        toast.info('Món này đã có trong danh sách yêu thích')
      } else {
        toast.error(response.error || 'Không thể lưu món yêu thích')
      }
    }

    loading.value = false
    return response
  }

  async function removeFavorite(recipeId) {
    if (!authStore.isAuthenticated) {
      return { success: false, error: 'Not authenticated' }
    }

    console.log('[FavStore] Removing favorite:', recipeId)
    loading.value = true
    error.value = null

    const response = await favoritesService.removeFavorite(recipeId)

    if (response.success) {
      favorites.value = favorites.value.filter(r => r.id !== recipeId)
      console.log('[FavStore] Removed, remaining:', favorites.value.length)
      toast.info('Đã xóa khỏi món yêu thích')
    } else {
      error.value = response.error
      toast.error('Không thể xóa món yêu thích')
    }

    loading.value = false
    return response
  }

  async function toggleFavorite(recipeId) {
    // Ensure loaded trước khi toggle
    if (!loaded.value) {
      await loadFavorites()
    }
    
    console.log('[FavStore] Toggle favorite:', recipeId, 'isFavorite:', isFavorite.value(recipeId))
    if (isFavorite.value(recipeId)) {
      return await removeFavorite(recipeId)
    } else {
      return await addFavorite(recipeId)
    }
  }

  function clearError() {
    error.value = null
  }

    // src/stores/favoritesStore.js - XÓA localStorage TRONG $reset()
  
  function $reset() {
    favorites.value = []
    loading.value = false
    error.value = null
    loaded.value = false
    console.log('[FavStore] Reset complete')
    
    // Force xóa localStorage ngay sau đó
    queueMicrotask(() => {
      localStorage.removeItem('favorites-storage')
      console.log('[FavStore] Removed localStorage')
    })
  }

  return {
    // State
    favorites,
    loading,
    error,
    loaded,
    
    // Getters
    favoriteIds,
    isFavorite,
    favoriteCount,
    
    // Actions
    loadFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearError,
    $reset
  }
}, {
  persist: {
    key: 'favorites-storage',
    storage: localStorage,
    paths: ['favorites', 'loaded'] // Persist cả loaded flag
  }
})