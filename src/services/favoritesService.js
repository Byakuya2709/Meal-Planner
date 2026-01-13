// src/services/favoritesService.js

import { supabase } from './supabaseClient'

export const favoritesService = {
  /**
   * Thêm recipe vào favorites
   */
  async addFavorite(recipeId) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.warn('[Favorites] User not authenticated')
        return {
          success: false,
          error: 'Vui lòng đăng nhập để lưu món yêu thích',
        }
      }

      console.log('[Favorites] Adding favorite:', { userId: user.id, recipeId })

      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          recipe_id: recipeId,
        })
        .select()

      if (error) {
        console.error('[Favorites] Insert error:', error)
        
        // Check duplicate
        if (error.code === '23505') {
          return {
            success: false,
            error: 'Món này đã có trong danh sách yêu thích',
          }
        }
        
        throw error
      }

      console.log('[Favorites] Added successfully:', data)
      return { success: true, data }
    } catch (error) {
      console.error('[Favorites] Add favorite error:', error)
      return {
        success: false,
        error: error.message || 'Không thể lưu món yêu thích',
      }
    }
  },

  /**
   * Xóa recipe khỏi favorites
   */
  async removeFavorite(recipeId) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'Vui lòng đăng nhập' }
      }

      console.log('[Favorites] Removing favorite:', { userId: user.id, recipeId })

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)

      if (error) throw error

      console.log('[Favorites] Removed successfully')
      return { success: true }
    } catch (error) {
      console.error('[Favorites] Remove favorite error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Kiểm tra recipe đã được favorite chưa
   */
  async isFavorite(recipeId) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return { success: true, data: false }

      const { data, error } = await supabase
        .from('user_favorites')
        .select('recipe_id')
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      return { success: true, data: !!data }
    } catch (error) {
      console.error('[Favorites] Check favorite error:', error)
      return { success: false, error: error.message }
    }
  },

  /**
   * Lấy danh sách favorites của user
   */
  async getUserFavorites() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.warn('[Favorites] User not authenticated for getUserFavorites')
        return { success: false, error: 'Vui lòng đăng nhập' }
      }

      console.log('[Favorites] Fetching favorites for user:', user.id)

      // Bước 1: Lấy danh sách recipe_id từ user_favorites
      const { data: favoriteRecords, error: favError } = await supabase
        .from('user_favorites')
        .select('recipe_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (favError) {
        console.error('[Favorites] Error fetching favorites:', favError)
        throw favError
      }

      console.log('[Favorites] Found favorite records:', favoriteRecords?.length || 0)

      if (!favoriteRecords || favoriteRecords.length === 0) {
        return { success: true, data: [] }
      }

      // Bước 2: Lấy chi tiết recipes từ bảng recipes
      const recipeIds = favoriteRecords.map(f => f.recipe_id)
      console.log('[Favorites] Fetching recipes:', recipeIds)

      const { data: recipes, error: recipeError } = await supabase
        .from('recipes')
        .select('*')
        .in('id', recipeIds)

      if (recipeError) {
        console.error('[Favorites] Error fetching recipes:', recipeError)
        throw recipeError
      }

      console.log('[Favorites] Found recipes:', recipes?.length || 0)

      // Lọc null và sort theo thứ tự created_at
      const validRecipes = (recipes || []).filter(r => r !== null)
      
      return {
        success: true,
        data: validRecipes,
      }
    } catch (error) {
      console.error('[Favorites] Get favorites error:', error)
      return {
        success: false,
        error: error.message || 'Không thể tải danh sách yêu thích',
      }
    }
  },
}