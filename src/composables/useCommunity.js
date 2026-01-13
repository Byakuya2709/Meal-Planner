// src/composables/useCommunity.js

import { ref } from 'vue'
import { recipeService } from '../services/recipeService'

export function useCommunity() {
  const recipes = ref([])
  const loading = ref(false)
  const error = ref(null)

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
      }
    } catch (err) {
      error.value = 'Không thể tải công thức cộng đồng'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Vote for recipe với optimistic update
  const voteRecipe = async (recipeId) => {
    const recipe = recipes.value.find(r => r.id === recipeId || r._id === recipeId)
    
    if (!recipe) return false
    
    // Optimistic update
    const originalLikeCount = recipe.like_count || recipe.likeCount || 0
    recipe.like_count = originalLikeCount + 1
    recipe.likeCount = recipe.like_count
    
    try {
      const response = await recipeService.voteRecipe(recipeId)
      
      if (response.success) {
        // Update với giá trị thật từ server
        recipe.like_count = response.data.likeCount
        recipe.likeCount = response.data.likeCount
        return true
      } else {
        // Rollback nếu fail
        recipe.like_count = originalLikeCount
        recipe.likeCount = originalLikeCount
        
        if (response.error) {
          error.value = response.error
        }
        return false
      }
    } catch (err) {
      // Rollback nếu có lỗi
      recipe.like_count = originalLikeCount
      recipe.likeCount = originalLikeCount
      console.error(err)
      return false
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