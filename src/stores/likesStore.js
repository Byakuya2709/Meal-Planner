// src/stores/likesStore.js - CẬP NHẬT

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { supabaseRecipeService } from '../services/supabaseRecipeService'
import { useAuthStore } from './authStore'

export const useLikesStore = defineStore('likes', () => {
  const authStore = useAuthStore()
  const toast = useToast()
  
  // State: Set của các recipe_id đã like
  const likedRecipeIds = ref(new Set())
  const loading = ref(false)
  const loaded = ref(false) // Track nếu đã load

  // Getters
  const isLiked = computed(() => (recipeId) => {
    return likedRecipeIds.value.has(recipeId)
  })

  const likedCount = computed(() => likedRecipeIds.value.size)

  // Actions
  async function loadLikedRecipes(force = false) {
    // Skip nếu đã load và không force
    if (loaded.value && !force) {
      console.log('[LikesStore] Already loaded, skipping...')
      return
    }

    if (!authStore.isAuthenticated) {
      console.warn('[LikesStore] Cannot load likes - not authenticated')
      likedRecipeIds.value.clear()
      loaded.value = false
      return
    }

    console.log('[LikesStore] Loading liked recipes...')
    loading.value = true

    try {
      const response = await supabaseRecipeService.getUserLikedRecipes()
      
      if (response.success) {
        likedRecipeIds.value = new Set(response.data)
        loaded.value = true
        console.log('[LikesStore] Loaded liked recipes:', likedRecipeIds.value.size)
      } else {
        console.error('[LikesStore] Load error:', response.error)
      }
    } catch (error) {
      console.error('[LikesStore] Load error:', error)
    }

    loading.value = false
  }

  async function likeRecipe(recipeId) {
    if (!authStore.isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để thích công thức')
      return { success: false, requireAuth: true }
    }

    // Ensure loaded trước khi like
    if (!loaded.value) {
      await loadLikedRecipes()
    }

    // Kiểm tra đã like chưa
    if (likedRecipeIds.value.has(recipeId)) {
      toast.info('Bạn đã thích công thức này rồi! ❤️')
      return { success: false, alreadyLiked: true }
    }

    console.log('[LikesStore] Liking recipe:', recipeId)

    const response = await supabaseRecipeService.voteRecipe(recipeId)

    if (response.success) {
      // Thêm vào set
      likedRecipeIds.value.add(recipeId)
      toast.success('Đã thích công thức! 👍')
      return { success: true, data: response.data }
    } else {
      if (response.error && response.error.includes('đã thích')) {
        // Đã like rồi, cập nhật store
        likedRecipeIds.value.add(recipeId)
        toast.info('Bạn đã thích công thức này rồi! ❤️')
        return { success: false, alreadyLiked: true }
      }
      
      toast.error(response.error || 'Không thể thích công thức')
      return response
    }
  }

  
  function $reset() {
    likedRecipeIds.value.clear()
    loading.value = false
    loaded.value = false
    console.log('[LikesStore] Reset complete')
    
    // Force xóa localStorage ngay sau đó
    queueMicrotask(() => {
      localStorage.removeItem('likes-storage')
      console.log('[LikesStore] Removed localStorage')
    })
  }

  return {
    // State
    likedRecipeIds,
    loading,
    loaded,
    
    // Getters
    isLiked,
    likedCount,
    
    // Actions
    loadLikedRecipes,
    likeRecipe,
    $reset
  }
}, {
  persist: {
    key: 'likes-storage',
    storage: localStorage,
    paths: ['likedRecipeIds', 'loaded'],
    // Serialize Set to Array
    serializer: {
      serialize: (state) => {
        return JSON.stringify({
          ...state,
          likedRecipeIds: Array.from(state.likedRecipeIds)
        })
      },
      deserialize: (value) => {
        const state = JSON.parse(value)
        return {
          ...state,
          likedRecipeIds: new Set(state.likedRecipeIds || [])
        }
      }
    }
  }
})