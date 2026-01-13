// src/utils/storageExpire.js

/**
 * Set item với expire time
 */
export function setItemWithExpiry(key, value, expiryInDays = 7) {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + (expiryInDays * 24 * 60 * 60 * 1000),
  }
  localStorage.setItem(key, JSON.stringify(item))
}

/**
 * Get item và check expire
 */
export function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key)
  
  if (!itemStr) {
    return null
  }

  try {
    const item = JSON.parse(itemStr)
    
    // Nếu không có expiry field, return null (không phải item của chúng ta)
    if (!item || typeof item !== 'object' || !item.expiry) {
      return null
    }
    
    const now = new Date()
    
    // Check expire
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    
    return item.value
  } catch (error) {
    // Skip items không phải JSON hoặc không phải format của chúng ta
    return null
  }
}

/**
 * Clear expired items (chỉ clear items có format của chúng ta)
 */
export function clearExpiredItems() {
  const keys = Object.keys(localStorage)
  
  // Chỉ check các keys của app chúng ta
  const appKeys = keys.filter(key => {
    return key.startsWith('auth-storage') || 
           key.startsWith('favorites-storage') ||
           key.includes('meal-planner')
  })
  
  appKeys.forEach(key => {
    try {
      const itemStr = localStorage.getItem(key)
      if (!itemStr) return
      
      const item = JSON.parse(itemStr)
      
      // Nếu có expiry field, check expire
      if (item && typeof item === 'object' && item.expiry) {
        const now = new Date()
        if (now.getTime() > item.expiry) {
          console.log('🗑️ Removing expired item:', key)
          localStorage.removeItem(key)
        }
      }
    } catch (error) {
      // Skip items không parse được
    }
  })
}

/**
 * Clear tất cả auth data (dùng khi logout)
 */
export function clearAuthData() {
  const keys = Object.keys(localStorage)
  
  keys.forEach(key => {
    if (key.includes('auth') || key.includes('supabase') || key.includes('favorites')) {
      localStorage.removeItem(key)
    }
  })
  
  console.log('🗑️ Cleared all auth data')
}