<!-- src/components/community/FilterBar.vue -->
<template>
  <div
    class="bg-white rounded-xl border border-neutral-200 p-4 md:p-6 shadow-sm"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-neutral-900 flex items-center gap-2">
        <svg
          class="w-5 h-5 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Lọc công thức
      </h3>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Xóa bộ lọc
      </button>
    </div>

    <div class="grid md:grid-cols-3 gap-4">
      <!-- Độ khó -->
      <div>
        <label class="block text-sm font-semibold text-neutral-700 mb-2">
          Độ khó
        </label>
        <select
          :value="filters.difficulty"
          @change="updateFilter('difficulty', $event.target.value)"
          class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Tất cả</option>
          <option value="1">★ Rất dễ</option>
          <option value="2">★★ Dễ</option>
          <option value="3">★★★ Trung bình</option>
          <option value="4">★★★★ Khó</option>
          <option value="5">★★★★★ Rất khó</option>
        </select>
      </div>

      <!-- Thời gian nấu -->
      <div>
        <label class="block text-sm font-semibold text-neutral-700 mb-2">
          Thời gian nấu
        </label>
        <select
          :value="filters.cookingTime"
          @change="updateFilter('cookingTime', $event.target.value)"
          class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Tất cả</option>
          <option value="15">≤ 15 phút</option>
          <option value="30">≤ 30 phút</option>
          <option value="60">≤ 1 giờ</option>
          <option value="120">≤ 2 giờ</option>
        </select>
      </div>

      <!-- Số nguyên liệu -->
      <div>
        <label class="block text-sm font-semibold text-neutral-700 mb-2">
          Số nguyên liệu
        </label>
        <select
          :value="filters.ingredientCount"
          @change="updateFilter('ingredientCount', $event.target.value)"
          class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Tất cả</option>
          <option value="2">1 Nguyên liệu</option>
          <option value="3">≤ 3 Nguyên liệu</option>
          <option value="5">≤ 5 Nguyên liệu</option>
        </select>
      </div>
    </div>

    <!-- Active filters badges -->
    <div
      v-if="hasActiveFilters"
      class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-100"
    >
      <span class="text-xs text-neutral-600 font-medium">Đang lọc:</span>
      <span
        v-if="filters.difficulty"
        class="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
      >
        Độ khó: {{ getDifficultyLabel(filters.difficulty) }}
        <button
          @click="updateFilter('difficulty', '')"
          class="hover:text-primary-900"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
      <span
        v-if="filters.cookingTime"
        class="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
      >
        Thời gian: ≤ {{ getTimeLabel(filters.cookingTime) }}
        <button
          @click="updateFilter('cookingTime', '')"
          class="hover:text-primary-900"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
      <span
        v-if="filters.ingredientCount"
        class="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
      >
        Nguyên liệu: ≤ {{ filters.ingredientCount }} món
        <button
          @click="updateFilter('ingredientCount', '')"
          class="hover:text-primary-900"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:filters"]);

const hasActiveFilters = computed(() => {
  return (
    props.filters.difficulty ||
    props.filters.cookingTime ||
    props.filters.ingredientCount
  );
});

const updateFilter = (key, value) => {
  emit("update:filters", {
    ...props.filters,
    [key]: value,
  });
};

const clearFilters = () => {
  emit("update:filters", {
    difficulty: "",
    cookingTime: "",
    ingredientCount: "",
  });
};

const getDifficultyLabel = (value) => {
  const labels = {
    1: "Rất dễ",
    2: "Dễ",
    3: "Trung bình",
    4: "Khó",
    5: "Rất khó",
  };
  return labels[value] || value;
};

const getTimeLabel = (value) => {
  if (value === "15") return "15 phút";
  if (value === "30") return "30 phút";
  if (value === "60") return "1 giờ";
  if (value === "120") return "2 giờ";
  return value;
};
</script>
