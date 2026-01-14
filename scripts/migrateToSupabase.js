// scripts/migrateToSupabase.js

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env") });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Thiếu SUPABASE_URL hoặc SUPABASE_ANON_KEY trong .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== DATA TỪ mockData.js =====

const ingredients = [
  { id: "chicken", name: "Thịt gà", category: "protein", icon: "🍗" },
  { id: "pork", name: "Thịt heo", category: "protein", icon: "🥓" },
  { id: "beef", name: "Thịt bò", category: "protein", icon: "🥩" },
  { id: "fish", name: "Cá", category: "protein", icon: "🐟" },
  { id: "shrimp", name: "Tôm", category: "protein", icon: "🦐" },
  { id: "egg", name: "Trứng", category: "protein", icon: "🥚" },
  { id: "tofu", name: "Đậu hũ", category: "protein", icon: "🧈" },

  { id: "rice", name: "Gạo", category: "carb", icon: "🍚" },
  { id: "rice_noodles", name: "Bánh phở / Bún", category: "carb", icon: "🍜" },
  { id: "noodles", name: "Mì", category: "carb", icon: "🍜" },

  { id: "tomato", name: "Cà chua", category: "vegetable", icon: "🍅" },
  { id: "cabbage", name: "Bắp cải", category: "vegetable", icon: "🥬" },
  { id: "carrot", name: "Cà rốt", category: "vegetable", icon: "🥕" },
  { id: "potato", name: "Khoai tây", category: "vegetable", icon: "🥔" },
  { id: "onion", name: "Hành tây", category: "vegetable", icon: "🧅" },
  { id: "spring_onion", name: "Hành lá", category: "vegetable", icon: "🌿" },
  { id: "garlic", name: "Tỏi", category: "vegetable", icon: "🧄" },
  { id: "pepper", name: "Ớt", category: "vegetable", icon: "🌶️" },
  { id: "mushroom", name: "Nấm", category: "vegetable", icon: "🍄" },
  { id: "okra", name: "Đậu bắp", category: "vegetable", icon: "🥒" },
  { id: "bean_sprouts", name: "Giá đỗ", category: "vegetable", icon: "🌱" },
  { id: "lemongrass", name: "Sả", category: "vegetable", icon: "🌾" },
  { id: "fish_sauce", name: "Nước mắm", category: "vegetable", icon: "🥫" },

  { id: "sugar", name: "Đường", category: "carb", icon: "🍬" },
  { id: "tamarind", name: "Me", category: "carb", icon: "🥭" },
  { id: "pineapple", name: "Thơm (dứa)", category: "carb", icon: "🍍" },
  { id: "rice_paper", name: "Bánh tráng", category: "carb", icon: "🍘" },

  { id: "coconut", name: "Nước dừa / Cốt dừa", category: "dairy", icon: "🥥" },
];

