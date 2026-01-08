import { ref } from 'vue'
import { recipeService } from '../services/recipeService'

export function useCommunity() {
  const recipes = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch community recipes
  const fetchRecipes = async (limit = 10) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getCommunityRecipes(limit)
      if (response.success) {
        recipes.value = response.data
      }
    } catch (err) {
      error.value = 'Không thể tải công thức cộng đồng'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Vote for recipe
  const voteRecipe = async (recipeId) => {
    try {
      const response = await recipeService.voteRecipe(recipeId)
      if (response.success) {
        // Update local state
        const recipe = recipes.value.find(r => r.id === recipeId)
        if (recipe) {
          recipe.votes = response.data.votes
        }
        return true
      }
    } catch (err) {
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