// src/services/authService.js

import { supabase } from './supabaseClient'

/**
 * Authentication Service với Supabase Auth
 */
export const authService = {
  /**
   * Đăng ký tài khoản mới
   */
  async signUp(email, password, fullName) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      return {
        success: true,
        data: data.user,
        message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.',
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return {
        success: false,
        error: error.message || 'Đăng ký thất bại',
      }
    }
  },

  /**
   * Đăng nhập
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return {
        success: true,
        data: data.user,
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return {
        success: false,
        error: error.message || 'Đăng nhập thất bại',
      }
    }
  },

  /**
   * Đăng nhập với Google
   */
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Google sign in error:', error)
      return {
        success: false,
        error: error.message || 'Đăng nhập Google thất bại',
      }
    }
  },

  /**
   * Đăng xuất
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      return {
        success: false,
        error: error.message || 'Đăng xuất thất bại',
      }
    }
  },

  /**
   * Lấy user hiện tại
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) throw error

      return {
        success: true,
        data: user,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Lấy profile của user
   */
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Get profile error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Cập nhật profile
   */
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Update profile error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Đổi mật khẩu
   */
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      return {
        success: true,
        message: 'Đổi mật khẩu thành công',
      }
    } catch (error) {
      console.error('Update password error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Reset mật khẩu
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      return {
        success: true,
        message: 'Đã gửi email reset mật khẩu',
      }
    } catch (error) {
      console.error('Reset password error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Subscribe auth state changes
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },
}