// src/utils/cleanupStorage.js (Tạo file mới)

/**
 * Clean up old/invalid storage items
 */
export function cleanupStorage() {
  const keys = Object.keys(localStorage)
  
  keys.forEach(key => {
    const value = localStorage.getItem(key)
    
    // Xóa anonymous user IDs
    if (value && value.startsWith('anon_')) {
      console.log('🗑️ Removing anonymous user ID:', key)
      localStorage.removeItem(key)
    }
    
    // Xóa các keys lỗi thời
    const obsoleteKeys = [
      'anonymousUserId',
      'lastVisit',
      'tempData',
    ]
    
    if (obsoleteKeys.includes(key)) {
      console.log('🗑️ Removing obsolete key:', key)
      localStorage.removeItem(key)
    }
  })
}