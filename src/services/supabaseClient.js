// src/services/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('⚠️ Supabase chưa được cấu hình. App sẽ dùng mock data.')
  }
}

// Tạo Supabase client với config tối ưu cho production
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Không cần auth session cho app này
    autoRefreshToken: false,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'meal-planner',
    },
  },
  // Realtime không cần thiết cho app này
  realtime: {
    enabled: false,
  },
}) : null

// Log trạng thái kết nối (chỉ trong dev)
if (import.meta.env.DEV && supabase) {
  console.log('🔌 Supabase client initialized')
}