const recipes = [
  // ========== MỨC ĐỘ DỄ - ÍT NGUYÊN LIỆU ==========
  {
    title: 'Trứng Chiên Cà Chua',
    description: 'Món ăn đơn giản nhất, chỉ cần 2 nguyên liệu chính, nhanh gọn cho bữa cơm gia đình.',
    image_url: 'https://images.unsplash.com/photo-1584270354949-1c5b7e6d9b29?w=1200',
    time_minutes: 15,
    difficulty_score: 1,
    ingredients_list: [
      'Trứng gà',
      'Cà chua'
    ],
    ingredients_list_fixed: [
      'egg 3',
      'tomato 2'
    ],
    seasoning: [
      'Nước mắm 1 muỗng canh',
      'Đường 1 muỗng cà phê',
      'Tiêu'
    ],
    instructions: [
      'Cắt cà chua múi cau, đánh tan trứng.',
      'Xào cà chua với chút dầu cho mềm.',
      'Đổ trứng vào, đảo nhẹ tay cho trứng vừa chín.',
      'Nêm nếm, rắc tiêu và tắt bếp.'
    ],
    tags: ['nhanh', 'gia đình', 'dễ làm'],
    like_count: 310,
    is_community: false,
    requiredIngredients: ['egg', 'tomato'],
    nutrition_facts: {
      calories: 180,
      protein: 12,
      carbs: 8,
      fat: 11,
      fiber: 2
    }
  },

  {
    title: 'Đậu Hũ Sốt Cà Chua',
    description: 'Đậu hũ mềm sốt cà chua chua ngọt, món chay đơn giản mà ngon.',
    image_url: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=1200',
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: [
      'Đậu hũ',
      'Cà chua',
      'Hành tây'
    ],
    ingredients_list_fixed: [
      'tofu 300g',
      'tomato 3',
      'onion 1'
    ],
    seasoning: [
      'Nước mắm 1 muỗng canh',
      'Đường 1 muỗng cà phê',
      'Tiêu'
    ],
    instructions: [
      'Chiên đậu hũ vàng các mặt, để ráo dầu.',
      'Xào hành tây thơm, cho cà chua vào xào mềm.',
      'Cho đậu vào sốt, om nhỏ lửa 5 phút cho thấm.',
      'Nêm nếm vừa ăn, rắc hành lá.'
    ],
    tags: ['chay', 'dễ làm', 'healthy'],
    like_count: 175,
    is_community: false,
    requiredIngredients: ['tofu', 'tomato', 'onion'],
    nutrition_facts: {
      calories: 220,
      protein: 15,
      carbs: 18,
      fat: 10,
      fiber: 4
    }
  },

  {
    title: 'Tôm Rim Mặn Ngọt',
    description: 'Tôm rim đậm đà, bắt cơm, chỉ cần vài bước đơn giản.',
    image_url: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200',
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: [
      'Tôm',
      'Tỏi',
      'Ớt'
    ],
    ingredients_list_fixed: [
      'shrimp 300g',
      'garlic 3 cloves',
      'pepper 2'
    ],
    seasoning: [
      'Nước mắm 2 muỗng canh',
      'Đường 1 muỗng canh',
      'Nước 50ml'
    ],
    instructions: [
      'Rửa tôm sạch, cắt tỉa râu.',
      'Phi thơm tỏi và ớt với dầu.',
      'Cho tôm vào đảo đến khi săn lại.',
      'Nêm gia vị, rim lửa nhỏ đến khi sệt.'
    ],
    tags: ['rim', 'nhanh', 'hải sản'],
    like_count: 260,
    is_community: false,
    requiredIngredients: ['shrimp', 'garlic'],
    nutrition_facts: {
      calories: 185,
      protein: 28,
      carbs: 12,
      fat: 3,
      fiber: 0
    }
  },

  {
    title: 'Canh Rau Ngót Nấu Tôm',
    description: 'Canh thanh mát, nấu nhanh, rất dễ làm với rau ngót và tôm.',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200',
    time_minutes: 20,
    difficulty_score: 1,
    ingredients_list: [
      'Rau ngót',
      'Tôm',
      'Tỏi'
    ],
    ingredients_list_fixed: [
      'vegetable 200g',
      'shrimp 150g',
      'garlic 2 cloves'
    ],
    seasoning: [
      'Nước mắm 2 muỗng canh',
      'Muối',
      'Tiêu'
    ],
    instructions: [
      'Đun sôi nước, phi thơm tỏi.',
      'Cho tôm vào nấu chín.',
      'Thêm rau ngót, đun sôi 2 phút.',
      'Nêm nếm và tắt bếp.'
    ],
    tags: ['canh', 'nhanh', 'thanh mát'],
    like_count: 145,
    is_community: false,
    requiredIngredients: ['shrimp', 'garlic'],
    nutrition_facts: {
      calories: 120,
      protein: 18,
      carbs: 8,
      fat: 2,
      fiber: 3
    }
  },

  // ========== MỨC ĐỘ VỪA - NGUYÊN LIỆU TRUNG BÌNH ==========
  {
    title: 'Thịt Heo Kho Nước Dừa',
    description: 'Món kho quen thuộc với nước dừa béo nhẹ, thịt mềm đậm đà.',
    image_url: 'https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200',
    time_minutes: 70,
    difficulty_score: 2,
    ingredients_list: [
      'Thịt heo',
      'Nước dừa',
      'Tỏi',
      'Trứng'
    ],
    ingredients_list_fixed: [
      'pork 500g',
      'coconut 300ml',
      'garlic 4 cloves',
      'egg 4'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Đường 2 muỗng canh',
      'Tiêu',
      'Nước màu'
    ],
    instructions: [
      'Thái thịt miếng vừa ăn, ướp với nước mắm, đường và tỏi 20 phút.',
      'Luộc trứng chín, bóc vỏ.',
      'Xào thịt cho săn, thêm nước màu.',
      'Đổ nước dừa vào, kho nhỏ lửa 50 phút.',
      'Cho trứng vào kho cùng đến khi nước sệt.'
    ],
    tags: ['kho', 'gia đình', 'bữa chính'],
    like_count: 260,
    is_community: false,
    requiredIngredients: ['pork', 'coconut', 'egg'],
    nutrition_facts: {
      calories: 420,
      protein: 32,
      carbs: 15,
      fat: 28,
      fiber: 1
    }
  },

  {
    title: 'Cá Kho Tộ',
    description: 'Cá kho kiểu Nam Bộ với nước dừa, thơm ngon đậm đà.',
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200',
    time_minutes: 60,
    difficulty_score: 2,
    ingredients_list: [
      'Cá',
      'Nước dừa',
      'Tỏi',
      'Ớt',
      'Hành lá'
    ],
    ingredients_list_fixed: [
      'fish 500g',
      'coconut 200ml',
      'garlic 5 cloves',
      'pepper 3',
      'spring_onion 1 bunch'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Đường 2 muỗng canh',
      'Tiêu',
      'Nước màu'
    ],
    instructions: [
      'Làm sạch cá, cắt khúc vừa ăn.',
      'Ướp cá với gia vị 30 phút.',
      'Xếp cá vào nồi đất, lót đáy bằng tỏi và ớt.',
      'Đổ nước dừa, kho lửa nhỏ 40 phút.',
      'Rắc hành lá trước khi tắt bếp.'
    ],
    tags: ['kho', 'hải sản', 'truyền thống'],
    like_count: 285,
    is_community: false,
    requiredIngredients: ['fish', 'coconut', 'garlic'],
    nutrition_facts: {
      calories: 320,
      protein: 35,
      carbs: 14,
      fat: 15,
      fiber: 1
    }
  },

  {
    title: 'Canh Chua Cá',
    description: 'Canh chua miền Nam với thơm, cà chua và me, vị chua ngọt hài hòa.',
    image_url: 'https://images.unsplash.com/photo-1604908177479-3b2d6f3e5b5d?w=1200',
    time_minutes: 35,
    difficulty_score: 2,
    ingredients_list: [
      'Cá',
      'Cà chua',
      'Thơm',
      'Me',
      'Đậu bắp',
      'Giá đỗ'
    ],
    ingredients_list_fixed: [
      'fish 400g',
      'tomato 2',
      'pineapple 100g',
      'tamarind 2 tbsp',
      'okra 100g',
      'bean_sprouts 50g'
    ],
    seasoning: [
      'Nước mắm 2 muỗng canh',
      'Đường 1 muỗng canh',
      'Muối'
    ],
    instructions: [
      'Đun sôi nước, cho me vào dầm lấy nước chua.',
      'Cho cá vào nấu chín, hớt bọt.',
      'Thêm cà chua, thơm, đậu bắp.',
      'Nêm nếm vừa ăn, cho giá vào và tắt bếp.'
    ],
    tags: ['canh', 'miền tây', 'chua ngọt'],
    like_count: 185,
    is_community: false,
    requiredIngredients: ['fish', 'tamarind', 'tomato', 'pineapple'],
    nutrition_facts: {
      calories: 210,
      protein: 28,
      carbs: 20,
      fat: 4,
      fiber: 5
    }
  },

  {
    title: 'Gà Kho Gừng',
    description: 'Gà kho thơm mùi gừng, ấm bụng, rất hợp ngày lạnh.',
    image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200',
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: [
      'Thịt gà',
      'Gừng',
      'Tỏi',
      'Hành tây',
      'Ớt'
    ],
    ingredients_list_fixed: [
      'chicken 600g',
      'ginger 50g',
      'garlic 4 cloves',
      'onion 1',
      'pepper 2'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Đường 1 muỗng canh',
      'Tiêu',
      'Dầu ăn'
    ],
    instructions: [
      'Chặt gà miếng vừa, ướp với gia vị 30 phút.',
      'Phi thơm gừng, tỏi, hành tây.',
      'Cho gà vào xào săn.',
      'Đổ nước vừa ngập, kho lửa nhỏ 35 phút.',
      'Kho đến khi nước sệt, gà mềm.'
    ],
    tags: ['kho', 'gà', 'ấm bụng'],
    like_count: 245,
    is_community: false,
    requiredIngredients: ['chicken', 'garlic', 'onion'],
    nutrition_facts: {
      calories: 380,
      protein: 42,
      carbs: 12,
      fat: 18,
      fiber: 2
    }
  },

  {
    title: 'Bò Xào Rau Củ',
    description: 'Bò xào với nhiều loại rau củ, bổ dưỡng và màu sắc.',
    image_url: 'https://images.unsplash.com/photo-1603073163308-b5c4c2bea0aa?w=1200',
    time_minutes: 30,
    difficulty_score: 2,
    ingredients_list: [
      'Thịt bò',
      'Cà rốt',
      'Bắp cải',
      'Nấm',
      'Hành tây',
      'Tỏi'
    ],
    ingredients_list_fixed: [
      'beef 300g',
      'carrot 1',
      'cabbage 150g',
      'mushroom 100g',
      'onion 1',
      'garlic 3 cloves'
    ],
    seasoning: [
      'Nước mắm 2 muỗng canh',
      'Dầu hào 1 muỗng canh',
      'Tiêu',
      'Bột năng'
    ],
    instructions: [
      'Thái bò mỏng, ướp với nước mắm, bột năng 15 phút.',
      'Thái rau củ vừa ăn.',
      'Xào nhanh bò trên lửa lớn, gắp ra.',
      'Xào rau củ, nêm gia vị.',
      'Cho bò vào đảo đều và tắt bếp.'
    ],
    tags: ['xào', 'bò', 'healthy'],
    like_count: 220,
    is_community: false,
    requiredIngredients: ['beef', 'carrot', 'mushroom', 'onion'],
    nutrition_facts: {
      calories: 340,
      protein: 35,
      carbs: 22,
      fat: 14,
      fiber: 6
    }
  },

  {
    title: 'Mực Xào Chua Ngọt',
    description: 'Mực tươi xào với sốt chua ngọt, thơm ngon giòn dai.',
    image_url: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200',
    time_minutes: 25,
    difficulty_score: 2,
    ingredients_list: [
      'Mực',
      'Cà chua',
      'Thơm',
      'Hành tây',
      'Tỏi'
    ],
    ingredients_list_fixed: [
      'seafood 300g',
      'tomato 2',
      'pineapple 100g',
      'onion 1',
      'garlic 3 cloves'
    ],
    seasoning: [
      'Nước mắm 1 muỗng canh',
      'Đường 2 muỗng canh',
      'Giấm 1 muỗng canh',
      'Tương ớt 1 muỗng cà phê'
    ],
    instructions: [
      'Làm sạch mực, cắt khoanh.',
      'Pha sốt chua ngọt với các gia vị.',
      'Xào thơm tỏi, hành, cà chua.',
      'Cho mực vào xào nhanh 2 phút.',
      'Đổ sốt vào, đảo đều và tắt bếp.'
    ],
    tags: ['xào', 'hải sản', 'chua ngọt'],
    like_count: 195,
    is_community: false,
    requiredIngredients: ['tomato', 'pineapple', 'onion'],
    nutrition_facts: {
      calories: 250,
      protein: 24,
      carbs: 28,
      fat: 6,
      fiber: 3
    }
  },

  // ========== MỨC ĐỘ KHÓ - NHIỀU NGUYÊN LIỆU ==========
  {
    title: 'Phở Gà',
    description: 'Phở gà thanh nhẹ, thơm mùi gừng và hành, cần nhiều gia vị.',
    image_url: 'https://images.unsplash.com/photo-1604908177469-7f547b9f40f4?w=1200',
    time_minutes: 120,
    difficulty_score: 3,
    ingredients_list: [
      'Bánh phở',
      'Thịt gà',
      'Hành lá',
      'Gừng',
      'Hành tây',
      'Tỏi'
    ],
    ingredients_list_fixed: [
      'rice_noodles 200g',
      'chicken 500g',
      'spring_onion 1 bunch',
      'ginger 30g',
      'onion 1',
      'garlic 3 cloves'
    ],
    seasoning: [
      'Nước mắm 2 muỗng canh',
      'Muối vừa ăn',
      'Đường',
      'Bột ngọt',
      'Hạt nêm'
    ],
    instructions: [
      'Luộc gà với nước lạnh, hớt bọt cho nước trong.',
      'Thêm gừng, hành tây nướng vào nồi.',
      'Ninh nhỏ lửa 90 phút.',
      'Xé gà thành sợi vừa ăn.',
      'Chần bánh phở, xếp gà lên.',
      'Chan nước dùng nóng, rắc hành lá và tiêu.'
    ],
    tags: ['phở', 'nhẹ', 'truyền thống'],
    like_count: 210,
    is_community: false,
    requiredIngredients: ['chicken', 'rice_noodles', 'spring_onion'],
    nutrition_facts: {
      calories: 450,
      protein: 38,
      carbs: 52,
      fat: 10,
      fiber: 3
    }
  },

  {
    title: 'Phở Bò Hà Nội',
    description: 'Phở bò truyền thống miền Bắc với nước dùng trong, ngọt tự nhiên từ xương bò.',
    image_url: 'https://images.unsplash.com/photo-1604908177522-5c9d7f1b4f04?w=1200',
    time_minutes: 180,
    difficulty_score: 3,
    ingredients_list: [
      'Bánh phở',
      'Thịt bò',
      'Xương bò',
      'Hành lá',
      'Gừng',
      'Hành tây',
      'Tỏi'
    ],
    ingredients_list_fixed: [
      'rice_noodles 200g',
      'beef 150g',
      'beef_bone 500g',
      'spring_onion 1 bunch',
      'ginger 50g',
      'onion 2',
      'garlic 3 cloves'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Muối 1 muỗng cà phê',
      'Đường phèn 1 muỗng canh',
      'Hạt tiêu',
      'Thảo quả',
      'Hồi'
    ],
    instructions: [
      'Ninh xương bò với nước lạnh 30 phút, đổ nước.',
      'Ninh lại với nước mới, hớt bọt liên tục.',
      'Cho gừng và hành nướng vào nồi.',
      'Ninh nhỏ lửa ít nhất 2-3 giờ.',
      'Luộc thịt bò riêng, thái mỏng.',
      'Chần bánh phở, xếp thịt bò lên trên.',
      'Chan nước dùng nóng và rắc hành lá.'
    ],
    tags: ['truyền thống', 'phở', 'bữa sáng'],
    like_count: 340,
    is_community: false,
    requiredIngredients: ['beef', 'rice_noodles', 'spring_onion'],
    nutrition_facts: {
      calories: 520,
      protein: 42,
      carbs: 58,
      fat: 14,
      fiber: 3
    }
  },

  {
    title: 'Bún Bò Huế',
    description: 'Bún bò Huế với nước dùng đậm đà, cay nồng đặc trưng miền Trung.',
    image_url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200',
    time_minutes: 150,
    difficulty_score: 3,
    ingredients_list: [
      'Bún',
      'Thịt bò',
      'Giò heo',
      'Sả',
      'Hành tây',
      'Tỏi',
      'Ớt',
      'Mắm ruốc'
    ],
    ingredients_list_fixed: [
      'rice_noodles 250g',
      'beef 200g',
      'pork 200g',
      'lemongrass 3 stalks',
      'onion 1',
      'garlic 5 cloves',
      'pepper 5',
      'shrimp_paste 2 tbsp'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Mắm ruốc 2 muỗng canh',
      'Đường 1 muỗng canh',
      'Muối',
      'Dầu màu điều'
    ],
    instructions: [
      'Ninh xương heo với sả, hành, tỏi 2 giờ.',
      'Luộc thịt bò và giò heo riêng.',
      'Phi thơm sả, tỏi, ớt với dầu màu điều.',
      'Nêm nước dùng với mắm ruốc và gia vị.',
      'Chần bún, xếp thịt và giò heo.',
      'Chan nước dùng, rắc rau thơm.'
    ],
    tags: ['bún', 'miền trung', 'cay', 'đặc sản'],
    like_count: 295,
    is_community: false,
    requiredIngredients: ['beef', 'pork', 'rice_noodles', 'lemongrass'],
    nutrition_facts: {
      calories: 580,
      protein: 45,
      carbs: 62,
      fat: 18,
      fiber: 4
    }
  },

  {
    title: 'Lẩu Thái',
    description: 'Lẩu Thái chua cay với tôm, mực, nấm và rau củ đa dạng.',
    image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200',
    time_minutes: 45,
    difficulty_score: 3,
    ingredients_list: [
      'Tôm',
      'Mực',
      'Cá',
      'Nấm',
      'Cà chua',
      'Sả',
      'Ớt',
      'Tỏi',
      'Rau các loại'
    ],
    ingredients_list_fixed: [
      'shrimp 200g',
      'seafood 150g',
      'fish 150g',
      'mushroom 150g',
      'tomato 3',
      'lemongrass 2 stalks',
      'pepper 5',
      'garlic 5 cloves',
      'cabbage 200g'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Chanh 3 trái',
      'Đường 2 muỗng canh',
      'Tương ớt',
      'Nước cốt gà'
    ],
    instructions: [
      'Đun sôi nước dùng với xương, sả, tỏi.',
      'Thêm cà chua, ớt, nêm chua cay vừa ăn.',
      'Chuẩn bị hải sản và rau củ.',
      'Nhúng từng loại vào nước lẩu sôi.',
      'Ăn kèm nước chấm chua cay.'
    ],
    tags: ['lẩu', 'hải sản', 'cay', 'tiệc tùng'],
    like_count: 315,
    is_community: false,
    requiredIngredients: ['shrimp', 'tomato', 'mushroom', 'lemongrass', 'cabbage'],
    nutrition_facts: {
      calories: 380,
      protein: 42,
      carbs: 35,
      fat: 10,
      fiber: 8
    }
  },

  {
    title: 'Bánh Xèo Miền Tây',
    description: 'Bánh xèo giòn vàng với tôm, thịt, giá đỗ, ăn kèm rau sống.',
    image_url: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200',
    time_minutes: 60,
    difficulty_score: 3,
    ingredients_list: [
      'Bột bánh xèo',
      'Tôm',
      'Thịt heo',
      'Giá đỗ',
      'Nấm',
      'Hành lá',
      'Nước dừa',
      'Nghệ'
    ],
    ingredients_list_fixed: [
      'rice_flour 300g',
      'shrimp 200g',
      'pork 150g',
      'bean_sprouts 150g',
      'mushroom 100g',
      'spring_onion 1 bunch',
      'coconut 200ml',
      'turmeric 1 tsp'
    ],
    seasoning: [
      'Nước mắm 2 muỗng canh',
      'Muối',
      'Đường',
      'Tỏi',
      'Ớt'
    ],
    instructions: [
      'Pha bột bánh xèo với nước dừa và nghệ.',
      'Ướp tôm và thịt với gia vị.',
      'Đổ bột mỏng vào chảo nóng.',
      'Cho nhân tôm, thịt, giá vào.',
      'Chiên giòn, gấp đôi.',
      'Ăn kèm rau sống và nước mắm pha.'
    ],
    tags: ['bánh', 'miền tây', 'giòn', 'đặc sản'],
    like_count: 280,
    is_community: false,
    requiredIngredients: ['shrimp', 'pork', 'bean_sprouts', 'coconut'],
    nutrition_facts: {
      calories: 480,
      protein: 28,
      carbs: 58,
      fat: 16,
      fiber: 5
    }
  },

  {
    title: 'Gỏi Cuốn Tôm Thịt',
    description: 'Gỏi cuốn tươi mát với tôm, thịt luộc, bún và rau thơm.',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200',
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: [
      'Bánh tráng',
      'Tôm',
      'Thịt heo',
      'Bún',
      'Rau sống',
      'Hành lá',
      'Tỏi'
    ],
    ingredients_list_fixed: [
      'rice_paper 20',
      'shrimp 300g',
      'pork 200g',
      'rice_noodles 150g',
      'vegetables 200g',
      'spring_onion 1 bunch',
      'garlic 3 cloves'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Đường 2 muỗng canh',
      'Chanh 2 trái',
      'Ớt',
      'Tỏi'
    ],
    instructions: [
      'Luộc tôm và thịt, để nguội.',
      'Luộc bún, rửa qua nước lạnh.',
      'Pha nước chấm chua ngọt.',
      'Nhúng bánh tráng, xếp nhân và cuốn chặt.',
      'Ăn kèm nước mắm pha.'
    ],
    tags: ['gỏi', 'tươi mát', 'healthy', 'tiệc'],
    like_count: 265,
    is_community: false,
    requiredIngredients: ['rice_paper', 'shrimp', 'pork', 'rice_noodles'],
    nutrition_facts: {
      calories: 320,
      protein: 24,
      carbs: 45,
      fat: 6,
      fiber: 4
    }
  },

  {
    title: 'Cơm Tấm Sườn Bì Chả',
    description: 'Cơm tấm Sài Gòn với sườn nướng, bì và chả trứng đầy đủ.',
    image_url: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200',
    time_minutes: 90,
    difficulty_score: 3,
    ingredients_list: [
      'Gạo tấm',
      'Sườn heo',
      'Thịt heo',
      'Trứng',
      'Tỏi',
      'Hành tím',
      'Sả'
    ],
    ingredients_list_fixed: [
      'rice 300g',
      'pork_rib 300g',
      'pork 150g',
      'egg 3',
      'garlic 5 cloves',
      'shallot 3',
      'lemongrass 2 stalks'
    ],
    seasoning: [
      'Nước mắm 3 muỗng canh',
      'Đường 2 muỗng canh',
      'Dầu hào',
      'Tiêu',
      'Mật ong'
    ],
    instructions: [
      'Ướp sườn với gia vị qua đêm.',
      'Nướng sườn trên than hồng.',
      'Làm bì từ da heo luộc.',
      'Chiên chả trứng.',
      'Nấu cơm tấm.',
      'Xếp đĩa với đầy đủ topping, ăn kèm nước mắm pha.'
    ],
    tags: ['cơm', 'nướng', 'sài gòn', 'đặc sản'],
    like_count: 350,
    is_community: false,
    requiredIngredients: ['rice', 'pork', 'egg', 'garlic', 'lemongrass'],
    nutrition_facts: {
      calories: 680,
      protein: 38,
      carbs: 75,
      fat: 26,
      fiber: 2
    }
  },
  
];


