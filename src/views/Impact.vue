<template>
  <MainLayout>
    <div class="impact-page">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 md:py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-success/20 rounded-full mb-6">
              <span class="text-5xl">🌍</span>
            </div>
            <h1 class="heading-1 mb-6">
              Cùng nhau giảm lãng phí thực phẩm
            </h1>
            <p class="body-lg text-neutral-600">
              Mỗi bữa ăn được nấu từ nguyên liệu sẵn có là một bước nhỏ để bảo vệ môi trường
            </p>
          </div>
        </div>
      </section>

      <!-- Stats Cards -->
      <section class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            
            <LoadingSpinner v-if="loading" size="lg" text="Đang tải thống kê..." />

            <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Users -->
              <BaseCard variant="elevated" class="text-center">
                <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p class="text-4xl font-bold text-primary-600 mb-2">
                  {{ formatNumber(stats.totalUsers) }}
                </p>
                <p class="text-neutral-600 font-medium">Người dùng</p>
              </BaseCard>

              <!-- Meals -->
              <BaseCard variant="elevated" class="text-center">
                <div class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p class="text-4xl font-bold text-primary-400 mb-2">
                  {{ formatNumber(stats.mealsCreated) }}
                </p>
                <p class="text-neutral-600 font-medium">Bữa ăn đã nấu</p>
              </BaseCard>

              <!-- Food Saved -->
              <BaseCard variant="elevated" class="text-center">
                <div class="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p class="text-4xl font-bold text-success mb-2">
                  {{ formatNumber(stats.foodSaved) }} kg
                </p>
                <p class="text-neutral-600 font-medium">Thực phẩm không bị lãng phí</p>
              </BaseCard>

              <!-- CO2 Reduced -->
              <BaseCard variant="elevated" class="text-center">
                <div class="w-16 h-16 bg-info/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-4xl font-bold text-info mb-2">
                  {{ formatNumber(stats.co2Reduced) }} kg
                </p>
                <p class="text-neutral-600 font-medium">CO₂ đã giảm</p>
              </BaseCard>
            </div>
          </div>
        </div>
      </section>

      <!-- Money Saved -->
      <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="heading-2 mb-4">💰 Tiết kiệm được</h2>
            <p class="text-6xl font-bold text-warning mb-4">
              {{ formatMoney(stats.moneySaved) }}
            </p>
            <p class="text-xl text-neutral-600">
              Tổng số tiền cộng đồng đã tiết kiệm được từ việc sử dụng thực phẩm có sẵn
            </p>
          </div>
        </div>
      </section>

      <!-- Impact Info -->
      <section class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="heading-2 text-center mb-12">
              Tại sao giảm lãng phí thực phẩm lại quan trọng?
            </h2>

            <div class="space-y-8">
              <BaseCard variant="bordered">
                <div class="flex gap-6 items-start">
                  <div class="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span class="text-3xl">📊</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold mb-3">Thực trạng lãng phí</h3>
                    <p class="text-neutral-700 leading-relaxed">
                      Theo FAO, hơn <strong>1/3 lượng thực phẩm</strong> sản xuất trên toàn cầu bị lãng phí mỗi năm, 
                      tương đương khoảng 1.3 tỷ tấn. Ở Việt Nam, mỗi gia đình trung bình vứt đi 
                      <strong>15-20% thực phẩm</strong> hàng tháng.
                    </p>
                  </div>
                </div>
              </BaseCard>

              <BaseCard variant="bordered">
                <div class="flex gap-6 items-start">
                  <div class="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span class="text-3xl">🌱</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold mb-3">Tác động môi trường</h3>
                    <p class="text-neutral-700 leading-relaxed">
                      Lãng phí thực phẩm tạo ra <strong>8-10% tổng lượng khí thải nhà kính</strong> toàn cầu.
                      Khi thực phẩm phân hủy ở bãi rác, chúng tạo ra khí methane - một loại khí nhà kính 
                      mạnh gấp 25 lần CO₂.
                    </p>
                  </div>
                </div>
              </BaseCard>

              <BaseCard variant="bordered">
                <div class="flex gap-6 items-start">
                  <div class="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span class="text-3xl">💡</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold mb-3">Giải pháp từ bạn</h3>
                    <p class="text-neutral-700 leading-relaxed">
                      Mỗi bữa ăn được nấu từ nguyên liệu sẵn có trong tủ lạnh không chỉ giúp bạn 
                      <strong>tiết kiệm tiền</strong> mà còn góp phần giảm thiểu tác động tiêu cực đến môi trường.
                      Hãy bắt đầu ngay hôm nay!
                    </p>
                  </div>
                </div>
              </BaseCard>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-primary-400 text-white py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              Bạn đã sẵn sàng tham gia chưa?
            </h2>
            <p class="text-xl mb-8 text-primary-100">
              Hãy bắt đầu hành trình giảm lãng phí thực phẩm ngay hôm nay
            </p>
            <BaseButton 
              variant="secondary" 
              size="xl"
              tag="router-link"
              to="/"
            >
              Tìm món nấu ngay
            </BaseButton>
          </div>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import { useImpactStats } from '../composables/useImpactStats'

// Dùng composable mới
const { stats, loading, error } = useImpactStats()

// Format helpers
const formatNumber = (num) => {
  return new Intl.NumberFormat('vi-VN').format(num)
}

const formatMoney = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}
</script>