// src/services/recipeService.js

import { supabaseRecipeService } from "./supabaseRecipeService";
import {
  ingredients as mockIngredients,
  recipes as mockRecipes,
  communityRecipes as mockCommunity,
  impactStats as mockImpact,
} from "./mockData";

// Kiểm tra xem có Supabase config không
const USE_SUPABASE = !!(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Simulate API delay cho mock data
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock service - Fallback khi không có Supabase
const mockService = {
  async getIngredients() {
    await delay(300);
    return { success: true, data: mockIngredients };
  },

  async getIngredientsByCategory(category) {
    await delay(200);
    const filtered = mockIngredients.filter((ing) => ing.category === category);
    return { success: true, data: filtered };
  },

  async findRecipe(selectedIngredientIds) {
    await delay(800);
    let bestMatch = null;
    let maxMatches = 0;

    for (const recipe of mockRecipes) {
      const matches =
        recipe.requiredIngredients?.filter((id) =>
          selectedIngredientIds.includes(id)
        ).length || 0;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = recipe;
      }
    }

    if (!bestMatch) {
      bestMatch = mockRecipes[0];
    }

    return { success: true, data: bestMatch };
  },

  // Tìm nhiều món ăn dựa trên nguyên liệu với thuật toán chấm điểm
  async findRecipesByIngredients(selectedIngredientIds) {
    await delay(1000); // Tạo thời gian cho hiệu ứng loading

    // Thuật toán chấm điểm
    const scoredRecipes = mockRecipes.map((recipe) => {
      const requiredIngredients = recipe.requiredIngredients || [];

      // Đếm số nguyên liệu khớp
      const matchedCount = requiredIngredients.filter((id) =>
        selectedIngredientIds.includes(id)
      ).length;

      // Đếm tổng số nguyên liệu cần thiết của món
      const totalRequired = requiredIngredients.length;

      // Tính điểm phù hợp (0-100)
      let matchScore = 0;

      if (matchedCount === 0) {
        // Không khớp nguyên liệu nào -> loại bỏ
        matchScore = 0;
      } else {
        // Điểm cơ bản: tỷ lệ nguyên liệu khớp
        const baseScore = (matchedCount / totalRequired) * 100;

        // Bonus: ưu tiên món dùng nhiều nguyên liệu đã chọn
        const usageBonus = (matchedCount / selectedIngredientIds.length) * 20;

        // Bonus: ưu tiên món có ít nguyên liệu cần thêm
        const missingIngredients = totalRequired - matchedCount;
        const simplicityBonus = Math.max(0, (3 - missingIngredients) * 10);

        matchScore = Math.min(100, baseScore + usageBonus + simplicityBonus);
      }

      return {
        ...recipe,
        matchScore: Math.round(matchScore),
        matchedCount,
        totalRequired,
        matchedIngredients: requiredIngredients
          .filter((id) => selectedIngredientIds.includes(id))
          .map((id) => mockIngredients.find((ing) => ing.id === id))
          .filter(Boolean),
      };
    });

    // Lọc và sắp xếp
    const validRecipes = scoredRecipes
      .filter((recipe) => recipe.matchScore > 0) // Chỉ lấy món có ít nhất 1 nguyên liệu khớp
      .sort((a, b) => {
        // Ưu tiên theo điểm
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        // Nếu bằng điểm, ưu tiên món dùng nhiều nguyên liệu đã chọn hơn
        if (b.matchedCount !== a.matchedCount) {
          return b.matchedCount - a.matchedCount;
        }
        // Cuối cùng ưu tiên món có ít nguyên liệu cần thiết hơn
        return a.totalRequired - b.totalRequired;
      });

    // Lấy tối đa 3 món phù hợp nhất
    const topRecipes = validRecipes.slice(0, 3);

    // Đảm bảo luôn có ít nhất 1 món
    if (topRecipes.length === 0 && mockRecipes.length > 0) {
      const fallback = {
        ...mockRecipes[0],
        matchScore: 30,
        matchedCount: 0,
        totalRequired: mockRecipes[0].requiredIngredients?.length || 0,
        matchedIngredients: [],
      };
      topRecipes.push(fallback);
    }

    return { success: true, data: topRecipes };
  },

  async getRecipeById(id) {
    await delay(400);
    // Tìm trong cả recipes và communityRecipes
    const allRecipes = [...mockRecipes, ...mockCommunity];
    const recipe = allRecipes.find((r) => r._id === id || r.id === id);

    if (!recipe) {
      return { success: false, error: "Recipe not found" };
    }

    return { success: true, data: recipe };
  },

  async getCommunityRecipes(options = {}) {
    // Nếu có Supabase, dùng nó
    if (USE_SUPABASE && supabaseRecipeService) {
      return await supabaseRecipeService.getCommunityRecipes(options);
    }

    // Fallback to mock data
    await delay(500);

    const {
      limit = 6,
      offset = 0,
      difficulty = "",
      cookingTime = "",
      ingredientCount = "",
      sortBy = "latest",
    } = options;

    const mockRecipes = await import("./mockData");
    let communityRecipes = [...(mockRecipes.communityRecipes || [])];

    // Apply filters
    if (difficulty) {
      communityRecipes = communityRecipes.filter(
        (r) => r.difficulty_score === parseInt(difficulty)
      );
    }

    if (cookingTime) {
      communityRecipes = communityRecipes.filter(
        (r) => r.time_minutes <= parseInt(cookingTime)
      );
    }

    if (ingredientCount) {
      communityRecipes = communityRecipes.filter(
        (r) =>
          (r.ingredients_list_fixed?.length || 0) <= parseInt(ingredientCount)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        communityRecipes.sort(
          (a, b) => (b.like_count || 0) - (a.like_count || 0)
        );
        break;
      case "easy":
        communityRecipes.sort(
          (a, b) => (a.difficulty_score || 1) - (b.difficulty_score || 1)
        );
        break;
      case "latest":
      default:
        communityRecipes.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
    }

    const total = communityRecipes.length;
    const paginatedData = communityRecipes.slice(offset, offset + limit);

    console.log(
      `[Mock] Fetching recipes: offset=${offset}, limit=${limit}, total=${total}, returned=${paginatedData.length}`
    );

    return {
      success: true,
      data: paginatedData,
      total: total,
      hasMore: offset + paginatedData.length < total,
    };
  },

  async voteRecipe(recipeId) {
    // Mock service yêu cầu đăng nhập
    return {
      success: false,
      error: "Vui lòng đăng nhập để thích công thức",
      requireAuth: true,
    };
  },

  async unlikeRecipe(recipeId) {
    return {
      success: false,
      error: "Vui lòng đăng nhập",
      requireAuth: true,
    };
  },

  async checkUserLiked(recipeId) {
    return { success: true, data: false };
  },

  async getImpactStats() {
    await delay(400);
    return { success: true, data: mockImpact };
  },

  async incrementMealCreated() {
    await delay(300);
    mockImpact.mealsCreated += 1;
    mockImpact.foodSaved += 0.5;
    mockImpact.co2Reduced += 0.35;
    mockImpact.moneySaved += 25000;
    return { success: true };
  },
};

// Export service dựa trên cấu hình
export const recipeService = USE_SUPABASE ? supabaseRecipeService : mockService;

// Log để debug (chỉ trong development)
if (import.meta.env.DEV) {
  console.log(
    USE_SUPABASE ? "✅ Using Supabase backend" : "⚠️ Using mock data"
  );
}
