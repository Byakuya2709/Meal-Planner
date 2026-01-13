// src/stores/authStore.js - TỐI ƯU SPEED

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

  // Helper: Clear all user-related stores
  async function clearUserStores() {
    try {
      
      // Dynamic import để tránh circular dependency
      const [favoritesModule, likesModule] = await Promise.all([
        import('./favoritesStore'),
        import('./likesStore')
      ])
      
      const favoritesStore = favoritesModule.useFavoritesStore()
      const likesStore = likesModule.useLikesStore()
      
      favoritesStore.$reset()
      likesStore.$reset()
      
      // Clear localStorage manually
      localStorage.removeItem('favorites-storage')
      localStorage.removeItem('likes-storage')
      
    } catch (err) {
      console.error('[AuthStore] Error clearing user stores:', err)
    }
  }

  // Actions
  async function signUp(email, password, fullName) {
    loading.value = true
    error.value = null

    const response = await authService.signUp(email, password, fullName)
    
    if (response.success) {
      user.value = response.data
      // Load profile trong background, không block UI
      loadProfile().catch(err => console.error('[AuthStore] Profile load error:', err))
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
      console.log('[AuthStore] Sign in success, user:', user.value?.email)
      
      // KHÔNG CHỜ loadProfile, để nó chạy background
      loadProfile().catch(err => console.error('[AuthStore] Profile load error:', err))
      
      // Return ngay để UI không bị block
      loading.value = false
      return response
    } else {
      error.value = response.error
      console.error('[AuthStore] Sign in error:', response.error)
      loading.value = false
      return response
    }
  }

  async function signInWithGoogle() {
    loading.value = true
    error.value = null

    const response = await authService.signInWithGoogle()
    
    loading.value = false
    return response
  }

  async function signOut() {
    console.log('[AuthStore] Signing out...')
    
    // Clear state trước để UI update nhanh
    user.value = null
    profile.value = null
    error.value = null
    
    // Clear stores trong background
    clearUserStores().catch(err => console.error('[AuthStore] Clear stores error:', err))
    
    // Call signOut API trong background
    authService.signOut().then(response => {
      if (response.success) {
        console.log('[AuthStore] Signed out from server')
      }
    })
    
    return { success: true }
  }

  async function loadProfile() {
    if (!user.value) {
      console.log('[AuthStore] No user to load profile')
      return
    }

    console.log('[AuthStore] Loading profile for user:', user.value.id)
    const response = await authService.getUserProfile(user.value.id)
    
    if (response.success) {
      profile.value = response.data
      console.log('[AuthStore] Profile loaded:', profile.value?.display_name)
    } else {
      console.warn('[AuthStore] Profile load failed, using defaults')
      // Tạo profile mặc định từ user data
      profile.value = {
        display_name: user.value.email?.split('@')[0],
        avatar_url: null
      }
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
    if (isInitialized.value) {
      console.log('[AuthStore] Already initialized')
      return
    }

    console.log('[AuthStore] Initializing auth...')

    // CHỈ check session, không gọi API nếu đã có user trong localStorage
    if (user.value) {
      console.log('[AuthStore] Found cached user:', user.value.email)
      isInitialized.value = true
      
      // Verify session trong background
      authService.getCurrentUser().then(response => {
        if (response.success && response.data) {
          user.value = response.data
          console.log('[AuthStore] Session verified')
          if (!profile.value) {
            loadProfile().catch(err => console.error('[AuthStore] Profile load error:', err))
          }
        } else {
          console.warn('[AuthStore] Session expired, clearing user')
          user.value = null
          profile.value = null
        }
      })
      
      return
    }

    // Nếu không có cached user, check với server
    loading.value = true
    const response = await authService.getCurrentUser()
    
    if (response.success && response.data) {
      user.value = response.data
      console.log('[AuthStore] Current user loaded:', user.value.email)
      loadProfile().catch(err => console.error('[AuthStore] Profile load error:', err))
    } else {
      console.log('[AuthStore] No current user')
    }

    loading.value = false
    isInitialized.value = true

    // Subscribe to auth changes
    authService.onAuthStateChange(async (event, session) => {
      console.log('[AuthStore] Auth state changed:', event)
      
      if (event === 'SIGNED_IN' && session?.user) {
        user.value = session.user
        loadProfile().catch(err => console.error('[AuthStore] Profile load error:', err))
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        profile.value = null
        clearUserStores().catch(err => console.error('[AuthStore] Clear stores error:', err))
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        user.value = session.user
        console.log('[AuthStore] Token refreshed')
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
  persist: {
    key: 'auth-storage',
    storage: localStorage,
    paths: ['user', 'profile']
  }
})