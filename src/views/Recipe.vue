<!-- Recipe.vue - Hoàn chỉnh với Supabase, Favorites & Likes -->
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
              class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Home :size="20" />
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>

      <!-- Recipe Content -->
      <div v-else-if="recipe" class="recipe-content">
        <!-- Hero Section -->
        <section
          class="relative bg-secondary-50 border-b border-secondary-200 pt-[80px] lg:pt-[90px]"
        >
          <div class="container mx-auto px-4 py-8 md:py-12">
            <div class="max-w-6xl mx-auto">
              <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <!-- Image Column -->
                <div class="order-2 md:order-1">
                  <div
                    class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-neutral-100 border-2 border-primary-200"
                  >
                    <img
                      :src="recipe.image_url"
                      :alt="recipe.title"
                      class="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                <!-- Content Column -->
                <div class="order-1 md:order-2">
                  <!-- Badge -->
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-300 rounded-full mb-4"
                  >
                    <Sparkles :size="16" class="text-primary-600" />
                    <span class="text-sm font-semibold text-primary-700">
                      {{
                        recipe.is_community ? "Từ cộng đồng" : "Gợi ý hoàn hảo"
                      }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h1
                    class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight"
                  >
                    {{ recipe.title }}
                  </h1>

                  <!-- Description -->
                  <p
                    class="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6"
                  >
                    {{ recipe.description }}
                  </p>

                  <!-- Author (nếu là community recipe) -->
                  <div
                    v-if="
                      recipe.is_community &&
                      (recipe.author_name || recipe.author)
                    "
                    class="flex items-center gap-3 mb-6 p-4 bg-white border border-primary-200 rounded-xl"
                  >
                    <img
                      :src="
                        recipe.author_avatar ||
                        recipe.author?.avatar ||
                        'https://i.pravatar.cc/150'
                      "
                      :alt="recipe.author_name || recipe.author?.name"
                      class="w-12 h-12 rounded-full ring-2 ring-primary-200"
                    />
                    <div>
                      <p class="font-semibold text-neutral-900">
                        {{ recipe.author_name || recipe.author?.name }}
                      </p>
                      <p class="text-sm text-neutral-600">
                        {{ formatDate(recipe.created_at) }}
                      </p>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div
                    v-if="recipe.tags && recipe.tags.length > 0"
                    class="flex flex-wrap gap-2 mb-6"
                  >
                    <span
                      v-for="tag in recipe.tags.slice(0, 5)"
                      :key="tag"
                      class="px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold rounded-full"
                    >
                      #{{ tag }}
                    </span>
                  </div>

                  <!-- Meta Info Cards -->
                  <div class="grid grid-cols-2 gap-3 mb-6">
                    <div
                      class="bg-primary-50 border border-primary-200 rounded-xl p-4 hover:border-primary-400 hover:bg-primary-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <Clock :size="16" class="text-primary-600" />
                        <p class="text-xs font-semibold text-primary-700">
                          Thời gian
                        </p>
                      </div>
                      <p class="text-lg font-bold text-primary-900">
                        {{ recipe.time_minutes }} phút
                      </p>
                    </div>

                    <div
                      class="bg-secondary-50 border border-secondary-200 rounded-xl p-4 hover:border-secondary-400 hover:bg-secondary-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <ChefHat :size="16" class="text-secondary-600" />
                        <p class="text-xs font-semibold text-secondary-700">
                          Độ khó
                        </p>
                      </div>
                      <p class="text-lg font-bold text-secondary-900">
                        {{ difficultyText }}
                      </p>
                    </div>

                    <div
                      class="bg-primary-50 border border-primary-200 rounded-xl p-4 hover:border-primary-400 hover:bg-primary-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <Users :size="16" class="text-primary-600" />
                        <p class="text-xs font-semibold text-primary-700">
                          Khẩu phần
                        </p>
                      </div>
                      <p class="text-base font-bold text-primary-900">
                        {{
                          recipe.nutrition_facts?.serving_size || "2-3 người"
                        }}
                      </p>
                    </div>

                    <div
                      class="bg-accent-50 border border-accent-200 rounded-xl p-4 hover:border-accent-400 hover:bg-accent-100 transition-all duration-300"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <Flame :size="16" class="text-accent-600" />
                        <p class="text-xs font-semibold text-accent-700">
                          Calories
                        </p>
                      </div>
                      <p class="text-lg font-bold text-accent-900">
                        {{ recipe.nutrition_facts?.calories || "N/A" }}
                      </p>
                    </div>
                  </div>

                  <!-- Actions: Favorite, Like & Share -->
                  <div class="flex flex-wrap items-center gap-3">
                    <!-- Favorite Button -->
                    <button
                      v-if="authStore.isAuthenticated"
                      @click="handleToggleFavorite"
                      :disabled="favoritesStore.loading"
                      class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      :class="[
                        favoritesStore.isFavorite(recipe.id)
                          ? 'bg-error text-white hover:bg-error-600 shadow-lg'
                          : 'bg-error-50 text-error border-2 border-error-200 hover:bg-error-100',
                      ]"
                    >
                      <Heart
                        :size="20"
                        :fill="
                          favoritesStore.isFavorite(recipe.id)
                            ? 'currentColor'
                            : 'none'
                        "
                      />
                      <span>
                        {{
                          favoritesStore.isFavorite(recipe.id)
                            ? "Đã lưu"
                            : "Lưu công thức"
                        }}
                      </span>
                    </button>

                    <!-- Like Button (chỉ cho community recipes) -->
                    <button
                      v-if="recipe.is_community && authStore.isAuthenticated"
                      @click="handleLikeRecipe"
                      :disabled="voting"
                      class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      :class="[
                        likesStore.isLiked(recipe.id)
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-primary-50 text-primary-600 border-2 border-primary-200 hover:bg-primary-100',
                      ]"
                    >
                      <ThumbsUp
                        :size="20"
                        :fill="
                          likesStore.isLiked(recipe.id)
                            ? 'currentColor'
                            : 'none'
                        "
                      />
                      <span>{{ recipe.like_count || 0 }}</span>
                    </button>

                    <!-- Share Button -->
                    <button
                      @click="handleShare"
                      class="flex items-center gap-2 px-5 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300 hover:scale-105"
                    >
                      <Share2 :size="20" />
                      <span>Chia sẻ</span>
                    </button>

                    <!-- Login prompt if not authenticated -->
                    <p
                      v-if="!authStore.isAuthenticated"
                      class="text-sm text-neutral-600 ml-2"
                    >
                      <router-link
                        to="/"
                        class="text-primary-600 hover:underline font-semibold"
                      >
                        Đăng nhập
                      </router-link>
                      để lưu và thích công thức
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Main Content Section -->
        <section
          class="relative bg-gradient-to-b from-secondary-50 via-secondary-100/50 to-white py-16 md:py-24"
        >
          <!-- Decorative elements -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              class="absolute top-1/4 -left-20 w-64 h-64 bg-primary-200/20 rounded-full blur-[120px]"
            ></div>
            <div
              class="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary-200/20 rounded-full blur-[120px]"
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
                      class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <ShoppingCart :size="24" class="text-white" />
                    </div>
                    <div>
                      <h2 class="heading-2 text-neutral-900">Nguyên liệu</h2>
                      <p class="text-neutral-600">
                        {{
                          (recipe.mainIngredients?.length || 0) +
                            (recipe.secondaryIngredients?.length || 0) ||
                          recipe.ingredients_list?.length ||
                          0
                        }}
                        nguyên liệu
                      </p>
                    </div>
                  </div>

                  <!-- Nguyên liệu CHÍNH -->
                  <div
                    v-if="
                      recipe.mainIngredients &&
                      recipe.mainIngredients.length > 0
                    "
                    class="bg-white border-2 border-primary-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm"
                  >
                    <div
                      class="flex items-center gap-2 mb-4 pb-3 border-b-2 border-primary-100"
                    >
                      <ChefHat :size="20" class="text-primary-600" />
                      <h3 class="text-lg font-bold text-primary-900">
                        Nguyên liệu chính
                      </h3>
                    </div>

                    <div
                      v-for="(ingredient, index) in recipe.mainIngredients"
                      :key="`main-${index}`"
                      class="flex items-center justify-between py-4 border-b border-neutral-200 last:border-0 group hover:bg-primary-50 px-4 rounded-xl transition-all duration-300"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                        >
                          {{ ingredient.icon || "🥘" }}
                        </div>
                        <div>
                          <span class="font-bold text-neutral-900 block">{{
                            ingredient.name
                          }}</span>
                          <span
                            class="text-xs text-primary-600 font-semibold"
                            >{{ getCategoryName(ingredient.category) }}</span
                          >
                        </div>
                      </div>
                      <CheckCircle2
                        :size="20"
                        class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>

                  <!-- Nguyên liệu PHỤ (Gia vị & phụ liệu) -->
                  <div
                    v-if="
                      recipe.secondaryIngredients &&
                      recipe.secondaryIngredients.length > 0
                    "
                    class="bg-white border-2 border-secondary-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm"
                  >
                    <div
                      class="flex items-center gap-2 mb-4 pb-3 border-b-2 border-secondary-100"
                    >
                      <Sparkles :size="20" class="text-secondary-600" />
                      <h3 class="text-lg font-bold text-secondary-900">
                        Phụ liệu & Gia vị
                      </h3>
                    </div>

                    <div class="flex flex-col lg:flex-row gap-6">
                      <div class="flex-1">
                        <div
                          v-for="(
                            ingredient, index
                          ) in recipe.secondaryIngredients"
                          :key="`secondary-${index}`"
                          class="flex items-center justify-between py-3 border-b border-neutral-200 last:border-0 group hover:bg-secondary-50 px-4 rounded-xl transition-all duration-300"
                        >
                          <div class="flex items-center gap-4">
                            <div
                              class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                            >
                              {{ ingredient.icon || "🧂" }}
                            </div>
                            <div>
                              <span
                                class="font-semibold text-neutral-800 block"
                              >
                                {{ ingredient.name }}
                              </span>
                              <span class="text-xs text-secondary-600">
                                {{ getCategoryName(ingredient.category) }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Seasoning -->
                      <div class="flex-1 grid gap-3">
                        <div
                          v-for="(item, index) in recipe.seasoning"
                          :key="index"
                          class="flex items-center gap-3 py-3 px-4 bg-white/60 rounded-xl"
                        >
                          <div class="w-2 h-2 bg-accent-500 rounded-full"></div>
                          <span class="text-neutral-800 font-medium">{{
                            item
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Fallback: Nếu không có mainIngredients/secondaryIngredients thì dùng ingredients_list cũ -->
                  <div
                    v-if="
                      (!recipe.mainIngredients ||
                        recipe.mainIngredients.length === 0) &&
                      (!recipe.secondaryIngredients ||
                        recipe.secondaryIngredients.length === 0)
                    "
                    class="bg-white border-2 border-primary-100 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm"
                  >
                    <div
                      v-for="(ingredient, index) in recipe.ingredients_list"
                      :key="index"
                      class="flex items-center justify-between py-4 border-b border-neutral-200 last:border-0 group hover:bg-primary-50 px-4 rounded-xl transition-all duration-300"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                        >
                          {{ getIngredientIcon(ingredient) }}
                        </div>
                        <div>
                          <span class="font-semibold text-neutral-900 block">{{
                            ingredient
                          }}</span>
                          <span class="text-xs text-neutral-500">{{
                            getIngredientCategory(ingredient)
                          }}</span>
                        </div>
                      </div>
                      <CheckCircle2
                        :size="20"
                        class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>

                <!-- Instructions Section -->
                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <ChefHat :size="24" class="text-white" />
                    </div>
                    <div>
                      <h2 class="heading-2 text-neutral-900">Cách làm</h2>
                      <p class="text-neutral-600">
                        {{ recipe.instructions?.length || 0 }} bước
                      </p>
                    </div>
                  </div>

                  <!-- Steps -->
                  <div class="space-y-6">
                    <div
                      v-for="(step, index) in recipe.instructions"
                      :key="index"
                      class="flex gap-6 group"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="w-12 h-12 bg-secondary-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md"
                        >
                          {{ index + 1 }}
                        </div>
                      </div>
                      <div
                        class="flex-1 bg-white border-2 border-secondary-100 rounded-2xl p-6 group-hover:border-secondary-300 group-hover:shadow-lg transition-all duration-300"
                      >
                        <p class="text-neutral-800 leading-relaxed">
                          {{ step }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Nutrition & More -->
              <div class="space-y-8 lg:sticky lg:top-24 lg:self-start">
                <!-- Nutrition Facts -->
                <div
                  v-if="recipe.nutrition_facts"
                  class="bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center"
                    >
                      <Flame :size="24" class="text-white" />
                    </div>
                    <h3 class="text-2xl font-bold text-neutral-900">
                      Dinh dưỡng
                    </h3>
                  </div>

                  <div class="space-y-4">
                    <!-- Calories - Large -->
                    <div
                      class="bg-white border-2 border-primary-300 rounded-2xl p-6 text-center shadow-sm"
                    >
                      <p class="text-5xl font-bold text-accent-500 mb-1">
                        {{ recipe.nutrition_facts.calories || 0 }}
                      </p>
                      <p class="text-sm font-semibold text-neutral-600">
                        Calories
                      </p>
                    </div>

                    <!-- Other nutrients -->
                    <div class="grid grid-cols-2 gap-4">
                      <div
                        class="bg-white border border-primary-200 rounded-xl p-4 text-center"
                      >
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.protein_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">
                          Protein
                        </p>
                      </div>
                      <div
                        class="bg-white border border-primary-200 rounded-xl p-4 text-center"
                      >
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.carbohydrates_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">
                          Carbs
                        </p>
                      </div>
                      <div
                        class="bg-white border border-primary-200 rounded-xl p-4 text-center"
                      >
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.fat_total_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">
                          Chất béo
                        </p>
                      </div>
                      <div
                        class="bg-white border border-primary-200 rounded-xl p-4 text-center"
                      >
                        <p class="text-2xl font-bold text-primary-600">
                          {{ recipe.nutrition_facts.fiber_g || 0 }}g
                        </p>
                        <p class="text-xs text-neutral-600 font-medium">
                          Chất xơ
                        </p>
                      </div>
                    </div>

                    <div
                      class="text-xs text-neutral-500 text-center pt-2 font-medium"
                    >
                      * Giá trị dinh dưỡng/khẩu phần
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div
                  v-if="recipe.tags && recipe.tags.length > 0"
                  class="bg-white border-2 border-neutral-200 rounded-3xl p-6 space-y-4 shadow-sm"
                >
                  <h3
                    class="text-xl font-bold text-neutral-900 flex items-center gap-2"
                  >
                    <Tag :size="20" class="text-primary-600" />
                    Thẻ tag
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in recipe.tags"
                      :key="tag"
                      class="px-4 py-2 bg-primary-50 border-2 border-primary-200 text-primary-700 text-sm font-semibold rounded-full hover:bg-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Stats (nếu là community recipe) -->
                <div
                  v-if="recipe.is_community"
                  class="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-3xl p-6 space-y-4 shadow-sm"
                >
                  <h3
                    class="text-xl font-bold text-neutral-900 flex items-center gap-2"
                  >
                    <TrendingUp :size="20" class="text-primary-600" />
                    Thống kê
                  </h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white rounded-xl p-4 text-center">
                      <p class="text-3xl font-bold text-error mb-1">
                        {{ recipe.like_count || 0 }}
                      </p>
                      <p class="text-xs text-neutral-600 font-medium">
                        Lượt thích
                      </p>
                    </div>
                    <div class="bg-white rounded-xl p-4 text-center">
                      <p class="text-3xl font-bold text-primary-600 mb-1">
                        {{ formatDate(recipe.created_at) }}
                      </p>
                      <p class="text-xs text-neutral-600 font-medium">
                        Ngày đăng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section
          class="relative bg-gradient-to-bl from-primary-500 via-primary-900 to-accent-200 py-16 md:py-20 overflow-hidden"
        >
          <!-- Decorative background -->
          <div class="absolute inset-0">
            <div
              class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[150px] "
            ></div>
            <div
              class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[150px]"
            ></div>
          </div>

          <div class="relative container mx-auto ">
            <div class="max-w-4xl mx-auto text-center space-y-8">
              <div
                class="inline-flex items-center justify-center w-20 h-20 bg-primary-500/20 backdrop-blur-md border border-primary-400/30 rounded-3xl mb-4"
              >
                <Sparkles :size="40" class="text-primary-300" />
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
                  @click="$router.push({ path: '/', hash: '#selection' })"
                  class="group px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[0_0_50px_rgba(251,146,60,0.5)] transition-all duration-500 hover:scale-105 overflow-hidden relative"
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
        <hr>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import MainLayout from "../layouts/MainLayout.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import { useRecipe } from "../composables/useRecipe";
import { useIngredients } from "../composables/useIngredients";
import { useAuthStore } from "../stores/authStore";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useLikesStore } from "../stores/likesStore";
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
  ThumbsUp,
  TrendingUp,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { recipe, loading, error, getRecipeById } = useRecipe();
const { fetchIngredients, getIngredientByName } = useIngredients();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const likesStore = useLikesStore();

const voting = ref(false);

// Computed properties
const difficultyText = computed(() => {
  if (!recipe.value) return "Dễ";
  const score = recipe.value.difficulty_score || 1;
  if (score === 1) return "Dễ";
  if (score === 2) return "Trung bình";
  return "Khó";
});

// Get ingredient icon from name
const getIngredientIcon = (ingredientName) => {
  const ingredient = getIngredientByName(ingredientName);
  return ingredient?.icon || "🧂";
};

// Get ingredient category label
const getIngredientCategory = (ingredientName) => {
  const ingredient = getIngredientByName(ingredientName);
  if (!ingredient) return "";

  const categoryMap = {
    protein: "Protein",
    vegetable: "Rau củ",
    spice: "Gia vị",
    seasoning: "Gia vị",
    grain: "Ngũ cốc",
    other: "Khác",
  };

  return categoryMap[ingredient.category] || "";
};

// Format date
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Hôm nay";
  if (diff === 1) return "Hôm qua";
  if (diff < 7) return `${diff} ngày trước`;
  if (diff < 30) return `${Math.floor(diff / 7)} tuần trước`;
  return `${Math.floor(diff / 30)} tháng trước`;
};

// Handle favorite toggle
const handleToggleFavorite = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning("Vui lòng đăng nhập để lưu món yêu thích");
    return;
  }

  await favoritesStore.toggleFavorite(recipe.value.id);
};

