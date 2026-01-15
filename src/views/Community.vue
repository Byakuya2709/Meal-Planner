<!-- Community.vue - FULLY OPTIMIZED WITH PAGINATION, FILTERS & PERFORMANCE -->
<template>
  <MainLayout>
    <div class="community-page bg-neutral-50 min-h-screen">
      <!-- Hero Section -->
      <section
        class=" bg-gradient-to-br from-primary-50 via-white to-secondary-50 md:py-20 border-b border-neutral-200"
      style="padding-top: 9rem; padding-bottom: 4rem ;"
        >
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Cộng đồng chia sẻ công thức 👨‍🍳
            </h1>
            <p class="text-lg md:text-xl text-neutral-700 mb-8 leading-relaxed">
              Khám phá và học hỏi từ những công thức nấu ăn của cộng đồng người
              dùng
            </p>

            <div class="flex flex-wrap justify-center gap-4">
              <BaseButton variant="primary" size="lg" @click="showAlert()">
                Chia sẻ công thức của bạn
              </BaseButton>
              <BaseButton
                variant="outline"
                size="lg"
                @click="$router.push('/favorites')"
              >
                Công thức đã lưu
              </BaseButton>
            </div>
          </div>
        </div>
      </section>
         <!-- Stats -->
      <section class="border-b border-neutral-200 bg-white">
        <div class="container mx-auto px-4 py-4">
          <div class="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-600 mb-1">
                {{ totalCount }}
              </p>
              <p class="text-sm text-neutral-600">Công thức</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-success mb-1">
                {{ totalLikes }}
              </p>
              <p class="text-sm text-neutral-600">Lượt thích</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-warning mb-1">
                {{ totalCount * 3 }}
              </p>
              <p class="text-sm text-neutral-600">Chia sẻ</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Recipes Section -->
      <section class="py-8 md:py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 class="text-2xl md:text-3xl font-bold text-neutral-900">
                Công thức nổi bật
              </h2>
              <select
                v-model="sortBy"
                @change="handleSortChange"
                class="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="latest">Mới nhất</option>
                <option value="popular">Nhiều vote nhất</option>
                <option value="easy">Dễ làm nhất</option>
              </select>
            </div>

            <!-- Filter Bar -->
            <FilterBar
              v-model:filters="filters"
              @update:filters="handleFilterChange"
              class="mb-8"
            />

            <!-- Loading State (first load) -->
            <div
              v-if="loading && recipes.length === 0"
              class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <RecipeSkeleton v-for="n in 6" :key="n" />
            </div>

            <!-- Error State -->
            <div
              v-else-if="error && recipes.length === 0"
              class="text-center py-12"
            >
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-2xl mb-4"
              >
                <svg
                  class="w-8 h-8 text-error"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p class="text-error font-medium text-lg mb-4">{{ error }}</p>
              <BaseButton @click="retryFetch" variant="outline">
                Thử lại
              </BaseButton>
            </div>

            <!-- Empty State -->
            <div v-else-if="recipes.length === 0" class="text-center py-12">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-2xl mb-4"
              >
                <span class="text-4xl">📝</span>
              </div>
              <p class="text-neutral-600 font-medium text-lg mb-2">
                Không tìm thấy công thức
              </p>
              <p class="text-neutral-500 text-sm mb-4">
                Thử điều chỉnh bộ lọc của bạn
              </p>
              <BaseButton @click="clearAllFilters" variant="outline">
                Xóa bộ lọc
              </BaseButton>
            </div>

            <!-- Recipes Grid -->
            <div v-else>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="recipe in sortedRecipes"
                  :key="recipe.id || recipe._id"
                  class="group bg-white rounded-2xl border border-neutral-200 shadow-card hover:shadow-float overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  @click="goToRecipe(recipe.id || recipe._id)"
                >
                  <!-- Image với lazy loading -->
                  <div
                    class="relative aspect-[4/3] overflow-hidden bg-neutral-100"
                  >
                    <img
                      :data-src="recipe.image_url"
                      :alt="recipe.title"
                      class="lazy-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <!-- Time badge -->
                    <div
                      class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md"
                    >
                      <span class="text-sm font-bold text-neutral-800"
                        >⏱️ {{ recipe.time_minutes }}p</span
                      >
                    </div>

                    <!-- Difficulty badge -->
                    <div
                      class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md"
                    >
                      <div class="flex items-center gap-1">
                        <div
                          v-for="n in 5"
                          :key="n"
                          class="w-1.5 h-1.5 rounded-full"
                          :class="
                            n <= recipe.difficulty_score
                              ? 'bg-warning'
                              : 'bg-neutral-300'
                          "
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-5 bg-white">
                    <h3
                      class="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors"
                    >
                      {{ recipe.title }}
                    </h3>

                    <!-- Author -->
                    <div
                      class="flex items-center gap-3 mb-4"
                      v-if="recipe.author_name || recipe.author"
                    >
                      <img
                        :src="
                          recipe.author_avatar ||
                          recipe.author?.avatar ||
                          'https://i.pravatar.cc/150'
                        "
                        :alt="recipe.author_name || recipe.author?.name"
                        class="w-8 h-8 rounded-full ring-2 ring-primary-100"
                        loading="lazy"
                      />
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-semibold text-neutral-900 truncate"
                        >
                          {{
                            recipe.author_name ||
                            recipe.author?.name ||
                            "Anonymous"
                          }}
                        </p>
                        <p class="text-xs text-neutral-500">
                          {{ formatDate(recipe.created_at) }}
                        </p>
                      </div>
                    </div>

                    <!-- Tags -->
                    <div
                      class="flex flex-wrap gap-2 mb-4"
                      v-if="recipe.tags && recipe.tags.length > 0"
                    >
                      <span
                        v-for="tag in recipe.tags.slice(0, 3)"
                        :key="tag"
                        class="text-xs px-2.5 py-1 bg-primary-50 border border-primary-200 text-primary-700 rounded-full font-medium"
                      >
                        #{{ tag }}
                      </span>
                      <span
                        v-if="recipe.tags.length > 3"
                        class="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full font-medium"
                      >
                        +{{ recipe.tags.length - 3 }}
                      </span>
                    </div>

                    <!-- Actions -->
                    <div
                      class="flex items-center justify-between pt-4 border-t border-neutral-100"
                    >
                      <button
                        @click.stop="handleVote(recipe.id || recipe._id)"
                        class="flex items-center gap-2 transition-all disabled:opacity-50"
                        :class="[
                          likesStore.isLiked(recipe.id || recipe._id)
                            ? 'text-primary-600 scale-105'
                            : 'text-neutral-600 hover:text-primary-600 hover:scale-105',
                        ]"
                        :disabled="votingRecipeId === (recipe.id || recipe._id)"
                      >
                        <svg
                          class="w-5 h-5 transition-transform"
                          :class="{
                            'scale-110':
                              votingRecipeId === (recipe.id || recipe._id),
                          }"
                          :fill="
                            likesStore.isLiked(recipe.id || recipe._id)
                              ? 'currentColor'
                              : 'none'
                          "
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        <span class="text-sm font-semibold">
                          {{ recipe.like_count || recipe.likeCount || 0 }}
                        </span>
                      </button>

                      <div
                        class="flex items-center gap-2 text-primary-600 font-semibold text-sm"
                      >
                        <span>Xem chi tiết</span>
                        <svg
                          class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Load More Button -->
              <div v-if="hasMore" class="text-center mt-12">
                <BaseButton
                  @click="handleLoadMore"
                  :disabled="loading"
                  variant="outline"
                  size="lg"
                  class="min-w-[200px]"
                >
                  <template v-if="loading">
                    <LoadingSpinner size="sm" class="mr-2" />
                    Đang tải...
                  </template>
                  <template v-else> Xem thêm công thức </template>
                </BaseButton>
                <p class="text-sm text-neutral-500 mt-3">
                  Đã tải {{ recipes.length }} công thức
                </p>
              </div>

              <!-- End message -->
              <div
                v-else-if="recipes.length > 0"
                class="text-center mt-12 py-8 border-t border-neutral-200"
              >
                <p class="text-neutral-600 font-medium">
                  🎉 Bạn đã xem hết tất cả công thức
                </p>
                <p class="text-sm text-neutral-500 mt-2">
                  Tổng cộng {{ recipes.length }} công thức
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <AuthModal v-model="showAuthModal" />
  </MainLayout>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";
