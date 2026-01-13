// src/composables/useRecipe.js

import { ref } from 'vue'
import { recipeService } from '../services/recipeService'

export function useRecipe() {
  const recipe = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Find recipe based on ingredients
  const findRecipe = async (ingredientIds) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.findRecipe(ingredientIds)
      if (response.success) {
        recipe.value = response.data
        
        // Increment stats sau khi tìm thấy recipe
        await recipeService.incrementMealCreated().catch(err => {
          console.warn('Failed to increment stats:', err)
        })
        
        return response.data
      } else {
        error.value = response.error || 'Không thể tìm món phù hợp'
      }
    } catch (err) {
      error.value = 'Không thể tìm món phù hợp'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Get recipe by ID
  const getRecipeById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getRecipeById(id)
      if (response.success) {
        recipe.value = response.data
        return response.data
      } else {
        error.value = response.error || 'Không thể tải công thức'
      }
    } catch (err) {
      error.value = 'Không thể tải công thức'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    recipe,
    loading,
    error,
    findRecipe,
    getRecipeById
  }
}