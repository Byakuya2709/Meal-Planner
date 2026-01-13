<!-- src/views/Favorites.vue - FIX CONDITIONAL RENDERING -->
<template>
  <MainLayout>
    <div class="favorites-page bg-neutral-50 min-h-screen py-16 mt-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Loading State -->
          <div v-if="favoritesStore.loading" class="flex justify-center py-16">
            <LoadingSpinner size="lg" text="Đang tải món yêu thích..." />
          </div>

          <!-- Content (Empty hoặc Grid) -->
          <div v-else>
            <!-- Empty State -->
            <div
              v-if="
                !favoritesStore.favorites ||
                favoritesStore.favorites.length === 0
              "
              class="text-center py-16"
            >
              <div
                class="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-3xl mb-6"
              >
                <Heart :size="48" class="text-neutral-400" />
              </div>
              <h2 class="text-2xl font-bold text-neutral-900 mb-4">
                Chưa có món yêu thích
              </h2>
              <p class="text-neutral-600 mb-8">
                Khám phá và lưu những công thức bạn thích ngay!
              </p>
              <router-link
                to="/community"
                class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Sparkles :size="20" />
                Khám phá công thức
              </router-link>
            </div>

            <div v-else>

        <div class="text-center mb-12 block">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-error/20 to-error/10 rounded-3xl mb-6"
                >
                  <Heart :size="40" class="text-error" />
                </div>
                <h1
                  class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
                >
                  Món yêu thích của bạn
                </h1>
                <p class="text-xl text-neutral-600">
                  {{ favoritesStore.favoriteCount }} công thức đã lưu
                </p>
              </div>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RecipeCard
                  v-for="recipe in favoritesStore.favorites"
                  :key="recipe.id"
                  :recipe="recipe"
                  :is-favorite="true"
                  @toggle-favorite="handleToggleFavorite(recipe.id)"
                />
              </div>
            </div>
            <!-- Favorites Grid -->
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import RecipeCard from "../components/features/RecipeCard.vue";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useAuthStore } from "../stores/authStore";
import { Heart, Sparkles } from "lucide-vue-next";

const router = useRouter();
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();

onMounted(async () => {
  // Redirect nếu chưa đăng nhập
  if (!authStore.isAuthenticated) {
    router.push("/");
    return;
  }

  // Load favorites (force reload để chắc chắn)
  await favoritesStore.loadFavorites(true);
});

const handleToggleFavorite = async (recipeId) => {
  await favoritesStore.toggleFavorite(recipeId);
};
</script>
