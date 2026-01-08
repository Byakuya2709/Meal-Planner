import { ref, computed } from 'vue'
import { recipeService } from '../services/recipeService'

export function useIngredients() {
  const ingredients = ref([])
  const selectedIngredients = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch ingredients
  const fetchIngredients = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getIngredients()
      if (response.success) {
        ingredients.value = response.data
      }
    } catch (err) {
      error.value = 'Không thể tải danh sách nguyên liệu'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Toggle ingredient selection
  const toggleIngredient = (ingredient) => {
    const index = selectedIngredients.value.findIndex(i => i.id === ingredient.id)
    
    if (index > -1) {
      selectedIngredients.value.splice(index, 1)
    } else {
      // Giới hạn tối đa 5 nguyên liệu
      if (selectedIngredients.value.length < 5) {
        selectedIngredients.value.push(ingredient)
      }
    }
  }

  // Check if ingredient is selected
  const isSelected = (ingredientId) => {
    return selectedIngredients.value.some(i => i.id === ingredientId)
  }

  // Clear selection
  const clearSelection = () => {
    selectedIngredients.value = []
  }

  // Get ingredients by category
  const getByCategory = (category) => {
    return ingredients.value.filter(i => i.category === category)
  }

  // Computed
  const selectedCount = computed(() => selectedIngredients.value.length)
  const canSelectMore = computed(() => selectedCount.value < 5)
  const canSubmit = computed(() => selectedCount.value >= 3 && selectedCount.value <= 5)

  return {
    ingredients,
    selectedIngredients,
    loading,
    error,
    selectedCount,
    canSelectMore,
    canSubmit,
    fetchIngredients,
    toggleIngredient,
    isSelected,
    clearSelection,
    getByCategory
  }
}