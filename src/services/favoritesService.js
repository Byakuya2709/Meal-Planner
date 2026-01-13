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
        return {
          success: false,
          error: 'Vui lòng đăng nhập để lưu món yêu thích',
        }
      }

      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          recipe_id: recipeId,
        })

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Add favorite error:', error)
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

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Remove favorite error:', error)
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
      console.error('Check favorite error:', error)
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
        return { success: false, error: 'Vui lòng đăng nhập' }
      }

      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          recipe_id,
          created_at,
          recipes (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        data: data.map(item => item.recipes),
      }
    } catch (error) {
      console.error('Get favorites error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },
}