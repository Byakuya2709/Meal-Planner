// src/services/supabaseClient.js (CẬP NHẬT)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('⚠️ Supabase chưa được cấu hình. App sẽ dùng mock data.')
  }
}

// Tạo Supabase client với config tối ưu
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Tự động persist session
    persistSession: true,
    // Tự động refresh token
    autoRefreshToken: true,
    // Detect session từ URL (cho OAuth)
    detectSessionInUrl: true,
    // Storage key
    storageKey: 'supabase-auth',
    // Storage
    storage: window.localStorage,
    // Flow type
    flowType: 'pkce',
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'meal-planner',
    },
  },
  // Realtime không cần thiết
  realtime: {
    enabled: false,
  },
}) : null

// Log trạng thái kết nối (chỉ trong dev)
if (import.meta.env.DEV && supabase) {
  console.log('🔌 Supabase client initialized')
  
  // Log session khi có thay đổi
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔐 Supabase Auth Event:', event)
    console.log('📋 Session:', session ? 'Active' : 'None')
  })
}