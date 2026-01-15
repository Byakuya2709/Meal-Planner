import { ref, onBeforeUnmount } from 'vue'
import { useToast } from 'vue-toastification'
import { recipeService } from '../services/recipeService'
import { useAuthStore } from '../stores/authStore'

const CACHE_KEY = 'community_recipes_cache'

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

  // Restore cache khi init
  const restoreCache = () => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const data = JSON.parse(cached)
        recipes.value = data.recipes || []
        currentPage.value = data.currentPage || 0
        hasMore.value = data.hasMore !== undefined ? data.hasMore : true
        totalCount.value = data.totalCount || 0
        return true
      }
    } catch (e) {
      console.error('Failed to restore cache:', e)
    }
    return false
  }

  // Save cache
  const saveCache = () => {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        recipes: recipes.value,
        currentPage: currentPage.value,
        hasMore: hasMore.value,
        totalCount: totalCount.value,
        timestamp: Date.now()
      }))
    } catch (e) {
      console.error('Failed to save cache:', e)
    }
  }

  // Clear cache
  const clearCache = () => {
    sessionStorage.removeItem(CACHE_KEY)
  }

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
        
        if (response.total !== undefined) {
          totalCount.value = response.total
        }
        
        if (response.hasMore !== undefined) {
          hasMore.value = response.hasMore
        } else if (response.total !== undefined) {
          const loadedCount = append ? recipes.value.length : response.data.length
          hasMore.value = loadedCount < response.total
        } else {
          hasMore.value = response.data.length === limit
        }
        
        if (append) {
          currentPage.value += 1
        } else {
          currentPage.value = 0
        }

        // Save to cache
        saveCache()
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
    clearCache() // Clear cache khi filter
    await fetchRecipes({ filters })
  }

  // Vote for recipe
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
        saveCache() // Update cache
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
    voteRecipe,
    restoreCache,
    clearCache
  }
}