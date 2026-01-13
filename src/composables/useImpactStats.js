// src/composables/useImpactStats.js

import { ref, onMounted } from 'vue'
import { recipeService } from '../services/recipeService'

export function useImpactStats() {
  const stats = ref({
    totalUsers: 0,
    mealsCreated: 0,
    foodSaved: 0,
    co2Reduced: 0,
    moneySaved: 0
  })
  const loading = ref(false)
  const error = ref(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getImpactStats()
      if (response.success) {
        stats.value = response.data
      } else {
        error.value = response.error || 'Không thể tải thống kê'
      }
    } catch (err) {
      error.value = 'Không thể tải thống kê'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Auto-fetch khi component mount
  onMounted(() => {
    fetchStats()
  })

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}