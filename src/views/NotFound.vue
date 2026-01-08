<template>
  <MainLayout>
    <div class="not-found-page min-h-[70vh] flex items-center justify-center">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <!-- 404 Illustration -->
          <div class="mb-8">
            <p class="text-9xl font-bold text-primary-600 mb-4">404</p>
            <div class="text-6xl mb-4">🔍🍳</div>
          </div>

          <!-- Content -->
          <h1 class="heading-2 mb-4">
            Không tìm thấy trang
          </h1>
          <p class="body-lg text-neutral-600 mb-8">
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            <br />
            Hãy quay về trang chủ để tìm món ngon nào!
          </p>

          <!-- Actions -->
          <div class="flex flex-wrap justify-center gap-4">
            <BaseButton 
              variant="primary" 
              size="lg"
              tag="router-link"
              to="/"
            >
              Về trang chủ
            </BaseButton>
            <BaseButton 
              variant="outline" 
              size="lg"
              tag="router-link"
              to="/community"
            >
              Xem cộng đồng
            </BaseButton>
          </div>

          <!-- Popular Links -->
          <div class="mt-12 pt-8 border-t border-neutral-200">
            <p class="text-sm text-neutral-600 mb-4">Hoặc khám phá:</p>
            <div class="flex flex-wrap justify-center gap-4">
              <router-link 
                to="/"
                class="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Tìm món nấu
              </router-link>
              <router-link 
                to="/community"
                class="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Cộng đồng
              </router-link>
              <router-link 
                to="/impact"
                class="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Tác động
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
</script>