import { useLikesStore } from "../stores/likesStore";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import RecipeSkeleton from "../components/ui/RecipeSkeleton.vue";
import FilterBar from "../components/community/FilterBar.vue";
import AuthModal from "../components/auth/AuthModal.vue";
import { useCommunity } from "../composables/useCommunity";

const router = useRouter();
const { recipes, loading, error, hasMore, totalCount,totalRecipes, loadMore, resetAndFetch } =
  useCommunity();
const authStore = useAuthStore();
const likesStore = useLikesStore();

const sortBy = ref("latest");
const votingRecipeId = ref(null);
const showAuthModal = ref(false);
const filters = ref({
  difficulty: "",
  cookingTime: "",
  ingredientCount: "",
});

// Debounced filter handler
let filterTimeout = null;
const handleFilterChange = (newFilters) => {
  filters.value = newFilters;

  if (filterTimeout) clearTimeout(filterTimeout);

  filterTimeout = setTimeout(async () => {
    await resetAndFetch({
      ...filters.value,
      sortBy: sortBy.value,
    });

    // Lazy load images sau khi render
    nextTick(() => {
      lazyLoadImages();
    });
  }, 300);
};

const handleSortChange = async () => {
  await resetAndFetch({
    ...filters.value,
    sortBy: sortBy.value,
  });

  nextTick(() => {
    lazyLoadImages();
  });
};

