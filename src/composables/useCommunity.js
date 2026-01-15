// src/composables/useCommunity.js - FIXED PAGINATION LOGIC

import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { recipeService } from '../services/recipeService'
import { useAuthStore } from '../stores/authStore'

export function useCommunity() {
  const recipes = ref([])
  const loading = ref(false)
  const error = ref(null)
  const hasMore = ref(true)
  const currentPage = ref(0)
  const pageSize = ref(6)
  const totalCount = ref(0)
  
  const toast = useToast()
  const authStore = useAuthStore()

  // Fetch community recipes với pagination và filters
  const fetchRecipes = async (options = {}) => {
    const {
      append = false,
      limit = pageSize.value,
      offset = 0,
      filters = {}
    } = options

    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getCommunityRecipes({
        limit,
        offset,
        ...filters
      })
      
      if (response.success) {
        if (append) {
          recipes.value = [...recipes.value, ...response.data]
        } else {
          recipes.value = response.data
        }
        
        // Cập nhật total count nếu có
        if (response.total !== undefined) {
          totalCount.value = response.total
        }
        
        // Kiểm tra còn data không dựa trên:
        // 1. Response có hasMore field
        // 2. Hoặc so sánh với total
        // 3. Hoặc check data length < limit
        if (response.hasMore !== undefined) {
          hasMore.value = response.hasMore
        } else if (response.total !== undefined) {
          const loadedCount = append ? recipes.value.length : response.data.length
          hasMore.value = loadedCount < response.total
        } else {
          // Fallback: nếu data trả về ít hơn limit thì hết rồi
          hasMore.value = response.data.length === limit
        }
        
        if (append) {
          currentPage.value += 1
        } else {
          currentPage.value = 0
        }
      } else {
        error.value = response.error || 'Không thể tải công thức cộng đồng'
        toast.error(error.value)
      }
    } catch (err) {
      error.value = 'Không thể tải công thức cộng đồng'
      toast.error(error.value)
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Load more recipes
  const loadMore = async (filters = {}) => {
    if (!hasMore.value || loading.value) return
    
    const offset = (currentPage.value + 1) * pageSize.value
    await fetchRecipes({
      append: true,
      offset,
      filters
    })
  }

  // Reset và fetch lại từ đầu (khi filter thay đổi)
  const resetAndFetch = async (filters = {}) => {
    currentPage.value = 0
    hasMore.value = true
    await fetchRecipes({ filters })
  }

  // Vote for recipe - yêu cầu đăng nhập
  const voteRecipe = async (recipeId) => {
    if (!authStore.isAuthenticated) {
      error.value = 'Vui lòng đăng nhập để thích công thức'
      toast.warning('Vui lòng đăng nhập để thích công thức')
      return { success: false, requireAuth: true }
    }

    const recipe = recipes.value.find(r => r.id === recipeId || r._id === recipeId)
    
    if (!recipe) return { success: false }
    
    try {
      const response = await recipeService.voteRecipe(recipeId)
      
      if (response.success) {
        recipe.like_count = response.data.likeCount
        recipe.likeCount = response.data.likeCount
        toast.success('Đã thích công thức! 👍')
        return { success: true }
      } else {
        if (response.error && response.error.includes('đã thích')) {
          toast.info('Bạn đã thích công thức này rồi! ❤️')
          return { success: false, alreadyLiked: true }
        }
        
        error.value = response.error
        toast.error(response.error || 'Không thể thích công thức')
        return response
      }
    } catch (err) {
      console.error(err)
      toast.error('Đã có lỗi xảy ra')
      return { success: false }
    }
  }

  return {
    recipes,
    loading,
    error,
    hasMore,
    currentPage,
    totalCount,
    fetchRecipes,
    loadMore,
    resetAndFetch,
    voteRecipe
  }
}