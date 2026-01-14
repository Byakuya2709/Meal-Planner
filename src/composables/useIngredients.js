// src/composables/useIngredients.js - CẬP NHẬT ĐẦY ĐỦ

import { ref, computed } from 'vue'
import { recipeService } from '../services/recipeService'

export function useIngredients() {
  const ingredients = ref([])
  const selectedIngredients = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch ingredients từ backend (Supabase hoặc mock)
  const fetchIngredients = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await recipeService.getIngredients()
      if (response.success) {
        ingredients.value = response.data
      } else {
        error.value = response.error || 'Không thể tải danh sách nguyên liệu'
      }
    } catch (err) {
      error.value = 'Không thể tải danh sách nguyên liệu'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Toggle ingredient selection
  
  const toggleIngredient = (ingredient) => {
    const index = selectedIngredients.value.findIndex(i => i.id === ingredient.id)
    
    if (index > -1) {
      selectedIngredients.value.splice(index, 1)
    } else {
      // Giới hạn tối đa 3 nguyên liệu (đổi từ 5)
      if (selectedIngredients.value.length < 3) {
        selectedIngredients.value.push(ingredient)
      }
    }
  }

  // Check if ingredient is selected
  const isSelected = (ingredientId) => {
    return selectedIngredients.value.some(i => i.id === ingredientId)
  }

  // Clear selection
  const clearSelection = () => {
    selectedIngredients.value = []
  }

  // Get ingredients by category
  const getByCategory = (category) => {
    return ingredients.value.filter(i => i.category === category)
  }

  // Get ingredient by ID
  const getIngredientById = (id) => {
    return ingredients.value.find(i => i.id === id)
  }

  // Get ingredient name by ID
  const getIngredientName = (id) => {
    const ingredient = ingredients.value.find(i => i.id === id)
    return ingredient ? ingredient.name : id
  }

  /**
   * Normalize text để so sánh (bỏ dấu tiếng Việt, chuyển thường)
   */
  const normalizeText = (text) => {
    if (!text) return ''
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .trim()
  }

  /**
   * Get ingredient by name (tìm theo tên tiếng Việt hoặc tiếng Anh)
   * Support cả tên chính xác và tên gần giống
   */
  const getIngredientByName = (name) => {
    if (!name || !ingredients.value.length) return null
    
    const normalizedName = normalizeText(name)
    
    // Tìm chính xác trước
    let ingredient = ingredients.value.find(i => 
      normalizeText(i.name) === normalizedName || 
      normalizeText(i.id) === normalizedName
    )
    
    if (ingredient) return ingredient
    
    // Tìm gần giống (contains)
    ingredient = ingredients.value.find(i => 
      normalizeText(i.name).includes(normalizedName) ||
      normalizedName.includes(normalizeText(i.name))
    )
    
    if (ingredient) return ingredient
    
    // Mapping các tên tiếng Việt thông dụng
    const nameMapping = {
      'thit_heo': ['thịt heo', 'heo', 'thit heo'],
      'thit_ga': ['thịt gà', 'gà', 'thit ga'],
      'thit_bo': ['thịt bò', 'bò', 'thit bo'],
      'ca_hoi': ['cá hồi', 'ca hoi'],
      'ca_thu': ['cá thu', 'ca thu'],
      'ca_basa': ['cá basa', 'ca basa'],
      'tom': ['tôm', 'tom'],
      'muc': ['mực', 'muc'],
      'trung': ['trứng', 'trung'],
      'rau_muong': ['rau muống', 'rau muong', 'muống', 'muong'],
      'ca_chua': ['cà chua', 'ca chua'],
      'khoai_tay': ['khoai tây', 'khoai tay'],
      'hanh_tay': ['hành tây', 'hanh tay'],
      'toi': ['tỏi', 'toi'],
      'gung': ['gừng', 'gung'],
      'ot': ['ớt', 'ot'],
      'hanh_la': ['hành lá', 'hanh la'],
      'rau_ram': ['rau răm', 'rau ram'],
      'ngo': ['ngò', 'ngo'],
      'gao': ['gạo', 'gao'],
      'mi': ['mì', 'mi'],
      'banh_pho': ['bánh phở', 'banh pho', 'phở', 'pho'],
    }
    
    // Tìm trong mapping
    for (const [id, aliases] of Object.entries(nameMapping)) {
      if (aliases.some(alias => normalizedName.includes(normalizeText(alias)) || 
                               normalizeText(alias).includes(normalizedName))) {
        ingredient = ingredients.value.find(i => i.id === id)
        if (ingredient) return ingredient
      }
    }
    
    return null
  }

  // Computed
  // Cập nhật trong src/composables/useIngredients.js
  
  const selectedCount = computed(() => selectedIngredients.value.length)
  const canSelectMore = computed(() => selectedCount.value < 3) // Đổi từ 5 -> 3
  const canSubmit = computed(() => selectedCount.value >= 1 && selectedCount.value <= 3) // Đổi từ 3-5 -> 1-3

  return {
    ingredients,
    selectedIngredients,
    loading,
    error,
    selectedCount,
    canSelectMore,
    canSubmit,
    fetchIngredients,
    toggleIngredient,
    isSelected,
    clearSelection,
    getByCategory,
    getIngredientById,
    getIngredientName,
    getIngredientByName, // THÊM MỚI
  }
}