const communityRecipes = [
  // ========== MỨC ĐỘ DỄ ==========
  {
    title: "Canh Chua Cá",
    description:
      "Canh chua cá miền Nam với thơm, cà chua và me, vị chua ngọt rất đưa cơm.",
    image_url:
      "https://images.unsplash.com/photo-1604908177479-3b2d6f3e5b5d?w=1200",
    time_minutes: 35,
    difficulty_score: 2,
    ingredients_list: [
      "Cá 300g",
      "Cà chua 2 trái",
      "Thơm 100g",
      "Đậu bắp 50g",
      "Me 2 tbsp",
    ],
    ingredients_list_fixed: [
      "fish 300g",
      "tomato 2",
      "pineapple 100g",
      "okra 50g",
      "tamarind 2 tbsp",
    ],
    seasoning: ["fish_sauce 2 tbsp", "sugar 1 tbsp"],
    instructions: [
      "Nấu nước dùng chua ngọt với me, cho cá và các loại rau vào, nêm vừa ăn.",
    ],
    tags: ["soup", "family"],
    like_count: 124,
    is_community: true,
    author_name: "Nguyễn Minh",
    author_avatar: "https://i.pravatar.cc/150?img=1",
    requiredIngredients: ["fish", "tomato", "tamarind"],
    nutrition_facts: {
      calories: 195,
      protein: 26,
      carbs: 18,
      fat: 3,
      fiber: 4
    }
  },

  {
    title: "Mì Xào Hải Sản",
    description:
      "Mì xào thập cẩm với tôm, mực và rau củ, nhanh gọn cho bữa tối.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: ["Mì 200g", "Tôm 150g", "Bắp cải 100g", "Cà rốt 1 củ"],
    ingredients_list_fixed: [
      "noodles 200g",
      "shrimp 150g",
      "cabbage 100g",
      "carrot 1",
    ],
    seasoning: ["fish_sauce 1 tbsp", "sugar 1 tsp"],
    instructions: [
      "Xào nhanh tôm và rau, cho mì vào đảo đều với gia vị, thưởng thức nóng.",
    ],
    tags: ["quick", "seafood"],
    like_count: 98,
    is_community: true,
    author_name: "Lê Thu",
    author_avatar: "https://i.pravatar.cc/150?img=2",
    requiredIngredients: ["noodles", "shrimp", "cabbage"],
    nutrition_facts: {
      calories: 380,
      protein: 22,
      carbs: 54,
      fat: 8,
      fiber: 5
    }
  },

  {
    title: "Đậu Hũ Sốt Cà Chua",
    description: "Đậu hũ mềm sốt cà chua ngọt nhẹ, thích hợp cho bữa chay.",
    image_url:
      "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=1200",
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: ["Đậu hũ 300g", "Cà chua 3 trái", "Hành tây 1 củ", "Nấm 100g"],
    ingredients_list_fixed: [
      "tofu 300g",
      "tomato 3",
      "onion 1",
      "mushroom 100g",
    ],
    seasoning: ["fish_sauce 1 tbsp", "sugar 1 tsp"],
    instructions: [
      "Chiên đậu hũ, nấu sốt cà chua với hành, nấm rồi cho đậu vào om cho thấm.",
    ],
    tags: ["vegetarian", "easy"],
    like_count: 87,
    is_community: true,
    author_name: "Trần Anh",
    author_avatar: "https://i.pravatar.cc/150?img=3",
    requiredIngredients: ["tofu", "tomato", "onion"],
    nutrition_facts: {
      calories: 235,
      protein: 16,
      carbs: 20,
      fat: 11,
      fiber: 5
    }
  },

  {
    title: "Canh Rau Muống Nấu Tôm",
    description: "Canh rau muống thanh mát, nhanh gọn cho bữa cơm hàng ngày.",
    image_url:
      "https://images.unsplash.com/photo-1604908177479-3b2d6f3e5b5d?w=1200",
    time_minutes: 15,
    difficulty_score: 1,
    ingredients_list: ["Rau muống 200g", "Tôm 100g", "Tỏi 2 tép"],
    ingredients_list_fixed: [
      "vegetable 200g",
      "shrimp 100g",
      "garlic 2 cloves",
    ],
    seasoning: ["fish_sauce 1 tbsp", "salt"],
    instructions: [
      "Đun sôi nước, cho tỏi phi thơm, thêm tôm và rau muống, nêm vừa ăn.",
    ],
    tags: ["soup", "quick", "healthy"],
    like_count: 76,
    is_community: true,
    author_name: "Văn Hà",
    author_avatar: "https://i.pravatar.cc/150?img=10",
    requiredIngredients: ["shrimp", "garlic"],
    nutrition_facts: {
      calories: 95,
      protein: 14,
      carbs: 6,
      fat: 2,
      fiber: 3
    }
  },

  {
    title: "Thịt Ba Chỉ Chiên Giòn",
    description: "Thịt ba chỉ chiên giòn rụm, ăn kèm cơm trắng hoặc bún.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200",
    time_minutes: 30,
    difficulty_score: 1,
    ingredients_list: ["Thịt ba chỉ 300g", "Tỏi 3 tép", "Ớt 2 trái"],
    ingredients_list_fixed: [
      "pork 300g",
      "garlic 3 cloves",
      "pepper 2",
    ],
    seasoning: ["fish_sauce 2 tbsp", "sugar 1 tsp", "pepper"],
    instructions: [
      "Luộc thịt ba chỉ, để nguội rồi thái lát mỏng, chiên vàng giòn, ăn kèm nước mắm pha.",
    ],
    tags: ["crispy", "pork", "easy"],
    like_count: 142,
    is_community: true,
    author_name: "Minh Tuấn",
    author_avatar: "https://i.pravatar.cc/150?img=11",
    requiredIngredients: ["pork", "garlic"],
    nutrition_facts: {
      calories: 420,
      protein: 18,
      carbs: 8,
      fat: 36,
      fiber: 1
    }
  },

  // ========== MỨC ĐỘ VỪA ==========
  {
    title: "Thịt Kho Tàu (Bà Nội)",
    description:
      "Thịt kho truyền thống với nước dừa, trứng luộc, thơm đậm đà đúng vị Tết.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200",
    time_minutes: 90,
    difficulty_score: 2,
    ingredients_list: ["Thịt heo 500g", "Trứng 4 quả", "Nước dừa 300ml", "Tỏi 5 tép"],
    ingredients_list_fixed: [
      "pork 500g",
      "egg 4",
      "coconut 300ml",
      "garlic 5 cloves",
    ],
    seasoning: ["fish_sauce 3 tbsp", "sugar 2 tbsp"],
    instructions: [
      "Kho thịt với nước dừa và gia vị đến khi thịt mềm, nước sánh và có màu bóng.",
    ],
    tags: ["traditional", "holiday"],
    like_count: 156,
    is_community: true,
    author_name: "Phạm Hải",
    author_avatar: "https://i.pravatar.cc/150?img=4",
    requiredIngredients: ["pork", "egg", "coconut"],
    nutrition_facts: {
      calories: 435,
      protein: 33,
      carbs: 16,
      fat: 29,
      fiber: 1
    }
  },

  {
    title: "Mì Quảng",
    description:
      "Mì Quảng đặc trưng miền Trung, nước ít, hương vị đậm và nhiều topping.",
    image_url:
      "https://images.unsplash.com/photo-1604908177435-6b9f1a0d5f4f?w=1200",
    time_minutes: 45,
    difficulty_score: 2,
    ingredients_list: ["Mì quảng 200g", "Tôm 100g", "Thịt 100g", "Rau sống 50g"],
    ingredients_list_fixed: [
      "noodles 200g",
      "shrimp 100g",
      "pork 100g",
      "bean_sprouts 50g",
    ],
    seasoning: ["fish_sauce", "turmeric"],
    instructions: [
      "Chuẩn bị nước lèo, trụng mì, xếp topping và rắc đậu phộng, rau thơm.",
    ],
    tags: ["regional", "noodles"],
    like_count: 132,
    is_community: true,
    author_name: "Mai Hương",
    author_avatar: "https://i.pravatar.cc/150?img=5",
    requiredIngredients: ["noodles", "shrimp", "pork"],
    nutrition_facts: {
      calories: 465,
      protein: 28,
      carbs: 58,
      fat: 12,
      fiber: 4
    }
  },

  {
    title: "Bò Lúc Lắc",
    description:
      "Bò lúc lắc chảo, miếng bò thơm, ăn kèm salad và cơm hoặc bánh mì.",
    image_url:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200",
    time_minutes: 30,
    difficulty_score: 2,
    ingredients_list: ["Thịt bò 300g", "Hành tây 1 củ", "Tỏi 2 tép"],
    ingredients_list_fixed: ["beef 300g", "onion 1", "garlic 2 cloves"],
    seasoning: ["fish_sauce 1 tbsp", "pepper"],
    instructions: [
      "Áp chảo nhanh miếng bò ướp, xào cùng hành tây, nêm gia vị, ăn nóng.",
    ],
    tags: ["beef", "dinner"],
    like_count: 201,
    is_community: true,
    author_name: "Hoàng Nam",
    author_avatar: "https://i.pravatar.cc/150?img=6",
    requiredIngredients: ["beef", "onion"],
    nutrition_facts: {
      calories: 365,
      protein: 36,
      carbs: 10,
      fat: 20,
      fiber: 2
    }
  },

  {
    title: "Cháo Gà",
    description:
      "Cháo gà mềm mịn, ấm bụng, phù hợp cho người ốm hoặc bữa sáng nhẹ.",
    image_url:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200",
    time_minutes: 60,
    difficulty_score: 1,
    ingredients_list: ["Gạo 200g", "Gà 300g", "Gừng 1 khúc", "Hành lá 1 bó"],
    ingredients_list_fixed: [
      "rice 200g",
      "chicken 300g",
      "ginger 1 piece",
      "spring_onion 1 bunch",
    ],
    seasoning: ["fish_sauce", "pepper"],
    instructions: [
      "Ninh cháo gạo với gà, nêm vừa ăn, rắc hành và tiêu khi ăn.",
    ],
    tags: ["comfort-food", "breakfast"],
    like_count: 176,
    is_community: true,
    author_name: "Ngọc Lan",
    author_avatar: "https://i.pravatar.cc/150?img=7",
    requiredIngredients: ["rice", "chicken", "spring_onion"],
    nutrition_facts: {
      calories: 385,
      protein: 28,
      carbs: 52,
      fat: 7,
      fiber: 2
    }
  },

  {
    title: "Sườn Xào Chua Ngọt",
    description: "Sườn xào với sốt chua ngọt, thơm ngon đậm đà.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200",
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: ["Sườn heo 400g", "Thơm 100g", "Cà chua 2 trái", "Hành tây 1 củ"],
    ingredients_list_fixed: [
      "pork 400g",
      "pineapple 100g",
      "tomato 2",
      "onion 1",
    ],
    seasoning: ["fish_sauce 2 tbsp", "sugar 2 tbsp", "vinegar 1 tbsp"],
    instructions: [
      "Chiên sườn vàng, xào hành cà chua thơm, thêm sốt chua ngọt và om cùng sườn.",
    ],
    tags: ["sweet-sour", "pork"],
    like_count: 188,
    is_community: true,
    author_name: "Thanh Hà",
    author_avatar: "https://i.pravatar.cc/150?img=12",
    requiredIngredients: ["pork", "pineapple", "tomato"],
    nutrition_facts: {
      calories: 410,
      protein: 32,
      carbs: 32,
      fat: 18,
      fiber: 3
    }
  },

  {
    title: "Cá Chiên Xù",
    description: "Cá chiên giòn xù, ăn kèm cơm và rau sống.",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200",
    time_minutes: 35,
    difficulty_score: 2,
    ingredients_list: ["Cá 400g", "Bột chiên giòn 100g", "Tỏi 3 tép"],
    ingredients_list_fixed: [
      "fish 400g",
      "flour 100g",
      "garlic 3 cloves",
    ],
    seasoning: ["fish_sauce 2 tbsp", "pepper", "salt"],
    instructions: [
      "Ướp cá với gia vị, tẩm bột chiên giòn, chiên vàng đều các mặt.",
    ],
    tags: ["fried", "crispy", "fish"],
    like_count: 154,
    is_community: true,
    author_name: "Đức Anh",
    author_avatar: "https://i.pravatar.cc/150?img=13",
    requiredIngredients: ["fish", "garlic"],
    nutrition_facts: {
      calories: 380,
      protein: 34,
      carbs: 28,
      fat: 15,
      fiber: 1
    }
  },

  // ========== MỨC ĐỘ KHÓ HƠN ==========
  {
    title: "Bún Thịt Nướng",
    description:
      "Bún thịt nướng thơm, ăn kèm rau sống, đồ chua và nước mắm chua ngọt.",
    image_url:
      "https://images.unsplash.com/photo-1589307000254-6d91a6f0d5d7?w=1200",
    time_minutes: 35,
    difficulty_score: 1,
    ingredients_list: ["Bún 200g", "Thịt nướng 200g", "Rau sống", "Đồ chua"],
    ingredients_list_fixed: [
      "rice_noodles 200g",
      "pork 200g",
      "bean_sprouts 50g",
    ],
    seasoning: ["fish_sauce", "sugar"],
    instructions: [
      "Nướng thịt, chuẩn bị bún và rau, chan nước mắm pha chua ngọt trước khi ăn.",
    ],
    tags: ["summer", "grill"],
    like_count: 245,
    is_community: true,
    author_name: "Thuỳ Dung",
    author_avatar: "https://i.pravatar.cc/150?img=8",
    requiredIngredients: ["rice_noodles", "pork"],
    nutrition_facts: {
      calories: 420,
      protein: 26,
      carbs: 58,
      fat: 10,
      fiber: 4
    }
  },

  {
    title: "Nem Rán (Chả Giò)",
    description: "Nem rán giòn rụm, nhân thịt và nấm, ăn kèm bún và rau sống.",
    image_url:
      "https://images.unsplash.com/photo-1544025163-3b2b2d3c2a7b?w=1200",
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: ["Bánh tráng 10 tờ", "Thịt băm 200g", "Nấm 50g", "Giá đỗ 50g"],
    ingredients_list_fixed: [
      "rice_paper 10",
      "pork 200g",
      "mushroom 50g",
      "bean_sprouts 50g",
    ],
    seasoning: ["fish_sauce", "pepper"],
    instructions: [
      "Cuộn nem với nhân, chiên vàng, ăn kèm nước chấm pha chua ngọt.",
    ],
    tags: ["appetizer", "party"],
    like_count: 198,
    is_community: true,
    author_name: "Văn Bình",
    author_avatar: "https://i.pravatar.cc/150?img=9",
    requiredIngredients: ["rice_paper", "pork", "mushroom"],
    nutrition_facts: {
      calories: 340,
      protein: 18,
      carbs: 38,
      fat: 14,
      fiber: 3
    }
  },

  {
    title: "Bún Riêu Cua",
    description: "Bún riêu cua với nước dùng đỏ thơm, nhiều topping.",
    image_url:
      "https://images.unsplash.com/photo-1604908177435-6b9f1a0d5f4f?w=1200",
    time_minutes: 70,
    difficulty_score: 3,
    ingredients_list: ["Bún 250g", "Riêu cua 200g", "Cà chua 3 trái", "Đậu hũ 100g", "Tôm 100g"],
    ingredients_list_fixed: [
      "rice_noodles 250g",
      "crab_paste 200g",
      "tomato 3",
      "tofu 100g",
      "shrimp 100g",
    ],
    seasoning: ["fish_sauce 3 tbsp", "mam_tom 1 tbsp", "sugar 1 tbsp"],
    instructions: [
      "Nấu nước dùng với cà chua, cho riêu cua vào, thêm đậu hũ và tôm, nêm vừa ăn, chan lên bún.",
    ],
    tags: ["noodles", "traditional", "complex"],
    like_count: 267,
    is_community: true,
    author_name: "Kim Chi",
    author_avatar: "https://i.pravatar.cc/150?img=14",
    requiredIngredients: ["rice_noodles", "tomato", "tofu", "shrimp"],
    nutrition_facts: {
      calories: 445,
      protein: 32,
      carbs: 54,
      fat: 12,
      fiber: 6
    }
  },

  {
    title: "Hủ Tiếu Nam Vang",
    description: "Hủ tiếu Nam Vang với nước dùng ngọt thanh, đa dạng topping.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 80,
    difficulty_score: 3,
    ingredients_list: ["Hủ tiếu 250g", "Tôm 150g", "Thịt heo 150g", "Gan heo 100g", "Tỏi 5 tép"],
    ingredients_list_fixed: [
      "rice_noodles 250g",
      "shrimp 150g",
      "pork 150g",
      "pork_liver 100g",
      "garlic 5 cloves",
    ],
    seasoning: ["fish_sauce 3 tbsp", "sugar 1 tbsp", "pepper"],
    instructions: [
      "Ninh nước dùng ngọt từ xương, chuẩn bị topping, chần hủ tiếu và chan nước dùng.",
    ],
    tags: ["noodles", "saigon", "comfort"],
    like_count: 223,
    is_community: true,
    author_name: "Minh Quân",
    author_avatar: "https://i.pravatar.cc/150?img=15",
    requiredIngredients: ["rice_noodles", "shrimp", "pork", "garlic"],
    nutrition_facts: {
      calories: 485,
      protein: 36,
      carbs: 60,
      fat: 11,
      fiber: 3
    }
  },

  {
    title: "Bánh Khọt Vũng Tàu",
    description: "Bánh khọt giòn ngoài mềm trong, ăn kèm tôm và rau sống.",
    image_url:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200",
    time_minutes: 55,
    difficulty_score: 3,
    ingredients_list: ["Bột gạo 250g", "Tôm 200g", "Nước dừa 200ml", "Hành lá 1 bó"],
    ingredients_list_fixed: [
      "rice_flour 250g",
      "shrimp 200g",
      "coconut 200ml",
      "spring_onion 1 bunch",
    ],
    seasoning: ["fish_sauce", "turmeric", "salt"],
    instructions: [
      "Pha bột với nước dừa và nghệ, đổ vào khuôn bánh khọt, cho tôm vào, chiên giòn.",
    ],
    tags: ["banh", "southern", "crispy"],
    like_count: 192,
    is_community: true,
    author_name: "Lan Phương",
    author_avatar: "https://i.pravatar.cc/150?img=16",
    requiredIngredients: ["shrimp", "coconut", "spring_onion"],
    nutrition_facts: {
      calories: 395,
      protein: 24,
      carbs: 52,
      fat: 11,
      fiber: 3
    }
  }
];

