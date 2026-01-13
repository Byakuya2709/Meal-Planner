// src/composables/useCommunity.js

import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { recipeService } from '../services/recipeService'
import { useAuthStore } from '../stores/authStore'

export function useCommunity() {
  const recipes = ref([])
  const loading = ref(false)
  const error = ref(null)
  const toast = useToast()
  
  const authStore = useAuthStore()

  // Fetch community recipes
  const fetchRecipes = async (limit = 10, filterIngredients = []) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getCommunityRecipes(limit, filterIngredients)
      if (response.success) {
        recipes.value = response.data
      } else {
        error.value = response.error || 'Không thể tải công thức cộng đồng'
        toast.error(error.value)
      }
    } catch (err) {
      error.value = 'Không thể tải công thức cộng đồng'
      toast.error(error.value)
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Vote for recipe - yêu cầu đăng nhập
  const voteRecipe = async (recipeId) => {
    if (!authStore.isAuthenticated) {
      error.value = 'Vui lòng đăng nhập để thích công thức'
      toast.warning('Vui lòng đăng nhập để thích công thức')
      return { success: false, requireAuth: true }
    }

    const recipe = recipes.value.find(r => r.id === recipeId || r._id === recipeId)
    
    if (!recipe) return { success: false }
    
    try {
      const response = await recipeService.voteRecipe(recipeId)
      
      if (response.success) {
        // Update với giá trị thật từ server
        recipe.like_count = response.data.likeCount
        recipe.likeCount = response.data.likeCount
        toast.success('Đã thích công thức! 👍')
        return { success: true }
      } else {
        // Nếu đã like rồi - CHỈ HIỆN THÔNG BÁO, KHÔNG XÓA CONTENT
        if (response.error && response.error.includes('đã thích')) {
          toast.info('Bạn đã thích công thức này rồi! ❤️')
          return { success: false, alreadyLiked: true }
        }
        
        error.value = response.error
        toast.error(response.error || 'Không thể thích công thức')
        return response
      }
    } catch (err) {
      console.error(err)
      toast.error('Đã có lỗi xảy ra')
      return { success: false }
    }
  }

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    voteRecipe
  }
}