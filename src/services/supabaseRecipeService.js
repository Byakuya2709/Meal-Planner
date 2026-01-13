// src/services/supabaseRecipeService.js

import { supabase } from './supabaseClient'

/**
 * Chuẩn hóa text để so sánh (bỏ dấu tiếng Việt)
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim()
}

/**
 * Cache đơn giản cho ingredients (tránh query lặp lại)
 */
let ingredientsCache = null
let ingredientsCacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 phút

/**
 * Logger wrapper - chỉ log trong development
 */
const log = (message, data) => {
  if (import.meta.env.DEV) {
    console.log(`[Supabase] ${message}`, data || '')
  }
}

/**
 * Error handler
 */
const handleError = (context, error) => {
  console.error(`[Supabase Error] ${context}:`, error)
  return { 
    success: false, 
    error: error.message || 'Đã có lỗi xảy ra' 
  }
}

export const supabaseRecipeService = {


  async getIngredients() {
    try {
      // Kiểm tra cache
      const now = Date.now()
      if (ingredientsCache && (now - ingredientsCacheTime) < CACHE_DURATION) {
        log('Using cached ingredients')
        return { success: true, data: ingredientsCache }
      }

      log('Fetching ingredients from Supabase')
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('name')
      
      if (error) throw error
      
      // Update cache
      ingredientsCache = data
      ingredientsCacheTime = now
      
      return { success: true, data }
    } catch (error) {
      return handleError('getIngredients', error)
    }
  },

  /**
   * Lấy ingredient theo category
   */
  async getIngredientsByCategory(category) {
    try {
      log('Fetching ingredients by category:', category)
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('category', category)
        .order('name')
      
      if (error) throw error
      
      return { success: true, data }
    } catch (error) {
      return handleError('getIngredientsByCategory', error)
    }
  },

  /**
   * Tìm recipe phù hợp với ingredients đã chọn
   */
  async findRecipe(selectedIngredientIds) {
    try {
      log('Finding recipe for ingredients:', selectedIngredientIds)
      
      // 1. Lấy tên của các ingredients đã chọn
      const { data: selectedIngredients, error: ingredientsError } = await supabase
        .from('ingredients')
        .select('name')
        .in('id', selectedIngredientIds)
      
      if (ingredientsError) throw ingredientsError
      
      const ingredientNames = selectedIngredients.map(ing => normalizeText(ing.name))
      log('Normalized ingredient names:', ingredientNames)
      
      // 2. Tìm recipes match bằng stored function
      const { data: matchedRecipes, error: searchError } = await supabase
        .rpc('search_recipes_by_ingredients', {
          ingredient_names: ingredientNames,
          is_community_filter: false
        })
      
      if (searchError) throw searchError
      
      if (!matchedRecipes || matchedRecipes.length === 0) {
        log('No matches found, using fallback')
        // Fallback: lấy recipe đầu tiên
        const { data: fallbackRecipes, error: fallbackError } = await supabase
          .from('recipes')
          .select('*')
          .eq('is_community', false)
          .order('created_at', { ascending: false })
          .limit(1)
        
        if (fallbackError) throw fallbackError
        
        return {
          success: true,
          data: fallbackRecipes[0] || null
        }
      }
      
      // 3. Lấy thông tin chi tiết recipe có điểm cao nhất
      const { data: recipe, error: recipeError } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', matchedRecipes[0].recipe_id)
        .single()
      
      if (recipeError) throw recipeError
      
      log('Found recipe:', recipe.title)
      
      return {
        success: true,
        data: recipe,
        debug: import.meta.env.DEV ? {
          matchScore: matchedRecipes[0].match_score,
          topMatches: matchedRecipes.slice(0, 3).map(m => ({
            title: m.recipe_title,
            score: m.match_score
          }))
        } : undefined
      }
      
    } catch (error) {
      return handleError('findRecipe', error)
    }
  },

  /**
   * Lấy recipe theo ID
   */
  async getRecipeById(id) {
    try {
      log('Fetching recipe by ID:', id)
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      return { success: true, data }
    } catch (error) {
      return handleError('getRecipeById', error)
    }
  },

  /**
   * Lấy community recipes
   */
  async getCommunityRecipes(limit = 10, filterIngredients = []) {
    try {
      log('Fetching community recipes', { limit, filterIngredients })
      
      // Nếu có filter ingredients
      if (filterIngredients.length > 0) {
        const { data: selectedIngredients } = await supabase
          .from('ingredients')
          .select('name')
          .in('id', filterIngredients)
        
        const ingredientNames = selectedIngredients.map(ing => normalizeText(ing.name))
        
        const { data: matchedRecipes, error: searchError } = await supabase
          .rpc('search_recipes_by_ingredients', {
            ingredient_names: ingredientNames,
            is_community_filter: true
          })
        
        if (searchError) throw searchError
        
        if (matchedRecipes && matchedRecipes.length > 0) {
          const recipeIds = matchedRecipes.slice(0, limit).map(r => r.recipe_id)
          
          const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .in('id', recipeIds)
            .eq('is_community', true)
          
          if (error) throw error
          return { success: true, data }
        } else {
          return { success: true, data: [] }
        }
      }
      
      // Không có filter
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_community', true)
        .order('like_count', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) throw error
      
      return { success: true, data }
      
    } catch (error) {
      return handleError('getCommunityRecipes', error)
    }
  },

  /**
   * Vote cho recipe (optimistic update)
   */
  // src/services/supabaseRecipeService.js (CẬP NHẬT vote methods)
  
  /**
   * Vote cho recipe (chỉ dành cho authenticated users)
   */
  async voteRecipe(recipeId) {
    try {
      // Lấy user hiện tại từ Supabase Auth
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return {
          success: false,
          error: 'Vui lòng đăng nhập để thích công thức',
          requireAuth: true
        }
      }
      
      log('Voting recipe:', { recipeId, userId: user.id })
      
      // 1. Kiểm tra đã like chưa
      const { data: existingLike, error: checkError } = await supabase
        .from('user_likes')
        .select('*')
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)
        .maybeSingle()
      
      if (checkError) throw checkError
      
      if (existingLike) {
        return {
          success: false,
          error: 'Bạn đã thích công thức này rồi'
        }
      }
      
      // 2. Thêm like
      const { error: likeError } = await supabase
        .from('user_likes')
        .insert({ 
          user_id: user.id, 
          recipe_id: recipeId 
        })
      
      if (likeError) throw likeError
      
      // 3. Tăng like_count
      const { data: recipeData, error: fetchError } = await supabase
        .from('recipes')
        .select('like_count')
        .eq('id', recipeId)
        .single()
      
      if (fetchError) throw fetchError
      
      const newLikeCount = (recipeData.like_count || 0) + 1
      
      const { error: updateError } = await supabase
        .from('recipes')
        .update({ like_count: newLikeCount })
        .eq('id', recipeId)
      
      if (updateError) throw updateError
      
      log('Vote successful, new count:', newLikeCount)
      
      return {
        success: true,
        data: { likeCount: newLikeCount }
      }
      
    } catch (error) {
      return handleError('voteRecipe', error)
    }
  },
  
  /**
   * Unlike recipe
   */
  async unlikeRecipe(recipeId) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return {
          success: false,
          error: 'Vui lòng đăng nhập',
          requireAuth: true
        }
      }
      
      log('Unliking recipe:', { recipeId, userId: user.id })
      
      // 1. Xóa like
      const { error: deleteError } = await supabase
        .from('user_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)
      
      if (deleteError) throw deleteError
      
      // 2. Giảm like_count
      const { data: recipeData, error: fetchError } = await supabase
        .from('recipes')
        .select('like_count')
        .eq('id', recipeId)
        .single()
      
      if (fetchError) throw fetchError
      
      const newLikeCount = Math.max(0, (recipeData.like_count || 0) - 1)
      
      const { error: updateError } = await supabase
        .from('recipes')
        .update({ like_count: newLikeCount })
        .eq('id', recipeId)
      
      if (updateError) throw updateError
      
      log('Unlike successful, new count:', newLikeCount)
      
      return {
        success: true,
        data: { likeCount: newLikeCount }
      }
      
    } catch (error) {
      return handleError('unlikeRecipe', error)
    }
  },
  
  /**
   * Kiểm tra user đã like recipe chưa
   */
  async checkUserLiked(recipeId) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return { success: true, data: false }
      }
      
      const { data, error } = await supabase
        .from('user_likes')
        .select('recipe_id')
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)
        .maybeSingle()
      
      if (error) throw error
      
      return { success: true, data: !!data }
      
    } catch (error) {
      return handleError('checkUserLiked', error)
    }
  },

  /**
   * Lấy impact statistics
   */
  async getImpactStats() {
    try {
      log('Fetching impact stats')
      const { data, error } = await supabase
        .from('impact_stats')
        .select('*')
        .eq('id', 1)
        .single()
      
      if (error) throw error
      
      return {
        success: true,
        data: {
          totalUsers: data.total_users,
          mealsCreated: data.meals_created,
          foodSaved: data.food_saved_kg,
          co2Reduced: data.co2_reduced_kg,
          moneySaved: data.money_saved_vnd
        }
      }
    } catch (error) {
      return handleError('getImpactStats', error)
    }
  },

  /**
   * Increment impact stats khi user tạo meal mới
   */
  async incrementMealCreated() {
    try {
      log('Incrementing meal created stats')
      
      const { data, error: fetchError } = await supabase
        .from('impact_stats')
        .select('*')
        .eq('id', 1)
        .single()
      
      if (fetchError) throw fetchError
      
      const { error: updateError } = await supabase
        .from('impact_stats')
        .update({
          meals_created: data.meals_created + 1,
          food_saved_kg: parseFloat((data.food_saved_kg + 0.5).toFixed(2)),
          co2_reduced_kg: parseFloat((data.co2_reduced_kg + 0.35).toFixed(2)),
          money_saved_vnd: data.money_saved_vnd + 25000
        })
        .eq('id', 1)
      
      if (updateError) throw updateError
      
      log('Stats incremented successfully')
      
      return { success: true }
    } catch (error) {
      return handleError('incrementMealCreated', error)
    }
  },



    /**
   * Lấy danh sách recipe_id mà user đã like
   */
  async getUserLikedRecipes() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: true, data: [] }
      }

      log('Fetching user liked recipes for user:', user.id)
      
      const { data, error } = await supabase
        .from('user_likes')
        .select('recipe_id')
        .eq('user_id', user.id)
      
      if (error) throw error
      
      const recipeIds = (data || []).map(item => item.recipe_id)
      
      return { success: true, data: recipeIds }
    } catch (error) {
      return handleError('getUserLikedRecipes', error)
    }
  },

  /**
   * Clear cache (cho testing)
   */
  clearCache() {
    ingredientsCache = null
    ingredientsCacheTime = 0
    log('Cache cleared')
  }
}