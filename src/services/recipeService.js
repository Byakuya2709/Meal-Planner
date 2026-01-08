import { ingredients, recipes, communityRecipes, impactStats } from './mockData'

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const recipeService = {
  // Lấy danh sách ingredients
  async getIngredients() {
    await delay(300)
    return {
      success: true,
      data: ingredients
    }
  },

  // Lấy ingredient theo category
  async getIngredientsByCategory(category) {
    await delay(200)
    const filtered = ingredients.filter(ing => ing.category === category)
    return {
      success: true,
      data: filtered
    }
  },

  // Tìm recipe phù hợp với ingredients đã chọn
  async findRecipe(selectedIngredientIds) {
    await delay(800) // Simulate AI processing
    
    // Logic đơn giản: tìm recipe có nhiều ingredient match nhất
    let bestMatch = null
    let maxMatches = 0

    for (const recipe of recipes) {
      const matches = recipe.requiredIngredients.filter(id => 
        selectedIngredientIds.includes(id)
      ).length

      if (matches > maxMatches) {
        maxMatches = matches
        bestMatch = recipe
      }
    }

    // Fallback nếu không có match
    if (!bestMatch) {
      bestMatch = recipes[0]
    }

    return {
      success: true,
      data: bestMatch
    }
  },

  // Lấy recipe theo ID
  async getRecipeById(id) {
    await delay(400)
    const recipe = recipes.find(r => r.id === parseInt(id))
    
    if (!recipe) {
      return {
        success: false,
        error: 'Recipe not found'
      }
    }

    return {
      success: true,
      data: recipe
    }
  },

  // Lấy community recipes
  async getCommunityRecipes(limit = 10) {
    await delay(500)
    return {
      success: true,
      data: communityRecipes.slice(0, limit)
    }
  },

  // Vote cho community recipe
  async voteRecipe(recipeId) {
    await delay(300)
    const recipe = communityRecipes.find(r => r.id === recipeId)
    if (recipe) {
      recipe.votes += 1
    }
    return {
      success: true,
      data: { votes: recipe?.votes || 0 }
    }
  },

  // Lấy impact statistics
  async getImpactStats() {
    await delay(400)
    return {
      success: true,
      data: impactStats
    }
  }
}