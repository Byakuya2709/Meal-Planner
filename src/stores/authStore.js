// src/stores/authStore.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const isInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  
  const userDisplayName = computed(() => {
    return profile.value?.display_name || user.value?.email?.split('@')[0] || 'Anonymous'
  })
  
  const userAvatar = computed(() => {
    return profile.value?.avatar_url || 
           `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.value?.id || 'default'}`
  })

  const userEmail = computed(() => user.value?.email || '')

  // Actions
  async function signUp(email, password, fullName) {
    loading.value = true
    error.value = null

    const response = await authService.signUp(email, password, fullName)
    
    if (response.success) {
      user.value = response.data
      await loadProfile()
    } else {
      error.value = response.error
    }
    
    loading.value = false
    return response
  }

  async function signIn(email, password) {
    loading.value = true
    error.value = null

    const response = await authService.signIn(email, password)
    
    if (response.success) {
      user.value = response.data
      await loadProfile()
    } else {
      error.value = response.error
    }

    loading.value = false
    return response
  }

  async function signInWithGoogle() {
    loading.value = true
    error.value = null

    const response = await authService.signInWithGoogle()
    
    loading.value = false
    return response
  }

  async function signOut() {
    loading.value = true
    
    const response = await authService.signOut()
    
    if (response.success) {
      user.value = null
      profile.value = null
      error.value = null
      isInitialized.value = false
    }
    
    loading.value = false
    return response
  }

  async function loadProfile() {
    if (!user.value) return

    const response = await authService.getUserProfile(user.value.id)
    
    if (response.success) {
      profile.value = response.data
    }
  }

  async function updateProfile(updates) {
    if (!user.value) {
      return { success: false, error: 'Not authenticated' }
    }

    loading.value = true
    
    const response = await authService.updateProfile(user.value.id, updates)
    
    if (response.success) {
      profile.value = response.data
    }
    
    loading.value = false
    return response
  }

  async function initAuth() {
    if (isInitialized.value) return

    loading.value = true

    // Nếu có user trong localStorage (từ persist), verify lại với Supabase
    if (user.value) {
      console.log('🔄 Found user in storage, verifying...')
      const response = await authService.getCurrentUser()
      
      if (response.success && response.data) {
        // Token còn valid, update user data
        user.value = response.data
        await loadProfile()
        console.log('✅ User verified and restored')
      } else {
        // Token expired hoặc invalid, clear user
        console.log('❌ Token expired, clearing user')
        user.value = null
        profile.value = null
      }
    } else {
      // Không có user trong storage, check session
      const response = await authService.getCurrentUser()
      
      if (response.success && response.data) {
        user.value = response.data
        await loadProfile()
      }
    }

    loading.value = false
    isInitialized.value = true

    // Subscribe to auth changes
    authService.onAuthStateChange(async (event, session) => {
      console.log('🔐 Auth state changed:', event)
      
      if (event === 'SIGNED_IN' && session?.user) {
        user.value = session.user
        await loadProfile()
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        profile.value = null
        isInitialized.value = false
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        user.value = session.user
      } else if (event === 'USER_UPDATED' && session?.user) {
        user.value = session.user
        await loadProfile()
      }
    })
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    user,
    profile,
    loading,
    error,
    isInitialized,
    // Getters
    isAuthenticated,
    userDisplayName,
    userAvatar,
    userEmail,
    // Actions
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    loadProfile,
    updateProfile,
    initAuth,
    clearError,
  }
}, {
  // QUAN TRỌNG: Cấu hình persist
  persist: {
    key: 'auth-storage',
    storage: localStorage,
    paths: ['user', 'profile'], // Chỉ lưu user và profile
    // Thời gian expire: 7 ngày
    beforeRestore: (context) => {
      console.log('🔄 Restoring auth state from storage...')
    },
    afterRestore: (context) => {
      console.log('✅ Auth state restored:', !!context.store.user)
    },
  }
})