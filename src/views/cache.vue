<!-- Recipe.vue - Cập nhật Hero và Content sections -->
<template>
  <MainLayout>
    <div class="recipe-page bg-neutral-50 min-h-screen">
      <!-- Loading State -->
      <LoadingSpinner
        v-if="loading"
        :full-screen="true"
        size="xl"
        text="Đang tải công thức..."
      />

      <!-- Error State -->
      <div
        v-else-if="error"
        class="min-h-screen flex items-center justify-center bg-white"
      >
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-2xl mx-auto text-center">
            <div
              class="inline-flex items-center justify-center w-24 h-24 bg-error/10 border border-error/20 rounded-3xl mb-6"
            >
              <AlertCircle :size="48" class="text-error" />
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Không tìm thấy công thức
            </h1>
            <p class="text-xl text-neutral-600 mb-8">{{ error }}</p>
            <button
              @click="$router.push('/')"
              class="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Home :size="20" />
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>

      <!-- Recipe Content -->
      <div v-else-if="recipe" class="recipe-content">
        <!-- Hero Section - Nền sáng với image và content tách biệt -->
        <section class="relative bg-white border-b border-neutral-200">
          <div class="container mx-auto px-4 py-8 md:py-12">
            <div class="max-w-6xl mx-auto">
              <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                
                <!-- Image Column - Cố định tỷ lệ -->
                <div class="order-2 md:order-1">
                  <div class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-neutral-100">
                    <img
                      :src="recipe.image_url"
                      :alt="recipe.title"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <!-- Content Column - Nền trắng, text dễ đọc -->
                <div class="order-1 md:order-2">
                  <!-- Badge -->
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full mb-4"
                  >
                    <Sparkles :size="16" class="text-primary-600" />
                    <span class="text-sm font-semibold text-primary-700">
                      Công thức được gợi ý
                    </span>
                  </div>

                  <!-- Title -->
                  <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
                    {{ recipe.title }}
                  </h1>

                  <!-- Description -->
                  <p class="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6">
                    {{ recipe.description }}
                  </p>

                  <!-- Tags - Giữ nguyên -->
                  <div v-if="recipe.tags && recipe.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
                    <span 
                      v-for="tag in recipe.tags" 
                      :key="tag"
                      class="px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold rounded-full"
                    >
                      #{{ tag }}
                    </span>
                  </div>

                  <!-- Meta Info Cards - 4 cards ngang -->
                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Clock :size="20" class="text-primary-600" />
                        </div>
                        <div>
                          <p class="text-xs text-neutral-500 mb-0.5">Thời gian</p>
                          <p class="text-base font-bold text-neutral-900">
                            {{ recipe.time_minutes }}p
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 hover:border-warning/50 hover:bg-warning/5 transition-all duration-300">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                          <ChefHat :size="20" class="text-warning" />
                        </div>
                        <div>
                          <p class="text-xs text-neutral-500 mb-0.5">Độ khó</p>
                          <div class="flex gap-1 mt-1">
                            <div
                              v-for="n in 5"
                              :key="n"
                              class="w-1.5 h-1.5 rounded-full"
                              :class="n <= recipe.difficulty_score ? 'bg-warning' : 'bg-neutral-300'"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 hover:border-success/50 hover:bg-success/5 transition-all duration-300">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                          <Flame :size="20" class="text-success" />
                        </div>
                        <div>
                          <p class="text-xs text-neutral-500 mb-0.5">Calories</p>
                          <p class="text-base font-bold text-neutral-900">
                            {{ recipe.nutrition_facts.calories }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 hover:border-error/50 hover:bg-error/5 transition-all duration-300">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                          <Heart
                            :size="20"
                            class="text-error"
                            :class="{ 'fill-error': recipe.likeCount > 0 }"
                          />
                        </div>
                        <div>
                          <p class="text-xs text-neutral-500 mb-0.5">Yêu thích</p>
                          <p class="text-base font-bold text-neutral-900">
                            {{ recipe.likeCount }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <!-- Main Content Section - Tiếp tục với nền sáng -->
        <section class="relative bg-neutral-50 py-12 md:py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
              <!-- Phần còn lại của Recipe.vue giữ nguyên logic, chỉ điều chỉnh màu -->
              <!-- ... -->
            </div>
          </div>
        </section>
      </div>
    </div>
  </MainLayout>
</template>


<template>
  <MainLayout>
    <div class="recipe-page">
      <!-- Loading State -->
      <LoadingSpinner
        v-if="loading"
        :full-screen="true"
        size="xl"
        text="Đang tải công thức..."
      />

      <!-- Error State -->
      <div
        v-else-if="error"
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
      >
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-2xl mx-auto text-center">
            <div
              class="inline-flex items-center justify-center w-24 h-24 bg-error/10 backdrop-blur-md border border-error/20 rounded-3xl mb-6 animate-pulse"
            >
              <AlertCircle :size="48" class="text-error" />
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Không tìm thấy công thức
            </h1>
            <p class="text-xl text-neutral-400 mb-8">{{ error }}</p>
            <button
              @click="$router.push('/')"
              class="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl transition-all duration-300"
            >
              <Home :size="20" />
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>

      <!-- Recipe Content -->
      <div v-else-if="recipe" class="recipe-content mt-24">
        <!-- Hero Section with Parallax -->
        <section
          ref="heroSection"
          class="relative min-h-[70vh] overflow-hidden flex items-center pb-0"
        >
          <!-- Background Image with Parallax -->
          <div ref="parallaxBg" class="absolute inset-0 will-change-transform">
            <img
              :src="recipe.image_url"
              :alt="recipe.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- <div class="absolute inset-0 opacity-30">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-[120px] animate-float"></div>
            <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/30 rounded-full blur-[100px] animate-float-delayed"></div>
          </div> -->

          <!-- Content -->
          <div class="relative z-10 container mx-auto px-4">
            <div class="max-w-4xl">
              <!-- Badge -->
              <div
                class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 opacity-0 animate-fade-in"
                style="animation-delay: 0.2s"
              >
                <Sparkles :size="16" class="text-primary-400" />
                <span class="text-sm font-medium text-white/90">
                  Công thức được gợi ý
                </span>
              </div>

              <!-- Title -->
              <h1
                class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in leading-tight"
                style="animation-delay: 0.4s"
              >
                {{ recipe.title }}
              </h1>

              <!-- Description -->
              <p
                class="text-xl md:text-2xl text-neutral-200 leading-relaxed mb-8 opacity-0 animate-fade-in"
                style="animation-delay: 0.6s"
              >
                {{ recipe.description }}
              </p>

              <!-- Meta Info Cards -->
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-in"
                style="animation-delay: 0.8s"
              >
                <div
                  class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <Clock :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <p class="text-sm text-neutral-400">Thời gian</p>
                      <p class="text-lg font-bold text-white">
                        {{ recipe.time_minutes }} phút
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <ChefHat :size="24" class="text-warning" />
                    </div>
                    <div>
                      <p class="text-sm text-neutral-400">Độ khó</p>
                      <div class="flex gap-1 mt-1">
                        <div
                          v-for="n in 3"
                          :key="n"
                          class="w-2 h-2 rounded-full"
                          :class="
                            n <= recipe.difficulty_score
                              ? 'bg-warning'
                              : 'bg-white/30'
                          "
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <Flame :size="24" class="text-success" />
                    </div>
                    <div>
                      <p class="text-sm text-neutral-400">Calories</p>
                      <p class="text-lg font-bold text-white">
                        {{ recipe.nutrition_facts.calories }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 bg-error/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <Heart
                        :size="24"
                        class="text-error"
                        :class="{ 'fill-error': recipe.likeCount > 0 }"
                      />
                    </div>
                    <div>
                      <p class="text-sm text-neutral-400">Yêu thích</p>
                      <p class="text-lg font-bold text-white">
                        {{ recipe.likeCount }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Scroll indicator -->
          <!-- <div
            class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown :size="32" class="text-white/60" />
          </div> -->
        </section>

        <!-- Main Content -->
        <section
          class="relative bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-16 md:py-24"
        >
          <!-- Floating decorative elements -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              class="absolute top-1/4 -left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]"
            ></div>
            <div
              class="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary-500/10 rounded-full blur-[100px]"
            ></div>
          </div>

          <div class="relative container mx-auto px-4">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-[1fr,400px] gap-12">
              <!-- Left Column: Ingredients & Instructions -->
              <div class="space-y-12">
                <!-- Ingredients Section -->
                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30"
                    >
                      <ShoppingCart :size="28" class="text-white" />
                    </div>
                    <div>
                      <h2 class="text-3xl md:text-4xl font-bold text-white">
                        Nguyên liệu
                      </h2>
                      <p class="text-neutral-400">
                        Chuẩn bị đầy đủ để nấu ngon
                      </p>
                    </div>
                  </div>

                  <!-- Ingredients List -->
                  <div
                    class="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 space-y-4"
                  >
                    <div
                      v-for="(
                        ingredient, index
                      ) in recipe.ingredients_list_fixed"
                      :key="index"
                      class="flex items-center justify-between py-4 border-b border-white/10 last:border-0 group hover:bg-white/5 px-4 rounded-xl transition-all duration-300"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        >
                          <span class="text-lg text-white">{{
                            index + 1
                          }}</span>
                        </div>
                        <span class="text-white text-lg">{{ ingredient }}</span>
                      </div>
                      <CheckCircle2
                        :size="20"
                        class="text-success opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>

                  <!-- Seasoning -->
                  <div v-if="recipe.seasoning && recipe.seasoning.length > 0">
                    <h3
                      class="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                    >
                      <Sparkles :size="20" class="text-warning" />
                      Gia vị
                    </h3>
                    <div
                      class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3"
                    >
                      <div
                        v-for="(item, index) in recipe.seasoning"
                        :key="index"
                        class="flex items-center gap-3 text-neutral-300"
                      >
                        <div class="w-2 h-2 bg-warning rounded-full"></div>
                        <span>{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Instructions Section -->
                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary-500/30"
                    >
                      <ChefHat :size="28" class="text-white" />
                    </div>
                    <div>
                      <h2 class="text-3xl md:text-4xl font-bold text-white">
                        Cách làm
                      </h2>
                      <p class="text-neutral-400">Làm theo từng bước nhé</p>
                    </div>
                  </div>

                  <!-- Steps -->
                  <div class="space-y-6">
                    <div
                      v-for="(step, index) in recipe.instructions"
                      :key="index"
                      class="flex gap-6 group"
                    >
                      <!-- Step number -->
                      <div class="flex-shrink-0">
                        <div
                          class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform"
                        >
                          {{ index + 1 }}
                        </div>
                      </div>

                      <!-- Step content -->
                      <div
                        class="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group-hover:bg-white/10 transition-all duration-300"
                      >
                        <p class="text-neutral-200 text-lg leading-relaxed">
                          {{ step }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Nutrition & Tags -->
              <div class="space-y-8 lg:sticky lg:top-24 lg:self-start">
                <!-- Nutrition Facts -->
                <div
                  class="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 space-y-6"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center"
                    >
                      <Flame :size="24" class="text-success" />
                    </div>
                    <h3 class="text-2xl font-bold text-white">Dinh dưỡng</h3>
                  </div>

                  <div class="space-y-4">
                    <!-- Calories - Large -->
                    <div
                      class="bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-2xl p-6 text-center"
                    >
                      <p class="text-5xl font-bold text-white mb-1">
                        {{ recipe.nutrition_facts.calories }}
                      </p>
                      <p class="text-neutral-300 text-sm">Calories</p>
                    </div>

                    <!-- Other nutrients -->
                    <div class="grid grid-cols-2 gap-4">
                      <div
                        class="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      >
                        <p class="text-2xl font-bold text-success">
                          {{ recipe.nutrition_facts.protein_g }}g
                        </p>
                        <p class="text-neutral-400 text-xs mt-1">Protein</p>
                      </div>
                      <div
                        class="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      >
                        <p class="text-2xl font-bold text-warning">
                          {{ recipe.nutrition_facts.carbohydrates_g }}g
                        </p>
                        <p class="text-neutral-400 text-xs mt-1">Carbs</p>
                      </div>
                      <div
                        class="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      >
                        <p class="text-2xl font-bold text-info">
                          {{ recipe.nutrition_facts.fat_total_g }}g
                        </p>
                        <p class="text-neutral-400 text-xs mt-1">Fat</p>
                      </div>
                      <div
                        class="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      >
                        <p class="text-2xl font-bold text-primary-400">
                          {{ recipe.nutrition_facts.fiber_g }}g
                        </p>
                        <p class="text-neutral-400 text-xs mt-1">Fiber</p>
                      </div>
                    </div>

                    <div class="text-xs text-neutral-500 text-center pt-2">
                      {{ recipe.nutrition_facts.serving_size }}
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div
                  v-if="recipe.tags && recipe.tags.length > 0"
                  class="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4"
                >
                  <h3
                    class="text-xl font-bold text-white flex items-center gap-2"
                  >
                    <Tag :size="20" class="text-primary-400" />
                    Thẻ tag
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in recipe.tags"
                      :key="tag"
                      class="px-4 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-300 text-sm font-semibold rounded-full hover:bg-primary-500/30 transition-colors cursor-pointer"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Share Section -->
                <div
                  class="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-4"
                >
                  <h3
                    class="text-xl font-bold text-white flex items-center gap-2"
                  >
                    <Share2 :size="20" class="text-primary-400" />
                    Chia sẻ công thức
                  </h3>
                  <p class="text-neutral-300 text-sm">
                    Bạn thích món này? Chia sẻ với bạn bè nhé!
                  </p>
                  <button
                    class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart :size="18" />
                    Yêu thích
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section
          class="relative bg-gradient-to-b from-neutral-900 to-black py-16 md:py-20 overflow-hidden"
        >
          <!-- Decorative background -->
          <div class="absolute inset-0">
            <div
              class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[150px]"
            ></div>
            <div
              class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-[150px]"
            ></div>
          </div>

          <div class="relative container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center space-y-8">
              <div
                class="inline-flex items-center justify-center w-20 h-20 bg-success/20 backdrop-blur-md border border-success/30 rounded-3xl mb-4"
              >
                <Sparkles :size="40" class="text-success" />
              </div>

              <h2 class="text-4xl md:text-5xl font-bold text-white">
                Bạn thích món này chứ? 😊
              </h2>

              <p class="text-xl text-neutral-300 max-w-2xl mx-auto">
                Hãy thử nấu món này ngay hôm nay hoặc khám phá thêm nhiều công
                thức tuyệt vời khác!
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  @click="$router.push('/')"
                  class="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all duration-500 hover:scale-105 overflow-hidden relative"
                >
                  <span
                    class="relative z-10 flex items-center justify-center gap-3"
                  >
                    <Sparkles :size="20" class="animate-pulse" />
                    <span>Tìm món khác</span>
                    <ArrowRight
                      :size="20"
                      class="group-hover:translate-x-2 transition-transform"
                    />
                  </span>
                  <div
                    class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  ></div>
                </button>

                <button
                  @click="$router.push('/community')"
                  class="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Users :size="20" />
                  <span>Cộng đồng</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import { useRecipe } from "../composables/useRecipe";
import { useScrollAnimation } from "../composables/useScrollAnimation";
import {
  Sparkles,
  Clock,
  ChefHat,
  Flame,
  Heart,
  ShoppingCart,
  CheckCircle2,
  Tag,
  Share2,
  ArrowRight,
  Users,
  Home,
  AlertCircle,
  ChevronDown,
} from "lucide-vue-next";

const route = useRoute();
const { recipe, loading, error, getRecipeById } = useRecipe();
const { parallax } = useScrollAnimation();

const heroSection = ref(null);
const parallaxBg = ref(null);

onMounted(async () => {
  const recipeId = route.params.id;
  await getRecipeById(recipeId);

  // Setup parallax effect for background
  if (parallaxBg.value) {
    parallax(parallaxBg.value, 0.5);
  }
});
</script>

<style scoped>
/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
  animation-delay: 2s;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>

<!-- Script giữ nguyên -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import { useRecipe } from '../composables/useRecipe'
import { 
  Clock, 
  ChefHat, 
  Flame, 
  Heart, 
  Sparkles,
  AlertCircle,
  Home
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { recipe, loading, error, fetchRecipe } = useRecipe()

onMounted(async () => {
  const recipeId = route.params.id
  await fetchRecipe(recipeId)
})
</script>