// Handle like recipe
const handleLikeRecipe = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning("Vui lòng đăng nhập để thích công thức");
    return;
  }

  if (voting.value) return;

  voting.value = true;
  const result = await likesStore.likeRecipe(recipe.value.id);

  // Cập nhật like_count nếu thành công
  if (result.success && result.data) {
    recipe.value.like_count = result.data.likeCount;
    recipe.value.likeCount = result.data.likeCount;
  }

  voting.value = false;
};

// Handle share
const handleShare = () => {
  if (navigator.share && recipe.value) {
    navigator
      .share({
        title: recipe.value.title,
        text: recipe.value.description,
        url: window.location.href,
      })
      .catch((err) => console.log("Share failed:", err));
  } else {
    // Fallback: copy link
    navigator.clipboard.writeText(window.location.href);
    toast.success("Đã copy link công thức!");
  }
};
const getCategoryName = (category) => {
  const categories = {
    protein: "Protein",
    carb: "Tinh bột",
    vegetable: "Rau củ",
    dairy: "Sữa & Dầu mỡ",
  };
  return categories[category] || "Khác";
};
// Fetch data when component mounts

onMounted(async () => {
  const recipeId = route.params.id;

  if (!recipeId) {
    router.push("/");
    return;
  }

  // Fetch ingredients và recipe song song
  await Promise.all([fetchIngredients(), getRecipeById(recipeId)]);

  // Lazy load favorites và likes nếu đã đăng nhập
  if (authStore.isAuthenticated) {
    // Stores sẽ tự check loaded flag và skip nếu đã load
    await Promise.all([
      favoritesStore.loadFavorites(),
      likesStore.loadLikedRecipes(),
    ]);
  }
});
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Animation for pulse */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
