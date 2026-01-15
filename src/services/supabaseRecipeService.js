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
 * Parse ingredients_list_fixed để lấy danh sách ingredient IDs
 */
const parseIngredientsListFixed = (ingredientsListFixed) => {
  if (!ingredientsListFixed || !Array.isArray(ingredientsListFixed)) {
    return []
  }
  
  return ingredientsListFixed.map(str => {
    // Format: "ingredient_id quantity" (ví dụ: "pepper 2", "shrimp 300g")
    return str.trim().split(/\s+/)[0].toLowerCase()
  }).filter(Boolean)
}

/**
 * Enrich recipe với thông tin nguyên liệu chính và phụ
 */
const enrichRecipeWithIngredientTypes = async (recipe) => {
  try {
    // Parse tất cả ingredients từ ingredients_list_fixed
    const allIngredientIds = parseIngredientsListFixed(recipe.ingredients_list_fixed)
    
    if (allIngredientIds.length === 0) {
      return recipe
    }
    
    // Lấy thông tin chi tiết của tất cả ingredients
    const { data: ingredientsData, error } = await supabase
      .from('ingredients')
      .select('*')
      .in('id', allIngredientIds)
    
    if (error) throw error
    
    // Tạo map để dễ lookup
    const ingredientsMap = {}
    ingredientsData.forEach(ing => {
      ingredientsMap[ing.id] = ing
    })
    
    // Lấy danh sách required ingredients từ recipe_ingredients
    const { data: recipeIngredientsData, error: riError } = await supabase
      .from('recipe_ingredients')
      .select('ingredient_id')
      .eq('recipe_id', recipe.id)
    
    const requiredIds = riError ? [] : (recipeIngredientsData || []).map(ri => ri.ingredient_id)
    
    // Phân loại nguyên liệu
    const mainIngredients = []      // Nguyên liệu chính (required)
    const secondaryIngredients = [] // Nguyên liệu phụ (gia vị, optional)
    
    allIngredientIds.forEach(id => {
      const ingredient = ingredientsMap[id]
      if (!ingredient) return
      
      if (requiredIds.includes(id)) {
        mainIngredients.push(ingredient)
      } else {
        secondaryIngredients.push(ingredient)
      }
    })
    
    return {
      ...recipe,
      mainIngredients,      // Nguyên liệu chính
      secondaryIngredients, // Nguyên liệu phụ (gia vị)
      allIngredientIds      // Tất cả ingredient IDs để fallback search
    }
  } catch (error) {
    log('Error enriching recipe:', error)
    return recipe
  }
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
   * Tìm nhiều recipes phù hợp với ingredients đã chọn (CẢI TIẾN với fallback)
   * Tìm trong recipe_ingredients (requiredIngredients) trước
   * Nếu không tìm thấy thì fallback sang ingredients_list_fixed
   */
  async findRecipesByIngredients(selectedIngredientIds) {
    try {
      log('Finding multiple recipes for ingredients:', selectedIngredientIds)
      
      // 1. Lấy thông tin đầy đủ của các ingredients đã chọn
      const { data: selectedIngredients, error: ingredientsError } = await supabase
        .from('ingredients')
        .select('*')
        .in('id', selectedIngredientIds)
      
      if (ingredientsError) throw ingredientsError
      
      log('Selected ingredients:', selectedIngredients.map(i => ({ id: i.id, name: i.name })))
      
      // 2. BƯỚC 1: Tìm trong recipe_ingredients (requiredIngredients)
      const { data: allRecipeIngredients, error: riError } = await supabase
        .from('recipe_ingredients')
        .select('recipe_id, ingredient_id')
      
      if (riError) throw riError
      
      log(`Total recipe_ingredients entries: ${allRecipeIngredients.length}`)
      
      // 3. Nhóm theo recipe_id và tính điểm
      const recipeMatchMap = {}
      
      allRecipeIngredients.forEach(ri => {
        if (!recipeMatchMap[ri.recipe_id]) {
          recipeMatchMap[ri.recipe_id] = {
            allIngredients: [],
            matchedIngredients: []
          }
        }
        
        recipeMatchMap[ri.recipe_id].allIngredients.push(ri.ingredient_id)
        
        if (selectedIngredientIds.includes(ri.ingredient_id)) {
          recipeMatchMap[ri.recipe_id].matchedIngredients.push(ri.ingredient_id)
        }
      })
      
      // 4. Lọc recipes có ít nhất 1 ingredient khớp
      let matchedRecipeIds = Object.keys(recipeMatchMap).filter(
        recipeId => recipeMatchMap[recipeId].matchedIngredients.length > 0
      )
      
      log(`Found ${matchedRecipeIds.length} recipes matching in recipe_ingredients (required only)`)
      
      // 5. BƯỚC 2: FALLBACK - Nếu không tìm thấy trong requiredIngredients
      //    Tìm trong ingredients_list_fixed (bao gồm cả gia vị phụ)
      if (matchedRecipeIds.length === 0) {
        log('⚠️  No matches in recipe_ingredients (required), fallback to ingredients_list_fixed...')
        
        const { data: allRecipes, error: allRecipesError } = await supabase
          .from('recipes')
          .select('id, ingredients_list_fixed')
          .eq('is_community', false)
        
        if (allRecipesError) throw allRecipesError
        
        log(`Checking ${allRecipes.length} recipes in fallback...`)
        
        // Tìm trong ingredients_list_fixed
        allRecipes.forEach(recipe => {
          const allIngredientIds = parseIngredientsListFixed(recipe.ingredients_list_fixed)
          const matchedIds = allIngredientIds.filter(id => selectedIngredientIds.includes(id))
          
          if (matchedIds.length > 0) {
            recipeMatchMap[recipe.id] = {
              allIngredients: allIngredientIds,
              matchedIngredients: matchedIds,
              isFromFallback: true // Đánh dấu là từ fallback
            }
            matchedRecipeIds.push(recipe.id)
          }
        })
        
        log(`✅ Found ${matchedRecipeIds.length} recipes from ingredients_list_fixed fallback`)
      }
      
      // 6. Nếu vẫn không có kết quả
      if (matchedRecipeIds.length === 0) {
        log('❌ No matches found anywhere, using random fallback')
        const { data: fallbackRecipes, error: fallbackError } = await supabase
          .from('recipes')
          .select('*')
          .eq('is_community', false)
          .order('like_count', { ascending: false })
          .limit(3)
        
        if (fallbackError) throw fallbackError
        
        return {
          success: true,
          data: await Promise.all((fallbackRecipes || []).map(async recipe => {
            const enriched = await enrichRecipeWithIngredientTypes(recipe)
            return {
              ...enriched,
              matchScore: 20,
              matchedCount: 0,
              totalRequired: 0,
              matchedIngredients: []
            }
          }))
        }
      }
      
      // 7. Lấy thông tin chi tiết của các recipes match
      const { data: recipes, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .in('id', matchedRecipeIds)
        .eq('is_community', false)
      
      if (recipesError) throw recipesError
      
      log(`Retrieved ${recipes.length} full recipe details`)
      
      // 8. Enrich recipes với thông tin match và tính điểm
      const enrichedRecipes = await Promise.all(recipes.map(async recipe => {
        const matchData = recipeMatchMap[recipe.id]
        const matchedIngredientIds = matchData.matchedIngredients
        const totalRecipeIngredients = matchData.allIngredients.length
        const matchedCount = matchedIngredientIds.length
        const totalSelected = selectedIngredientIds.length
        
        // Lấy thông tin chi tiết các ingredients đã khớp
        const matchedIngredientsList = matchedIngredientIds
          .map(id => selectedIngredients.find(ing => ing.id === id))
          .filter(Boolean)
        
        // Tính điểm match
        const matchRatio = matchedCount / totalSelected
        const coverageRatio = matchedCount / totalRecipeIngredients
        const simplicityScore = Math.max(0, (6 - totalRecipeIngredients) / 6)
        
        // Nếu là từ fallback, giảm điểm một chút
        const fallbackPenalty = matchData.isFromFallback ? 0.8 : 1.0
        
        const matchScore = Math.round(
          ((matchRatio * 60) + 
          (coverageRatio * 25) + 
          (simplicityScore * 15)) * fallbackPenalty
        )
        
        // Enrich với thông tin nguyên liệu chính/phụ
        const enriched = await enrichRecipeWithIngredientTypes(recipe)
        
        return {
          ...enriched,
          matchScore,
          matchedCount,
          totalRequired: totalRecipeIngredients,
          matchedIngredients: matchedIngredientsList,
          matchSource: matchData.isFromFallback ? 'fallback' : 'primary' // Debug info
        }
      }))
      
      // 9. Sắp xếp theo độ ưu tiên
      enrichedRecipes.sort((a, b) => {
        // Ưu tiên món match từ requiredIngredients
        if (a.matchSource !== b.matchSource) {
          return a.matchSource === 'primary' ? -1 : 1
        }
        // Số nguyên liệu khớp
        if (b.matchedCount !== a.matchedCount) {
          return b.matchedCount - a.matchedCount
        }
        // Điểm match
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore
        }
        // Món đơn giản hơn
        return a.totalRequired - b.totalRequired
      })
      
      // 10. Lấy top 3
      const topRecipes = enrichedRecipes.slice(0, 3)
      
      log('✅ Final top 3:', topRecipes.map(r => ({
        title: r.title,
        matchedCount: r.matchedCount,
        matchScore: r.matchScore,
        matchSource: r.matchSource,
        mainIngredients: r.mainIngredients?.map(i => i.name) || [],
        secondaryIngredients: r.secondaryIngredients?.map(i => i.name) || []
      })))
      
      return {
        success: true,
        data: topRecipes
      }
      
    } catch (error) {
      return handleError('findRecipesByIngredients', error)
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
      
      // Enrich với thông tin nguyên liệu chính/phụ
      const enriched = await enrichRecipeWithIngredientTypes(data)
      
      return { success: true, data: enriched }
    } catch (error) {
      return handleError('getRecipeById', error)
    }
  },

  /**
   * Lấy community recipes với pagination và filters - SỬ DỤNG RPC
   */
  async getCommunityRecipes(options = {}) {
    try {
      const {
        limit = 6,
        offset = 0,
        difficulty = '',
        cookingTime = '',
        ingredientCount = '',
        sortBy = 'latest'
      } = options
  
      log('Fetching community recipes', options)
      
      const { data, error } = await supabase.rpc('get_community_recipes_filtered', {
        p_limit: limit,
        p_offset: offset,
        p_difficulty: difficulty ? parseInt(difficulty) : null,
        p_cooking_time: cookingTime ? parseInt(cookingTime) : null,
        p_ingredient_count: ingredientCount ? parseInt(ingredientCount) : null,
        p_sort_by: sortBy
      })
      
      if (error) throw error
      
      const totalCount = data.length > 0 ? data[0].total_count : 0
      
      // Remove total_count từ mỗi row
      const cleanData = data.map(({ total_count, ...rest }) => rest)
      
      log('Fetched recipes:', { 
        returned: cleanData.length, 
        total: totalCount, 
        offset, 
        limit,
        hasMore: offset + cleanData.length < totalCount
      })
      
      return {
        success: true,
        data: cleanData,
        total: totalCount,
        hasMore: offset + cleanData.length < totalCount
      }
      
    } catch (error) {
      return handleError('getCommunityRecipes', error)
    }
  },

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