// src/composables/useAuth.js

import { ref, computed, onMounted } from 'vue'
import { authService } from '../services/authService'
import { useRouter } from 'vue-router'

const user = ref(null)
const profile = ref(null)
const loading = ref(true)
const error = ref(null)

export function useAuth() {
  const router = useRouter()

  // Computed
  const isAuthenticated = computed(() => !!user.value)
  const userDisplayName = computed(() => {
    return profile.value?.display_name || user.value?.email || 'Anonymous'
  })
  const userAvatar = computed(() => {
    return profile.value?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.value?.id}`
  })

  // Sign up
  const signUp = async (email, password, fullName) => {
    loading.value = true
    error.value = null

    const response = await authService.signUp(email, password, fullName)
    
    loading.value = false
    return response
  }

  // Sign in
  const signIn = async (email, password) => {
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

  // Sign in with Google
  const signInWithGoogle = async () => {
    loading.value = true
    error.value = null

    const response = await authService.signInWithGoogle()
    
    loading.value = false
    return response
  }

  // Sign out
  const signOut = async () => {
    loading.value = true
    
    const response = await authService.signOut()
    
    if (response.success) {
      user.value = null
      profile.value = null
      router.push('/')
    }
    
    loading.value = false
    return response
  }

  // Load profile
  const loadProfile = async () => {
    if (!user.value) return

    const response = await authService.getUserProfile(user.value.id)
    
    if (response.success) {
      profile.value = response.data
    }
  }

  // Update profile
  const updateProfile = async (updates) => {
    if (!user.value) return { success: false, error: 'Not authenticated' }

    loading.value = true
    
    const response = await authService.updateProfile(user.value.id, updates)
    
    if (response.success) {
      profile.value = response.data
    }
    
    loading.value = false
    return response
  }

  // Initialize auth state
  const initAuth = async () => {
    loading.value = true

    const response = await authService.getCurrentUser()
    
    if (response.success && response.data) {
      user.value = response.data
      await loadProfile()
    }

    loading.value = false

    // Subscribe to auth changes
    authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        user.value = session?.user || null
        await loadProfile()
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        profile.value = null
      }
    })
  }

  // Auto init on mount (global)
  if (typeof window !== 'undefined' && !user.value && !loading.value) {
    initAuth()
  }

  return {
    user,
    profile,
    loading,
    error,
    isAuthenticated,
    userDisplayName,
    userAvatar,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    initAuth,
  }
}