const handleLoadMore = async () => {
  await loadMore({
    ...filters.value,
    sortBy: sortBy.value,
  });

  nextTick(() => {
    lazyLoadImages();
  });
};

const showAlert = () => {
  window.alert(`Tính năng đang phát triển`);
};

const clearAllFilters = async () => {
  filters.value = {
    difficulty: "",
    cookingTime: "",
    ingredientCount: "",
  };
  sortBy.value = "latest";

  await resetAndFetch();
  nextTick(() => {
    lazyLoadImages();
  });
};

const retryFetch = async () => {
  await resetAndFetch({
    ...filters.value,
    sortBy: sortBy.value,
  });

  nextTick(() => {
    lazyLoadImages();
  });
};

onMounted(async () => {
  // Fetch ingredients và recipes
  await Promise.all([resetAndFetch({ sortBy: sortBy.value })]);

  // Load liked recipes nếu đã đăng nhập
  if (authStore.isAuthenticated) {
    await likesStore.loadLikedRecipes();
  }

  // Setup lazy loading
  setupLazyLoading();
  lazyLoadImages();
});


const totalLikes = computed(() => {
  return recipes.value.reduce(
    (sum, r) => sum + (r.like_count || r.likeCount || 0),
    0
  );
});

// Sorted recipes (client-side sorting for better UX)
const sortedRecipes = computed(() => {
  return recipes.value; // Backend đã sort rồi
});

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

const handleVote = async (recipeId) => {
  if (votingRecipeId.value) return;

  votingRecipeId.value = recipeId;
  const result = await likesStore.likeRecipe(recipeId);

  if (result.requireAuth) {
    showAuthModal.value = true;
  }

  if (result.success && result.data) {
    const recipe = recipes.value.find((r) => (r.id || r._id) === recipeId);
    if (recipe) {
      recipe.like_count = result.data.likeCount;
      recipe.likeCount = result.data.likeCount;
    }
  }

  votingRecipeId.value = null;
};

const goToRecipe = (recipeId) => {
  router.push(`/recipe/${recipeId}`);
};

// Lazy loading images với Intersection Observer
let imageObserver = null;

const setupLazyLoading = () => {
  if ("IntersectionObserver" in window) {
    imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute("data-src");

            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              img.classList.remove("lazy-image");
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );
  }
};

const lazyLoadImages = () => {
  if (!imageObserver) return;

  const lazyImages = document.querySelectorAll("img.lazy-image");
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
};

// Cleanup
onUnmounted(() => {
  if (imageObserver) {
    imageObserver.disconnect();
  }
  if (filterTimeout) {
    clearTimeout(filterTimeout);
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lazy-image {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
