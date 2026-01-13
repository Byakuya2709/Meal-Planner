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

  async getCommunityRecipes(limit = 10) {
    await delay(500);
    return { success: true, data: mockCommunity.slice(0, limit) };
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
