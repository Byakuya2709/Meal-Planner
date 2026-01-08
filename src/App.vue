<template>
  <div id="app" class="min-h-screen flex flex-col">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Thêm meta tags cho SEO nếu chưa có
  if (!document.querySelector('meta[name="description"]')) {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = 'Tủ lạnh nhà bạn hôm nay - Gợi ý món nấu từ nguyên liệu có sẵn'
    document.head.appendChild(meta)
  }
})
</script>