const impactStats = {
  totalUsers: 12458,
  mealsCreated: 45678,
  foodSaved: 23456,
  co2Reduced: 15678,
  moneySaved: 234567000,
};

// ===== MIGRATION FUNCTION =====

async function migrate() {
  console.log("🚀 Bắt đầu migrate...\n");

  try {
    // 1. Migrate ingredients
    console.log("📦 Migrate ingredients...");
    const { error: ingredientsError } = await supabase
      .from("ingredients")
      .upsert(ingredients, { onConflict: "id" });

    if (ingredientsError) throw ingredientsError;
    console.log(`✅ Done: ${ingredients.length} ingredients\n`);

    // 2. Migrate recipes (không phải community)
    console.log("📝 Migrate recipes...");
    const recipesToInsert = recipes.map(
      ({ requiredIngredients, ...recipe }) => recipe
    );

    const { data: insertedRecipes, error: recipesError } = await supabase
      .from("recipes")
      .insert(recipesToInsert)
      .select();

    if (recipesError) throw recipesError;
    console.log(`✅ Done: ${insertedRecipes.length} recipes\n`);

    // 3. Migrate community recipes
    console.log("👥 Migrate community recipes...");
    const communityToInsert = communityRecipes.map(
      ({ requiredIngredients, ...recipe }) => recipe
    );

    const { data: insertedCommunity, error: communityError } = await supabase
      .from("recipes")
      .insert(communityToInsert)
      .select();

    if (communityError) throw communityError;
    console.log(`✅ Done: ${insertedCommunity.length} community recipes\n`);

    // 4. Tạo recipe_ingredients mapping
    console.log("🔗 Tạo recipe-ingredient mappings...");
    const mappings = [];

    recipes.forEach((recipe, index) => {
      recipe.requiredIngredients?.forEach((ingId) => {
        mappings.push({
          recipe_id: insertedRecipes[index].id,
          ingredient_id: ingId,
        });
      });
    });

    communityRecipes.forEach((recipe, index) => {
      recipe.requiredIngredients?.forEach((ingId) => {
        mappings.push({
          recipe_id: insertedCommunity[index].id,
          ingredient_id: ingId,
        });
      });
    });

    if (mappings.length > 0) {
      const { error: mappingsError } = await supabase
        .from("recipe_ingredients")
        .insert(mappings);

      if (mappingsError) throw mappingsError;
    }
    console.log(`✅ Done: ${mappings.length} mappings\n`);

    // 5. Update impact stats
    console.log("📊 Update impact stats...");
    const { error: statsError } = await supabase.from("impact_stats").upsert({
      id: 1,
      total_users: impactStats.totalUsers,
      meals_created: impactStats.mealsCreated,
      food_saved_kg: impactStats.foodSaved,
      co2_reduced_kg: impactStats.co2Reduced,
      money_saved_vnd: impactStats.moneySaved,
    });

    if (statsError) throw statsError;
    console.log("✅ Done: impact stats\n");

    console.log("🎉 Migration hoàn tất!");
    console.log(`\n📊 Tổng kết:
    - ${ingredients.length} ingredients
    - ${insertedRecipes.length} recipes
    - ${insertedCommunity.length} community recipes
    - ${mappings.length} recipe-ingredient mappings
    `);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

migrate();
