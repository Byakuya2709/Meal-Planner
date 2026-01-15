<template>
  <MainLayout>
    <div class="home-page">
      <!-- HERO - New Component -->

    <RecipeSelectionModal
        :show="showRecipeModal"
        :loading="findingRecipe"
        :recipes="recipes"
        :selectedIngredients="selectedIngredients"
        @close="handleCloseModal"
        @select="handleSelectRecipe"
      />

      <HeroSection @start="scrollToIngredients" />

      <!-- WHY DIFFERENT - New Component -->
      <WhyDifferentSection />

      <!-- 3 CRITERIA SECTION - Tuân thủ 60-30-10 -->
      <section class="section-md bg-secondary-50 relative">
        <!-- 60% Secondary: Background màu phụ -->
        <div
          class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-100/30 blur-3xl pointer-events-none -z-10"
        ></div>

        <div class="container-narrow relative z-10">
          <div class="text-center mb-12">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <component :is="BookOpen" :size="16" />
              <span>Triết lý sản phẩm</span>
            </div>
            <!-- Title with accent color -->
            <h2 class="heading-2 mb-4">
              3 tiêu chí <span class="text-accent-500">"NẤU NGAY"</span>
            </h2>
            <p class="body-lg text-neutral-600">
              Mọi món được gợi ý đều phải thỏa mãn cả 3 điều kiện này
            </p>
          </div>

          <div class="space-y-6">
            <!-- 30% Primary: Card sử dụng màu chính -->
            <div
              v-for="(criterion, index) in criteria"
              :key="index"
              class="group flex gap-6 items-start bg-white p-8 rounded-3xl shadow-card hover:shadow-float transition-all duration-500 hover:-translate-y-1 border border-neutral-200 hover:border-primary-200"
            >
              <!-- Number badge với primary color -->
              <div class="flex-shrink-0">
                <div
                  class="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-primary-500 to-primary-600"
                >
                  {{ index + 1 }}
                </div>
              </div>

              <div class="flex-1">
                <h3
                  class="heading-4 mb-3 group-hover:text-primary-600 transition-colors"
                >
                  {{ criterion.title }}
                </h3>
                <p class="body-base text-neutral-600 leading-relaxed">
                  {{ criterion.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA STICKY BAR - 10% Accent color -->
      <Transition name="slide-up">
        <section
          v-if="selectedCount > 0"
          class="fixed bottom-0 left-0 right-0 bg-white/95 border-t-2 border-primary-200 shadow-float py-4 md:py-6 z-40 backdrop-blur-sm"
        >
          <div class="container-wide">
            <div
              class="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <!-- Left: Selection info -->
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                >
                  🧺
                </div>
                <div class="text-left">
                  <p class="font-bold text-neutral-900 text-lg">
                    Đã chọn {{ selectedCount }} nguyên liệu
                  </p>
                  <p class="text-sm text-neutral-600">
                    {{
                      canSubmit
                        ? "✨ Sẵn sàng tìm món!"
                        : `Chọn thêm ${3 - selectedCount} nguyên liệu nữa`
                    }}
                  </p>
                </div>
              </div>

              <!-- Right: Actions -->
              <div class="flex items-center gap-3 w-full md:w-auto">
                <BaseButton
                  variant="ghost"
                  size="md"
                  @click="clearSelection"
                  class="hidden sm:flex"
                >
                  Xóa tất cả
                </BaseButton>

                <!-- 10% Accent: CTA button chính -->
                <BaseButton
                  variant="accent"
                  size="xl"
                  :disabled="!canSubmit"
                  :loading="findingRecipe"
                  @click="handleFindRecipe"
                  class="flex-1 md:flex-initial md:min-w-[280px]"
                >
                  <span
                    v-if="!findingRecipe"
                    class="flex items-center gap-2 justify-center"
                  >
                    <span>🔍</span>
                    <span>Gợi ý món nấu ngay</span>
                  </span>
                  <span v-else>Đang tìm món phù hợp...</span>
                </BaseButton>
              </div>
            </div>
          </div>
        </section>
      </Transition>
      <!-- ===== INGREDIENT SELECTION SECTION ===== -->
      <section id="selection" ref="ingredientsSection" class="section-md bg-white">
        <div class="container-wide">
          <div class="text-center mb-1">
            <div
              class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              🥘
              <span>Chọn nguyên liệu</span>
            </div>
            <h2 class="heading-2 mb-4">Chọn nguyên liệu trong tủ lạnh</h2>
            <p class="body-lg text-neutral-600 mb-6">
              Chọn từ 1-3 nguyên liệu bạn đang có, chúng tôi sẽ gợi ý món phù
              hợp nhất
            </p>

            <!-- Selection Progress -->
            <div
              class="inline-flex items-center gap-4 bg-neutral-50 rounded-2xl px-8 py-4 border-2 border-neutral-200"
            >
              <div class="flex items-center gap-2 ">
                <div
                  v-for="n in 3"
                  :key="n"
                  :class="[
                    'w-4 h-4 rounded-full transition-all duration-300',
                    n <= selectedCount
                      ? 'bg-primary-600 scale-110 shadow-lg'
                      : 'bg-neutral-300',
                  ]"
                />
              </div>
              <div class="h-8 w-px bg-neutral-300"></div>
              <div class="text-left">
                <p class="text-sm text-neutral-500 font-medium">Đã chọn</p>
                <p class="text-2xl font-bold text-primary-600">
                  {{ selectedCount }}<span class="text-neutral-400">/3</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <LoadingSpinner
            v-if="loading"
            size="lg"
            text="Đang tải nguyên liệu..."
          />

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-12">
            <IconBox variant="secondary" size="xl" class="mx-auto mb-4">
              ⚠️
            </IconBox>
            <p class="text-error font-medium text-lg">{{ error }}</p>
          </div>

          <!-- Ingredients Grid -->
                 <!-- Thay thế phần Ingredients Grid (từ dòng 205-314) bằng code này -->
          
                    <!-- Ingredients Carousel Grid -->
                    <div v-else class="space-y-10">
                      <!-- Category: Protein -->
                      <div>
                        <div class="flex items-center gap-3 mb-6">
                          <IconBox variant="secondary" size="sm"> 🥩 </IconBox>
                          <h3 class="heading-3">Protein</h3>
                          <div class="flex-1 h-px bg-neutral-200"></div>
                          <span class="text-sm text-neutral-500 font-medium">
                            {{ getByCategory('protein').length }} loại
                          </span>
                        </div>
                        <IngredientCarousel>
                          <IngredientCard
                            v-for="ingredient in getByCategory('protein')"
                            :key="ingredient.id"
                            :ingredient="ingredient"
                            :selected="isSelected(ingredient.id)"
                            @click="handleIngredientClick(ingredient)"
                            class="flex-shrink-0 w-32"
                          />
                        </IngredientCarousel>
                      </div>
          
                      <!-- Category: Vegetables -->
                      <div>
                        <div class="flex items-center gap-3 mb-6">
                          <IconBox variant="success" size="sm"> 🥬 </IconBox>
                          <h3 class="heading-3">Rau củ</h3>
                          <div class="flex-1 h-px bg-neutral-200"></div>
                          <span class="text-sm text-neutral-500 font-medium">
                            {{ getByCategory('vegetable').length }} loại
                          </span>
                        </div>
                        <IngredientCarousel>
                          <IngredientCard
                            v-for="ingredient in getByCategory('vegetable')"
                            :key="ingredient.id"
                            :ingredient="ingredient"
                            :selected="isSelected(ingredient.id)"
                            @click="handleIngredientClick(ingredient)"
                            class="flex-shrink-0 w-32"
                          />
                        </IngredientCarousel>
                      </div>
          
                      <!-- Category: Carbs -->
                      <div>
                        <div class="flex items-center gap-3 mb-6">
                          <IconBox variant="warning" size="sm"> 🍚 </IconBox>
                          <h3 class="heading-3">Tinh bột</h3>
                          <div class="flex-1 h-px bg-neutral-200"></div>
                          <span class="text-sm text-neutral-500 font-medium">
                            {{ getByCategory('carb').length }} loại
                          </span>
                        </div>
                        <IngredientCarousel>
                          <IngredientCard
                            v-for="ingredient in getByCategory('carb')"
                            :key="ingredient.id"
                            :ingredient="ingredient"
                            :selected="isSelected(ingredient.id)"
                            @click="handleIngredientClick(ingredient)"
                            class="flex-shrink-0 w-32"
                          />
                        </IngredientCarousel>
                      </div>
          
                      <!-- Category: Dairy -->
                      <div>
                        <div class="flex items-center gap-3 mb-6">
                          <IconBox variant="info" size="sm"> 🥛 </IconBox>
                          <h3 class="heading-3">Sữa & Phô mai</h3>
                          <div class="flex-1 h-px bg-neutral-200"></div>
                          <span class="text-sm text-neutral-500 font-medium">
                            {{ getByCategory('dairy').length }} loại
                          </span>
                        </div>
                        <IngredientCarousel>
                          <IngredientCard
                            v-for="ingredient in getByCategory('dairy')"
                            :key="ingredient.id"
                            :ingredient="ingredient"
                            :selected="isSelected(ingredient.id)"
                            @click="handleIngredientClick(ingredient)"
                            class="flex-shrink-0 w-32 pt-2"
                          />
                        </IngredientCarousel>
                      </div>
                    </div>
        </div>
      </section>

      <!-- ===== CTA STICKY BAR ===== -->
      <Transition name="slide-up">
        <section
          v-if="selectedCount > 0"
          class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-200 shadow-float py-4 md:py-6 z-40 backdrop-blur-sm bg-white/95"
        >
          <div class="container-wide">
            <div
              class="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <!-- Left: Selection info -->
              <div class="flex items-center gap-4">
                <IconBox variant="primary" size="md"> 🧺 </IconBox>
                <div class="text-left">
                  <p class="font-bold text-neutral-900 text-lg">
                    Đã chọn {{ selectedCount }} nguyên liệu
                  </p>
                  <p class="text-sm text-neutral-600">
                    {{
                      canSubmit
                        ? "✨ Sẵn sàng tìm món!"
                        : `Chọn thêm ${3 - selectedCount} nguyên liệu nữa`
                    }}
                  </p>
                </div>
              </div>

              <!-- Right: Actions -->
              <div class="flex items-center gap-3 w-full md:w-auto">
                <BaseButton
                  variant="ghost"
                  size="md"
                  @click="clearSelection"
                  class="hidden sm:flex"
                >
                  Xóa tất cả
                </BaseButton>

                <BaseButton
                  variant="primary"
                  size="xl"
                  :disabled="!canSubmit"
                  :loading="findingRecipe"
                  @click="handleFindRecipe"
                  class="flex-1 md:flex-initial md:min-w-[280px]"
                >
                  <span
                    v-if="!findingRecipe"
                    class="flex items-center gap-2 justify-center"
                  >
                    <span>🔍</span>
                    <span>Gợi ý món nấu ngay</span>
                  </span>
                  <span v-else>Đang tìm món phù hợp...</span>
                </BaseButton>
              </div>
            </div>
          </div>
        </section>
      </Transition>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { BookOpen } from "lucide-vue-next";
import IngredientCarousel from "../components/ui/IngredientCarousel.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HeroSection from "../components/sections/HeroSection.vue";
import WhyDifferentSection from "../components/sections/WhyDifferentSection.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import IngredientCard from "../components/features/IngredientCard.vue";
import IconBox from "../components/ui/IconBox.vue";
import RecipeSelectionModal from "../components/features/RecipeSelectionModal.vue"; // THÊM
import { useIngredients } from "../composables/useIngredients";
import { useRecipe } from "../composables/useRecipe";

const router = useRouter();
const ingredientsSection = ref(null);

const {
  selectedIngredients,
  loading,
  error,
  selectedCount,
  canSubmit,
  fetchIngredients,
  toggleIngredient,
  isSelected,
  clearSelection,
  getByCategory,
} = useIngredients();

const {
  recipes,
  loading: findingRecipe,
  findRecipesByIngredients,
} = useRecipe(); // CẬP NHẬT
const showRecipeModal = ref(false); // THÊM

// CẬP NHẬT criteria
const criteria = [
  {
    title: "Không cần mua thêm (hoặc tối đa 1 nguyên liệu phụ)",
    description:
      "Bạn có thể nấu ngay với những gì đang có. Nếu thiếu, chỉ là những thứ đơn giản như nước tương, dầu ăn, muối - luôn có sẵn trong bếp.",
  },
  {
    title: "Dùng được nhiều nguyên liệu đã chọn",
    description:
      "Món được chọn sẽ tận dụng tối đa số nguyên liệu bạn đã chọn. Không để thực phẩm nào bị bỏ quên trong tủ lạnh.",
  },
  {
    title: "Công thức đơn giản, quen thuộc",
    description:
      "Không phải món lạ hay quá phức tạp. Mỗi món đều là món ăn Việt quen thuộc, dễ làm, ai cũng nấu được trong 15-30 phút.",
  },
];

onMounted(() => {
  fetchIngredients();
});

const scrollToIngredients = () => {
  document.documentElement.classList.add("smooth-scroll");
  ingredientsSection.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  setTimeout(() => {
    document.documentElement.classList.remove("smooth-scroll");
  }, 1000);
};

const handleIngredientClick = (ingredient) => {
  // CẬP NHẬT: Giới hạn tối đa 3 nguyên liệu
  if (!isSelected(ingredient.id) && selectedCount.value >= 3) {
    alert("Bạn chỉ có thể chọn tối đa 3 nguyên liệu");
    return;
  }

  toggleIngredient(ingredient);
};

// CẬP NHẬT: Tìm nhiều món thay vì 1 món
const handleFindRecipe = async () => {
  if (!canSubmit.value) return;

  showRecipeModal.value = true;

  try {
    const ingredientIds = selectedIngredients.value.map((i) => i.id);
    await findRecipesByIngredients(ingredientIds);
  } catch (err) {
    console.error("Error finding recipes:", err);
  }
};

// THÊM: Xử lý khi người dùng chọn món
const handleSelectRecipe = async (recipe) => {
  showRecipeModal.value = false;

  // Increment stats
  // (có thể thêm vào recipeService sau)

  // Chuyển đến trang chi tiết món
  router.push(`/recipe/${recipe._id || recipe.id}`);
};

// THÊM: Đóng modal
const handleCloseModal = () => {
  showRecipeModal.value = false;
};
</script>



<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
