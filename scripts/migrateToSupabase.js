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
  {
    title: "Thịt Gà Xào Sả Ớt",
    description: "Gà xào sả ớt thơm nồng, cay nhẹ, món ăn đơn giản mà đưa cơm.",
    image_url:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200",
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: [
      "Thịt gà 400g",
      "Sả 3 cây",
      "Ớt 4 trái",
      "Tỏi 4 tép",
      "Hành lá",
    ],
    ingredients_list_fixed: [
      "chicken 400g",
      "lemongrass 3",
      "pepper 4",
      "garlic 4 cloves",
      "spring_onion 2",
    ],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Dầu hào 1 muỗng canh",
      "Đường 1 muỗng cà phê",
      "Tiêu đen",
      "Dầu ăn",
    ],
    instructions: [
      "Thái gà miếng vừa ăn, ướp với nước mắm, đường, tiêu trong 15 phút. Sả băm nhuyễn, tỏi băm, ớt thái lát.",
      "Làm nóng chảo với dầu, phi thơm tỏi và sả băm cho thật thơm.",
      "Cho gà đã ướp vào xào với lửa lớn cho săn lại. Thêm ớt, dầu hào, xào đều trong 3-4 phút.",
      "Nêm nếm lại gia vị cho vừa ăn. Rắc hành lá thái nhỏ, tiêu đen lên trên và tắt bếp.",
    ],
    tags: ["xào", "gà", "nhanh", "cay"],
    like_count: 178,
    is_community: false,
    requiredIngredients: ["chicken", "lemongrass", "pepper", "garlic"],
    nutrition_facts: {
      calories: 295,
      protein: 35,
      carbs: 8,
      fat: 14,
      fiber: 2,
    },
  },

  {
    title: "Cá Thu Kho Tiêu",
    description:
      "Cá thu kho tiêu đậm đà, thịt cá mềm béo, ăn với cơm nóng rất ngon.",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200",
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: ["Cá thu 500g", "Tỏi 5 tép", "Ớt 3 trái", "Gừng 30g"],
    ingredients_list_fixed: [
      "fish 500g",
      "garlic 5 cloves",
      "pepper 3",
      "ginger 30g",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 1.5 muỗng canh",
      "Tiêu hạt 1 muỗng cà phê",
      "Nước màu 1 muỗng canh",
      "Nước 200ml",
    ],
    instructions: [
      "Cá thu rửa sạch, cắt khúc 3cm dày. Ướp cá với nước mắm, đường, tiêu băm 20 phút.",
      "Tỏi bóc vỏ, ớt cắt khúc, gừng thái lát mỏng. Lót tỏi, ớt, gừng xuống đáy nồi.",
      "Xếp cá đã ướp lên trên. Đổ nước màu, thêm nước vào nồi vừa ngập cá.",
      "Kho với lửa vừa 30 phút cho cá chín mềm, nước sệt và thấm gia vị. Tắt bếp.",
    ],
    tags: ["kho", "cá", "đậm đà"],
    like_count: 203,
    is_community: false,
    requiredIngredients: ["fish", "garlic", "pepper"],
    nutrition_facts: {
      calories: 280,
      protein: 32,
      carbs: 10,
      fat: 13,
      fiber: 1,
    },
  },

  {
    title: "Rau Muống Xào Tỏi",
    description:
      "Rau muống xào tỏi giòn xanh, món rau đơn giản nhất nhưng ngon nhất.",
    image_url:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200",
    time_minutes: 10,
    difficulty_score: 1,
    ingredients_list: ["Rau muống 300g", "Tỏi 5 tép"],
    ingredients_list_fixed: ["vegetable 300g", "garlic 5 cloves"],
    seasoning: [
      "Dầu ăn 2 muỗng canh",
      "Nước mắm 1 muỗng canh",
      "Muối 1/2 muỗng cà phê",
      "Đường 1/2 muỗng cà phê",
    ],
    instructions: [
      "Rau muống nhặt bỏ lá già, cắt khúc 5cm, rửa sạch để ráo nước. Tỏi băm nhuyễn.",
      "Làm nóng chảo với dầu lửa lớn, cho tỏi vào phi thơm.",
      "Cho rau muống vào xào nhanh tay trong 2-3 phút, lắc chảo cho đều.",
      "Nêm nước mắm, muối, đường. Đảo đều và tắt bếp ngay để rau không bị nhũn.",
    ],
    tags: ["xào", "rau", "nhanh", "healthy"],
    like_count: 142,
    is_community: false,
    requiredIngredients: ["garlic"],
    nutrition_facts: {
      calories: 85,
      protein: 3,
      carbs: 8,
      fat: 5,
      fiber: 3,
    },
  },

  {
    title: "Trứng Hấp Thịt Băm",
    description: "Trứng hấp thịt mềm mịn, bổ dưỡng cho cả người lớn và trẻ em.",
    image_url:
      "https://images.unsplash.com/photo-1584270354949-1c5b7e6d9b29?w=1200",
    time_minutes: 20,
    difficulty_score: 1,
    ingredients_list: [
      "Trứng gà 4 quả",
      "Thịt heo xay 100g",
      "Hành lá 2 cây",
      "Nấm mèo 30g",
    ],
    ingredients_list_fixed: [
      "egg 4",
      "pork 100g",
      "spring_onion 2",
      "mushroom 30g",
    ],
    seasoning: ["Nước mắm 1 muỗng canh", "Tiêu", "Dầu ăn 1 muỗng cà phê"],
    instructions: [
      "Nấm ngâm nở thái nhỏ, hành lá thái nhỏ. Thịt băm trộn với nấm, nêm nước mắm, tiêu.",
      "Đánh tan trứng, cho thịt đã trộn vào, thêm 150ml nước ấm, khuấy đều.",
      "Đổ hỗn hợp vào bát hấp, phủ màng bọc thực phẩm hoặc nắp.",
      "Hấp cách thủy 15 phút cho trứng chín. Rắc hành lá, rưới dầu ăn nóng lên trên.",
    ],
    tags: ["hấp", "trứng", "healthy", "bổ dưỡng"],
    like_count: 167,
    is_community: false,
    requiredIngredients: ["egg", "pork", "spring_onion", "mushroom"],
    nutrition_facts: {
      calories: 230,
      protein: 18,
      carbs: 4,
      fat: 16,
      fiber: 1,
    },
  },

  // MỨC ĐỘ VỪA
  {
    title: "Sườn Xào Chua Ngọt",
    description:
      "Sườn non xào sốt chua ngọt đậm đà với thơm và cà chua, món ăn cực kỳ hao cơm.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200",
    time_minutes: 45,
    difficulty_score: 2,
    ingredients_list: [
      "Sườn non 500g",
      "Thơm 150g",
      "Cà chua 3 trái",
      "Hành tây 1 củ",
      "Ớt chuông 1 trái",
      "Tỏi 4 tép",
    ],
    ingredients_list_fixed: [
      "pork 500g",
      "pineapple 150g",
      "tomato 3",
      "onion 1",
      "garlic 4 cloves",
    ],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Tương cà 2 muỗng canh",
      "Đường 2 muỗng canh",
      "Giấm 1 muỗng canh",
      "Bột năng 1 muỗng cà phê",
      "Tiêu",
    ],
    instructions: [
      "Sườn chặt miếng 3cm, ướp nước mắm, tiêu 20 phút. Thơm, cà chua cắt múi, hành tây cắt múi, tỏi băm.",
      "Chiên sườn với dầu nóng cho vàng đều các mặt, vớt ra để ráo.",
      "Xào thơm tỏi, hành tây, thêm cà chua và thơm vào xào. Pha sốt chua ngọt từ tương cà, đường, giấm, 100ml nước.",
      "Cho sườn vào đảo với sốt, om lửa nhỏ 5 phút. Pha bột năng với nước, đổ vào làm sệt sốt. Tắt bếp.",
    ],
    tags: ["xào", "sườn", "chua ngọt", "hao cơm"],
    like_count: 256,
    is_community: false,
    requiredIngredients: ["pork", "pineapple", "tomato", "onion"],
    nutrition_facts: {
      calories: 420,
      protein: 28,
      carbs: 35,
      fat: 20,
      fiber: 4,
    },
  },

  {
    title: "Tôm Sú Rang Muối",
    description:
      "Tôm sú rang muối ớt giòn thơm, món nhậu kinh điển không thể thiếu.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 20,
    difficulty_score: 1,
    ingredients_list: [
      "Tôm sú 400g",
      "Tỏi 6 tép",
      "Ớt 5 trái",
      "Hành lá 3 cây",
    ],
    ingredients_list_fixed: [
      "shrimp 400g",
      "garlic 6 cloves",
      "pepper 5",
      "spring_onion 3",
    ],
    seasoning: [
      "Muối 1 muỗng cà phê",
      "Đường 1/2 muỗng cà phê",
      "Tiêu",
      "Dầu ăn",
      "Rượu trắng 1 muỗng canh",
    ],
    instructions: [
      "Tôm rửa sạch, cắt tỉa râu và chân, rạch lưng bỏ chỉ đen. Tỏi băm, ớt thái lát, hành lá thái khúc.",
      "Làm nóng chảo với nhiều dầu, chiên tôm vàng giòn vỏ (khoảng 3-4 phút), vớt ra.",
      "Để lại 2 muỗng dầu trong chảo, phi thơm tỏi và ớt.",
      "Cho tôm vào đảo nhanh, rưới rượu, rắc muối, đường, tiêu và hành lá. Đảo đều 1 phút rồi tắt bếp.",
    ],
    tags: ["rang", "tôm", "nhậu", "giòn"],
    like_count: 289,
    is_community: false,
    requiredIngredients: ["shrimp", "garlic", "pepper", "spring_onion"],
    nutrition_facts: {
      calories: 245,
      protein: 32,
      carbs: 6,
      fat: 10,
      fiber: 1,
    },
  },

  {
    title: "Cánh Gà Chiên Nước Mắm",
    description:
      "Cánh gà chiên giòn tẩm nước mắm đường, món ăn vặt yêu thích của mọi nhà.",
    image_url:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200",
    time_minutes: 35,
    difficulty_score: 2,
    ingredients_list: [
      "Cánh gà 500g",
      "Tỏi 5 tép",
      "Ớt 3 trái",
      "Hành lá 2 cây",
    ],
    ingredients_list_fixed: [
      "chicken 500g",
      "garlic 5 cloves",
      "pepper 3",
      "spring_onion 2",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Tiêu",
      "Bột năng 2 muỗng canh",
      "Dầu chiên",
    ],
    instructions: [
      "Cánh gà rửa sạch, chặt đôi, ướp với nước mắm, tỏi băm, tiêu trong 30 phút.",
      "Tẩm đều cánh gà với bột năng. Làm nóng dầu, chiên cánh gà vàng giòn (khoảng 10 phút), vớt ra.",
      "Làm nóng chảo khác, cho 1 muỗng đường vào đun tan. Thêm 2 muỗng nước mắm, khuấy đều.",
      "Cho cánh gà chiên vào đảo nhanh tay cho tẩm đều nước mắm. Rắc hành lá, ớt thái lát và tắt bếp.",
    ],
    tags: ["chiên", "gà", "ăn vặt", "giòn"],
    like_count: 312,
    is_community: false,
    requiredIngredients: ["chicken", "garlic", "pepper", "spring_onion"],
    nutrition_facts: {
      calories: 385,
      protein: 30,
      carbs: 22,
      fat: 20,
      fiber: 1,
    },
  },

  {
    title: "Bò Kho Bánh Mì",
    description:
      "Bò kho thơm mềm ăn kèm bánh mì giòn, món ăn sáng hoặc xế chiều lý tưởng.",
    image_url:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200",
    time_minutes: 90,
    difficulty_score: 2,
    ingredients_list: [
      "Thịt bò 600g",
      "Cà rốt 2 củ",
      "Khoai tây 2 củ",
      "Hành tây 1 củ",
      "Tỏi 6 tép",
      "Sả 2 cây",
      "Gừng 30g",
    ],
    ingredients_list_fixed: [
      "beef 600g",
      "carrot 2",
      "potato 2",
      "onion 1",
      "garlic 6 cloves",
      "lemongrass 2",
    ],
    seasoning: [
      "Bột cà ri 2 muỗng canh",
      "Nước mắm 3 muỗng canh",
      "Đường 1 muỗng canh",
      "Hồi 2 cái",
      "Quế 1 thanh",
      "Nước dừa 200ml",
    ],
    instructions: [
      "Thịt bò cắt miếng to, ướp với bột cà ri, nước mắm, đường, tỏi, gừng băm trong 30 phút. Cà rốt, khoai tây cắt to.",
      "Phi thơm hành, tỏi, sả, gừng. Cho thịt bò vào xào săn.",
      "Thêm nước (hoặc nước dừa) ngập thịt, cho hồi, quế vào. Đun sôi rồi kho lửa nhỏ 60 phút.",
      "Cho cà rốt, khoai tây vào kho thêm 20 phút cho mềm. Nêm nếm lại, kho cho nước sệt đặc. Ăn kèm bánh mì.",
    ],
    tags: ["kho", "bò", "cà ri", "bánh mì"],
    like_count: 324,
    is_community: false,
    requiredIngredients: [
      "beef",
      "carrot",
      "potato",
      "onion",
      "garlic",
      "lemongrass",
    ],
    nutrition_facts: {
      calories: 465,
      protein: 38,
      carbs: 42,
      fat: 18,
      fiber: 6,
    },
  },

  {
    title: "Cá Lóc Hấp Bia",
    description:
      "Cá lóc hấp bia thơm mềm, ngọt thịt, món ăn thanh đạm mà sang.",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200",
    time_minutes: 30,
    difficulty_score: 2,
    ingredients_list: [
      "Cá lóc 1 con (500g)",
      "Nấm rơm 100g",
      "Gừng 50g",
      "Hành lá 3 cây",
      "Bia 200ml",
    ],
    ingredients_list_fixed: [
      "fish 500g",
      "mushroom 100g",
      "ginger 50g",
      "spring_onion 3",
    ],
    seasoning: ["Nước mắm 2 muỗng canh", "Dầu ăn 2 muỗng canh", "Tiêu", "Muối"],
    instructions: [
      "Cá lóc làm sạch, rạch 3-4 đường trên lưng. Ướp muối, tiêu, gừng thái sợi 15 phút.",
      "Nấm rơm rửa sạch. Gừng thái sợi, hành lá thái khúc 5cm.",
      "Đặt cá lên đĩa hấp, xếp nấm xung quanh. Rưới bia lên cá, thêm gừng và hành lá.",
      "Hấp cách thủy 20 phút cho cá chín. Rưới nước mắm và dầu ăn nóng lên trên trước khi ăn.",
    ],
    tags: ["hấp", "cá", "healthy", "thanh đạm"],
    like_count: 198,
    is_community: false,
    requiredIngredients: ["fish", "mushroom", "spring_onion"],
    nutrition_facts: {
      calories: 265,
      protein: 34,
      carbs: 8,
      fat: 11,
      fiber: 2,
    },
  },

  // MỨC ĐỘ KHÓ HƠN
  {
    title: "Nem Nướng Nha Trang",
    description:
      "Nem nướng thơm béo, ăn kèm bánh tráng, rau sống và nước chấm đặc biệt.",
    image_url:
      "https://images.unsplash.com/photo-1544025163-3b2b2d3c2a7b?w=1200",
    time_minutes: 60,
    difficulty_score: 3,
    ingredients_list: [
      "Thịt heo xay 500g",
      "Mỡ lợn 100g",
      "Tỏi 6 tép",
      "Đường 2 muỗng canh",
      "Bánh tráng",
      "Rau sống",
    ],
    ingredients_list_fixed: ["pork 500g", "garlic 6 cloves", "rice_paper 20"],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Bột canh 1 muỗng cà phê",
      "Tiêu",
      "Bột nêm",
      "Nước đá lạnh",
    ],
    instructions: [
      "Thịt xay trộn với mỡ băm nhỏ, tỏi băm, đường, nước mắm, bột canh, tiêu. Thêm 50ml nước đá lạnh, nhồi mạnh tay 15 phút cho thịt dính chặt.",
      "Để thịt trong tủ lạnh ít nhất 2 giờ (hoặc qua đêm) cho thịt se lại.",
      "Vo tròn thịt thành viên dài 8cm, xiên que tre. Nướng trên than hồng, liên tục trở và quét dầu cho nem chín đều và có màu vàng nâu hấp dẫn (khoảng 15-20 phút).",
      "Ăn kèm bánh tráng, rau sống, dưa leo, thơm và nước chấm chua ngọt pha đậu phộng xay.",
    ],
    tags: ["nướng", "đặc sản", "nem", "tiệc"],
    like_count: 278,
    is_community: false,
    requiredIngredients: ["pork", "garlic", "rice_paper"],
    nutrition_facts: {
      calories: 395,
      protein: 26,
      carbs: 28,
      fat: 20,
      fiber: 3,
    },
  },

  {
    title: "Lẩu Mắm Miền Tây",
    description:
      "Lẩu mắm đậm đà với cá, tôm, thịt và rau củ phong phú, đặc sản sông nước.",
    image_url:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200",
    time_minutes: 50,
    difficulty_score: 3,
    ingredients_list: [
      "Cá lóc 300g",
      "Tôm 200g",
      "Thịt heo 150g",
      "Mắm sặc 3 muỗng canh",
      "Sả 3 cây",
      "Ớt 5 trái",
      "Cà chua 3 trái",
      "Bầu, bông điên điển, bắp chuối",
    ],
    ingredients_list_fixed: [
      "fish 300g",
      "shrimp 200g",
      "pork 150g",
      "lemongrass 3",
      "pepper 5",
      "tomato 3",
    ],
    seasoning: [
      "Mắm sặc 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Nước cốt dừa 200ml",
      "Muối",
      "Bột canh",
    ],
    instructions: [
      "Sả đập dập, ớt băm, cà chua thái múi. Cá thái khúc, tôm bóc vỏ, thịt thái mỏng.",
      "Đun sôi nước, cho sả, ớt vào. Pha mắm sặc với nước, lọc bỏ cặn rồi cho vào nồi.",
      "Thêm cà chua, nước cốt dừa, đường vào nấu 10 phút. Nêm nếm cho vừa ăn (mặn, ngọt, đắng hài hòa).",
      "Nhúng cá, tôm, thịt, rau củ vào nồi lẩu. Ăn kèm bún tươi, rau sống và nước chấm mắm pha.",
    ],
    tags: ["lẩu", "miền tây", "đặc sản", "mắm"],
    like_count: 241,
    is_community: false,
    requiredIngredients: ["fish", "shrimp", "pork", "lemongrass", "tomato"],
    nutrition_facts: {
      calories: 420,
      protein: 38,
      carbs: 32,
      fat: 16,
      fiber: 6,
    },
  },

  {
    title: "Bánh Căn Phan Thiết",
    description:
      "Bánh căn nhỏ xinh với trứng cút, ăn kèm nước mắm mặn tôm đặc trưng.",
    image_url:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200",
    time_minutes: 50,
    difficulty_score: 3,
    ingredients_list: [
      "Bột gạo 250g",
      "Trứng cút 20 quả",
      "Tôm khô 50g",
      "Hành lá 3 cây",
      "Mỡ hành",
    ],
    ingredients_list_fixed: [
      "rice_flour 250g",
      "egg 20",
      "shrimp 50g",
      "spring_onion 3",
    ],
    seasoning: [
      "Muối 1/2 muỗng cà phê",
      "Bột nghệ 1/2 muỗng cà phê",
      "Nước mắm mặn tôm 100ml",
      "Đường",
      "Chanh",
    ],
    instructions: [
      "Pha bột gạo với 350ml nước, muối, nghệ, để nghỉ 30 phút. Tôm khô rang thơm, giã nhỏ. Hành lá thái nhỏ.",
      "Làm nóng khuôn bánh căn (hoặc chảo nhỏ), thoa mỡ hành vào từng lỗ.",
      "Múc bột vào khuôn, cho 1 quả trứng cút vào giữa mỗi bánh. Rắc tôm khô và hành lá lên trên.",
      "Đổ lửa vừa cho bánh chín vàng đáy (8-10 phút). Lấy bánh ra, ăn kèm nước mắm mặn tôm pha chua ngọt.",
    ],
    tags: ["bánh", "đặc sản", "phan thiết", "street food"],
    like_count: 267,
    is_community: false,
    requiredIngredients: ["egg", "shrimp", "spring_onion"],
    nutrition_facts: {
      calories: 340,
      protein: 18,
      carbs: 48,
      fat: 9,
      fiber: 2,
    },
  },

  {
    title: "Bún Đậu Mắm Tôm",
    description:
      "Bún đậu mắm tôm trọn vẹn với đầy đủ topping chả cốm, nem chua, rau sống.",
    image_url:
      "https://images.unsplash.com/photo-1604908177435-6b9f1a0d5f4f?w=1200",
    time_minutes: 70,
    difficulty_score: 3,
    ingredients_list: [
      "Bún tươi 400g",
      "Đậu hũ 400g",
      "Thịt heo luộc 200g",
      "Chả cốm 150g",
      "Mắm tôm 100g",
      "Rau sống đủ loại",
    ],
    ingredients_list_fixed: ["rice_noodles 400g", "tofu 400g", "pork 200g"],
    seasoning: [
      "Mắm tôm 100g",
      "Đường 2 muỗng canh",
      "Chanh 3 trái",
      "Ớt 3 trái",
      "Tỏi 5 tép",
      "Dầu ăn",
    ],
    instructions: [
      "Đậu hũ cắt miếng dày 2cm, chiên vàng giòn đều các mặt. Thịt luộc chín thái lát mỏng. Rau sống rửa sạch.",
      "Pha mắm tôm: mắm tôm + đường + nước cốt chanh + tỏi băm + ớt thái nhỏ + 50ml nước, khuấy đều.",
      "Chần bún tươi qua nước sôi, để ráo.",
      "Trình bày đĩa với bún, đậu chiên, thịt luộc, chả cốm, rau sống đầy đủ. Ăn kèm mắm tôm pha.",
    ],
    tags: ["bún", "đậu", "mắm tôm", "hà nội"],
    like_count: 295,
    is_community: false,
    requiredIngredients: ["rice_noodles", "tofu", "pork"],
    nutrition_facts: {
      calories: 520,
      protein: 28,
      carbs: 65,
      fat: 18,
      fiber: 5,
    },
  },

  {
    title: "Bánh Cuốn Thanh Trì",
    description:
      "Bánh cuốn mỏng mềm với nhân thịt nấm thơm, ăn kèm chả lụa và nước mắm chua ngọt.",
    image_url:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200",
    time_minutes: 80,
    difficulty_score: 3,
    ingredients_list: [
      "Bột gạo 300g",
      "Bột năng 50g",
      "Thịt xay 200g",
      "Mộc nhĩ 50g",
      "Hành tím 5 củ",
      "Chả lụa 200g",
    ],
    ingredients_list_fixed: ["rice_flour 300g", "pork 200g", "mushroom 50g"],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Chanh 2 trái",
      "Tỏi",
      "Ớt",
      "Dầu ăn",
    ],
    instructions: [
      "Pha bột: trộn bột gạo, bột năng với 600ml nước, muối, để nghỉ 1 giờ. Làm nhân: xào thịt với mộc nhĩ ngâm nở, hành băm, nêm gia vị.",
      "Phết mỏng lớp dầu lên vải tráng bánh hoặc chảo phẳng. Múc bột đổ mỏng, đậy nắp hấp 1-2 phút cho bánh chín.",
      "Lấy bánh ra, cho nhân vào và cuốn lại. Xếp bánh cuốn lên đĩa.",
      "Cắt chả lụa thành lát mỏng. Trình bày bánh cuốn với chả lụa, hành phi, rau thơm. Ăn kèm nước mắm chua ngọt.",
    ],
    tags: ["bánh", "hà nội", "truyền thống", "sáng"],
    like_count: 308,
    is_community: false,
    requiredIngredients: ["pork", "mushroom"],
    nutrition_facts: {
      calories: 385,
      protein: 22,
      carbs: 58,
      fat: 8,
      fiber: 3,
    },
  },

  {
    title: "Cá Kèo Kho Tộ",
    description:
      "Cá kèo kho tộ kiểu miền Tây với nước dừa thơm béo, vị mặn ngọt đậm đà.",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200",
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: [
      "Cá kèo 500g",
      "Thịt ba chỉ 150g",
      "Nước dừa 300ml",
      "Tỏi 6 tép",
      "Ớt 5 trái",
      "Sả 2 cây",
    ],
    ingredients_list_fixed: [
      "fish 500g",
      "pork 150g",
      "coconut 300ml",
      "garlic 6 cloves",
      "pepper 5",
      "lemongrass 2",
    ],
    seasoning: [
      "Nước mắm 4 muỗng canh",
      "Đường 2 muỗng canh",
      "Tiêu",
      "Nước màu 1 muỗng canh",
    ],
    instructions: [
      "Cá kèo rửa sạch, để ráo. Thịt ba chỉ thái lát mỏng. Tỏi bóc vỏ, sả cắt khúc, ớt cắt khúc.",
      "Xếp lớp tỏi, sả, ớt xuống đáy nồi đất. Xếp thịt ba chỉ lên trên.",
      "Ướp cá với nước mắm, đường, tiêu. Xếp cá lên trên thịt, đổ nước màu và nước dừa vào.",
      "Đun sôi rồi hạ lửa nhỏ, kho 40 phút cho cá và thịt mềm, nước sệt lại. Nêm nếm và tắt bếp.",
    ],
    tags: ["kho", "cá", "miền tây", "nước dừa"],
    like_count: 218,
    is_community: false,
    requiredIngredients: ["fish", "pork", "coconut", "garlic", "lemongrass"],
    nutrition_facts: {
      calories: 395,
      protein: 35,
      carbs: 16,
      fat: 22,
      fiber: 2,
    },
  },

  {
    title: "Bánh Bèo Huế",
    description:
      "Bánh bèo Huế mềm mịn với tôm khô, mỡ hành và nước mắm chua ngọt thanh thanh.",
    image_url:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200",
    time_minutes: 60,
    difficulty_score: 3,
    ingredients_list: [
      "Bột gạo 300g",
      "Bột năng 100g",
      "Tôm khô 80g",
      "Mỡ hành",
      "Dầu phộng",
      "Hành lá",
    ],
    ingredients_list_fixed: ["rice_flour 300g", "shrimp 80g", "spring_onion 2"],
    seasoning: [
      "Muối",
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Tỏi 3 tép",
      "Ớt 2 trái",
    ],
    instructions: [
      "Pha bột gạo và bột năng với 600ml nước ấm, thêm muối, để nghỉ 30 phút. Tôm khô rang thơm, giã nhỏ.",
      "Chuẩn bị khuôn bánh bèo nhỏ (hoặc bát nhỏ), thoa dầu. Đun nồi nước sôi để hấp.",
      "Múc bột vào từng khuôn, hấp 3-4 phút cho bánh chín trong (bánh hơi lõm giữa). Để nguội.",
      "Rắc tôm khô, mỡ hành, hành lá lên bánh. Pha nước mắm chua ngọt chan lên trước khi ăn.",
    ],
    tags: ["bánh", "huế", "miền trung", "ăn vặt"],
    like_count: 234,
    is_community: false,
    requiredIngredients: ["shrimp", "spring_onion"],
    nutrition_facts: {
      calories: 285,
      protein: 12,
      carbs: 52,
      fat: 5,
      fiber: 2,
    },
  },

  {
    title: "Gà Ta Hấp Lá Chanh",
    description:
      "Gà ta hấp lá chanh thơm nức mũi, thịt mềm ngọt tự nhiên, món ăn sang trọng mà healthy.",
    image_url:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200",
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: [
      "Gà ta 1 con (1kg)",
      "Lá chanh 20 lá",
      "Gừng 50g",
      "Hành lá 3 cây",
      "Tỏi 6 tép",
    ],
    ingredients_list_fixed: [
      "chicken 1000g",
      "garlic 6 cloves",
      "spring_onion 3",
    ],
    seasoning: [
      "Muối hạt 1 muỗng canh",
      "Tiêu",
      "Rượu trắng 2 muỗng canh",
      "Dầu mè 1 muỗng canh",
    ],
    instructions: [
      "Gà rửa sạch, chà muối hạt và rượu trắng khắp con gà, để 20 phút. Gừng thái lát, tỏi đập dập, lá chanh rửa sạch.",
      "Nhồi gừng, tỏi, lá chanh vào bụng gà. Chà muối, tiêu, dầu mè khắp bên ngoài da gà.",
      "Đặt gà lên đĩa hấp, xếp lá chanh còn lại xung quanh. Hấp cách thủy 40-45 phút cho gà chín mềm.",
      "Chặt gà ra đĩa, rưới nước hấp gà lên trên. Rắc hành lá thái nhỏ. Ăn kèm muối tiêu chanh hoặc gừng ngâm.",
    ],
    tags: ["hấp", "gà", "healthy", "sang trọng"],
    like_count: 276,
    is_community: false,
    requiredIngredients: ["chicken", "garlic", "spring_onion"],
    nutrition_facts: {
      calories: 340,
      protein: 42,
      carbs: 4,
      fat: 16,
      fiber: 1,
    },
  },

  {
    title: "Canh Bí Đỏ Nấu Tôm",
    description:
      "Canh bí đỏ ngọt tự nhiên kết hợp với tôm tươi, món canh thanh nhẹ dễ nấu.",
    image_url:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200",
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: ["Bí đỏ 300g", "Tôm 150g", "Hành lá 2 cây", "Tỏi 2 tép"],
    ingredients_list_fixed: [
      "pumpkin 300g",
      "shrimp 150g",
      "spring_onion 2",
      "garlic 2 cloves",
    ],
    seasoning: ["Nước mắm 1.5 muỗng canh", "Muối", "Dầu ăn", "Tiêu"],
    instructions: [
      "Bí đỏ gọt vỏ, bỏ ruột, cắt miếng vừa ăn. Tôm rửa sạch. Tỏi băm, hành lá thái khúc.",
      "Đun sôi 800ml nước. Cho bí đỏ vào nấu đến khi mềm (khoảng 10 phút).",
      "Phi thơm tỏi băm với chút dầu, cho vào nồi canh. Thêm tôm vào nấu cho chín.",
      "Nêm nước mắm, muối vừa ăn. Rắc hành lá, tiêu và tắt bếp.",
    ],
    tags: ["canh", "healthy", "nhanh", "ngọt thanh"],
    like_count: 156,
    is_community: false,
    requiredIngredients: ["shrimp", "spring_onion", "garlic"],
    nutrition_facts: {
      calories: 135,
      protein: 16,
      carbs: 14,
      fat: 2,
      fiber: 3,
    },
  },

  {
    title: "Cơm Chiên Dương Châu",
    description:
      "Cơm chiên Dương Châu với tôm, xúc xích, trứng, đầy màu sắc và hương vị.",
    image_url:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200",
    time_minutes: 25,
    difficulty_score: 2,
    ingredients_list: [
      "Cơm nguội 600g",
      "Tôm 150g",
      "Xúc xích 2 cây",
      "Trứng 3 quả",
      "Cà rốt 1 củ",
      "Đậu Hà Lan 100g",
      "Hành tây 1 củ",
      "Tỏi 3 tép",
    ],
    ingredients_list_fixed: [
      "rice 600g",
      "shrimp 150g",
      "egg 3",
      "carrot 1",
      "onion 1",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Nước tương 2 muỗng canh",
      "Dầu hào 1 muỗng canh",
      "Muối",
      "Tiêu",
      "Dầu ăn",
    ],
    instructions: [
      "Xúc xích thái hạt lựu, cà rốt thái hạt lựu, hành tây thái nhỏ. Tôm bóc vỏ. Đánh tan trứng.",
      "Làm nóng chảo, đổ trứng vào làm trứng bác, xắt nhỏ, gắp ra.",
      "Dùng chảo đó, xào tôm, xúc xích, rau củ với tỏi băm cho chín.",
      "Cho cơm nguội vào, dùng muôi đảo tung cơm với lửa lớn. Nêm nước tương, dầu hào, muối, tiêu. Cho trứng vào đảo đều.",
    ],
    tags: ["cơm chiên", "nhanh", "đầy đủ", "gia đình"],
    like_count: 342,
    is_community: false,
    requiredIngredients: ["rice", "shrimp", "egg", "carrot", "onion", "garlic"],
    nutrition_facts: {
      calories: 485,
      protein: 24,
      carbs: 68,
      fat: 14,
      fiber: 4,
    },
  },

  // ========== MỨC ĐỘ DỄ - ÍT NGUYÊN LIỆU ==========
  {
    title: "Trứng Chiên Cà Chua",
    description:
      "Món ăn đơn giản nhất, chỉ cần 2 nguyên liệu chính, nhanh gọn cho bữa cơm gia đình.",
    image_url:
      "https://images.unsplash.com/photo-1584270354949-1c5b7e6d9b29?w=1200",
    time_minutes: 15,
    difficulty_score: 1,
    ingredients_list: ["Trứng gà", "Cà chua"],
    ingredients_list_fixed: ["egg 3", "tomato 2"],
    seasoning: ["Nước mắm 1 muỗng canh", "Đường 1 muỗng cà phê", "Tiêu"],
    instructions: [
      "Cắt cà chua múi cau, đánh tan trứng.",
      "Xào cà chua với chút dầu cho mềm.",
      "Đổ trứng vào, đảo nhẹ tay cho trứng vừa chín.",
      "Nêm nếm, rắc tiêu và tắt bếp.",
    ],
    tags: ["nhanh", "gia đình", "dễ làm"],
    like_count: 310,
    is_community: false,
    requiredIngredients: ["egg", "tomato"],
    nutrition_facts: {
      calories: 180,
      protein: 12,
      carbs: 8,
      fat: 11,
      fiber: 2,
    },
  },

  {
    title: "Đậu Hũ Sốt Cà Chua",
    description: "Đậu hũ mềm sốt cà chua chua ngọt, món chay đơn giản mà ngon.",
    image_url:
      "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=1200",
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: ["Đậu hũ", "Cà chua", "Hành tây"],
    ingredients_list_fixed: ["tofu 300g", "tomato 3", "onion 1"],
    seasoning: ["Nước mắm 1 muỗng canh", "Đường 1 muỗng cà phê", "Tiêu"],
    instructions: [
      "Chiên đậu hũ vàng các mặt, để ráo dầu.",
      "Xào hành tây thơm, cho cà chua vào xào mềm.",
      "Cho đậu vào sốt, om nhỏ lửa 5 phút cho thấm.",
      "Nêm nếm vừa ăn, rắc hành lá.",
    ],
    tags: ["chay", "dễ làm", "healthy"],
    like_count: 175,
    is_community: false,
    requiredIngredients: ["tofu", "tomato", "onion"],
    nutrition_facts: {
      calories: 220,
      protein: 15,
      carbs: 18,
      fat: 10,
      fiber: 4,
    },
  },

  {
    title: "Tôm Rim Mặn Ngọt",
    description: "Tôm rim đậm đà, bắt cơm, chỉ cần vài bước đơn giản.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: ["Tôm", "Tỏi", "Ớt"],
    ingredients_list_fixed: ["shrimp 300g", "garlic 3 cloves", "pepper 2"],
    seasoning: ["Nước mắm 2 muỗng canh", "Đường 1 muỗng canh", "Nước 50ml"],
    instructions: [
      "Rửa tôm sạch, cắt tỉa râu.",
      "Phi thơm tỏi và ớt với dầu.",
      "Cho tôm vào đảo đến khi săn lại.",
      "Nêm gia vị, rim lửa nhỏ đến khi sệt.",
    ],
    tags: ["rim", "nhanh", "hải sản"],
    like_count: 260,
    is_community: false,
    requiredIngredients: ["shrimp", "garlic"],
    nutrition_facts: {
      calories: 185,
      protein: 28,
      carbs: 12,
      fat: 3,
      fiber: 0,
    },
  },

  {
    title: "Canh Rau Ngót Nấu Tôm",
    description: "Canh thanh mát, nấu nhanh, rất dễ làm với rau ngót và tôm.",
    image_url:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200",
    time_minutes: 20,
    difficulty_score: 1,
    ingredients_list: ["Rau ngót", "Tôm", "Tỏi"],
    ingredients_list_fixed: [
      "vegetable 200g",
      "shrimp 150g",
      "garlic 2 cloves",
    ],
    seasoning: ["Nước mắm 2 muỗng canh", "Muối", "Tiêu"],
    instructions: [
      "Đun sôi nước, phi thơm tỏi.",
      "Cho tôm vào nấu chín.",
      "Thêm rau ngót, đun sôi 2 phút.",
      "Nêm nếm và tắt bếp.",
    ],
    tags: ["canh", "nhanh", "thanh mát"],
    like_count: 145,
    is_community: false,
    requiredIngredients: ["shrimp", "garlic"],
    nutrition_facts: {
      calories: 120,
      protein: 18,
      carbs: 8,
      fat: 2,
      fiber: 3,
    },
  },

  // ========== MỨC ĐỘ VỪA - NGUYÊN LIỆU TRUNG BÌNH ==========
  {
    title: "Thịt Heo Kho Nước Dừa",
    description: "Món kho quen thuộc với nước dừa béo nhẹ, thịt mềm đậm đà.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200",
    time_minutes: 70,
    difficulty_score: 2,
    ingredients_list: ["Thịt heo", "Nước dừa", "Tỏi", "Trứng"],
    ingredients_list_fixed: [
      "pork 500g",
      "coconut 300ml",
      "garlic 4 cloves",
      "egg 4",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Tiêu",
      "Nước màu",
    ],
    instructions: [
      "Thái thịt miếng vừa ăn, ướp với nước mắm, đường và tỏi 20 phút.",
      "Luộc trứng chín, bóc vỏ.",
      "Xào thịt cho săn, thêm nước màu.",
      "Đổ nước dừa vào, kho nhỏ lửa 50 phút.",
      "Cho trứng vào kho cùng đến khi nước sệt.",
    ],
    tags: ["kho", "gia đình", "bữa chính"],
    like_count: 260,
    is_community: false,
    requiredIngredients: ["pork", "coconut", "egg"],
    nutrition_facts: {
      calories: 420,
      protein: 32,
      carbs: 15,
      fat: 28,
      fiber: 1,
    },
  },

  {
    title: "Cá Kho Tộ",
    description: "Cá kho kiểu Nam Bộ với nước dừa, thơm ngon đậm đà.",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200",
    time_minutes: 60,
    difficulty_score: 2,
    ingredients_list: ["Cá", "Nước dừa", "Tỏi", "Ớt", "Hành lá"],
    ingredients_list_fixed: [
      "fish 500g",
      "coconut 200ml",
      "garlic 5 cloves",
      "pepper 3",
      "spring_onion 1 bunch",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Tiêu",
      "Nước màu",
    ],
    instructions: [
      "Làm sạch cá, cắt khúc vừa ăn.",
      "Ướp cá với gia vị 30 phút.",
      "Xếp cá vào nồi đất, lót đáy bằng tỏi và ớt.",
      "Đổ nước dừa, kho lửa nhỏ 40 phút.",
      "Rắc hành lá trước khi tắt bếp.",
    ],
    tags: ["kho", "hải sản", "truyền thống"],
    like_count: 285,
    is_community: false,
    requiredIngredients: ["fish", "coconut", "garlic"],
    nutrition_facts: {
      calories: 320,
      protein: 35,
      carbs: 14,
      fat: 15,
      fiber: 1,
    },
  },

  {
    title: "Canh Chua Cá",
    description:
      "Canh chua miền Nam với thơm, cà chua và me, vị chua ngọt hài hòa.",
    image_url:
      "https://images.unsplash.com/photo-1604908177479-3b2d6f3e5b5d?w=1200",
    time_minutes: 35,
    difficulty_score: 2,
    ingredients_list: ["Cá", "Cà chua", "Thơm", "Me", "Đậu bắp", "Giá đỗ"],
    ingredients_list_fixed: [
      "fish 400g",
      "tomato 2",
      "pineapple 100g",
      "tamarind 2 tbsp",
      "okra 100g",
      "bean_sprouts 50g",
    ],
    seasoning: ["Nước mắm 2 muỗng canh", "Đường 1 muỗng canh", "Muối"],
    instructions: [
      "Đun sôi nước, cho me vào dầm lấy nước chua.",
      "Cho cá vào nấu chín, hớt bọt.",
      "Thêm cà chua, thơm, đậu bắp.",
      "Nêm nếm vừa ăn, cho giá vào và tắt bếp.",
    ],
    tags: ["canh", "miền tây", "chua ngọt"],
    like_count: 185,
    is_community: false,
    requiredIngredients: ["fish", "tamarind", "tomato", "pineapple"],
    nutrition_facts: {
      calories: 210,
      protein: 28,
      carbs: 20,
      fat: 4,
      fiber: 5,
    },
  },

  {
    title: "Gà Kho Gừng",
    description: "Gà kho thơm mùi gừng, ấm bụng, rất hợp ngày lạnh.",
    image_url:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200",
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: ["Thịt gà", "Gừng", "Tỏi", "Hành tây", "Ớt"],
    ingredients_list_fixed: [
      "chicken 600g",
      "ginger 50g",
      "garlic 4 cloves",
      "onion 1",
      "pepper 2",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 1 muỗng canh",
      "Tiêu",
      "Dầu ăn",
    ],
    instructions: [
      "Chặt gà miếng vừa, ướp với gia vị 30 phút.",
      "Phi thơm gừng, tỏi, hành tây.",
      "Cho gà vào xào săn.",
      "Đổ nước vừa ngập, kho lửa nhỏ 35 phút.",
      "Kho đến khi nước sệt, gà mềm.",
    ],
    tags: ["kho", "gà", "ấm bụng"],
    like_count: 245,
    is_community: false,
    requiredIngredients: ["chicken", "garlic", "onion"],
    nutrition_facts: {
      calories: 380,
      protein: 42,
      carbs: 12,
      fat: 18,
      fiber: 2,
    },
  },

  {
    title: "Bò Xào Rau Củ",
    description: "Bò xào với nhiều loại rau củ, bổ dưỡng và màu sắc.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-b5c4c2bea0aa?w=1200",
    time_minutes: 30,
    difficulty_score: 2,
    ingredients_list: [
      "Thịt bò",
      "Cà rốt",
      "Bắp cải",
      "Nấm",
      "Hành tây",
      "Tỏi",
    ],
    ingredients_list_fixed: [
      "beef 300g",
      "carrot 1",
      "cabbage 150g",
      "mushroom 100g",
      "onion 1",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Dầu hào 1 muỗng canh",
      "Tiêu",
      "Bột năng",
    ],
    instructions: [
      "Thái bò mỏng, ướp với nước mắm, bột năng 15 phút.",
      "Thái rau củ vừa ăn.",
      "Xào nhanh bò trên lửa lớn, gắp ra.",
      "Xào rau củ, nêm gia vị.",
      "Cho bò vào đảo đều và tắt bếp.",
    ],
    tags: ["xào", "bò", "healthy"],
    like_count: 220,
    is_community: false,
    requiredIngredients: ["beef", "carrot", "mushroom", "onion"],
    nutrition_facts: {
      calories: 340,
      protein: 35,
      carbs: 22,
      fat: 14,
      fiber: 6,
    },
  },

  {
    title: "Mực Xào Chua Ngọt",
    description: "Mực tươi xào với sốt chua ngọt, thơm ngon giòn dai.",
    image_url:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200",
    time_minutes: 25,
    difficulty_score: 2,
    ingredients_list: ["Mực", "Cà chua", "Thơm", "Hành tây", "Tỏi"],
    ingredients_list_fixed: [
      "seafood 300g",
      "tomato 2",
      "pineapple 100g",
      "onion 1",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Nước mắm 1 muỗng canh",
      "Đường 2 muỗng canh",
      "Giấm 1 muỗng canh",
      "Tương ớt 1 muỗng cà phê",
    ],
    instructions: [
      "Làm sạch mực, cắt khoanh.",
      "Pha sốt chua ngọt với các gia vị.",
      "Xào thơm tỏi, hành, cà chua.",
      "Cho mực vào xào nhanh 2 phút.",
      "Đổ sốt vào, đảo đều và tắt bếp.",
    ],
    tags: ["xào", "hải sản", "chua ngọt"],
    like_count: 195,
    is_community: false,
    requiredIngredients: ["tomato", "pineapple", "onion"],
    nutrition_facts: {
      calories: 250,
      protein: 24,
      carbs: 28,
      fat: 6,
      fiber: 3,
    },
  },

  // ========== MỨC ĐỘ KHÓ - NHIỀU NGUYÊN LIỆU ==========
  {
    title: "Phở Gà",
    description: "Phở gà thanh nhẹ, thơm mùi gừng và hành, cần nhiều gia vị.",
    image_url:
      "https://images.unsplash.com/photo-1604908177469-7f547b9f40f4?w=1200",
    time_minutes: 120,
    difficulty_score: 3,
    ingredients_list: [
      "Bánh phở",
      "Thịt gà",
      "Hành lá",
      "Gừng",
      "Hành tây",
      "Tỏi",
    ],
    ingredients_list_fixed: [
      "rice_noodles 200g",
      "chicken 500g",
      "spring_onion 1 bunch",
      "ginger 30g",
      "onion 1",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Muối vừa ăn",
      "Đường",
      "Bột ngọt",
      "Hạt nêm",
    ],
    instructions: [
      "Luộc gà với nước lạnh, hớt bọt cho nước trong.",
      "Thêm gừng, hành tây nướng vào nồi.",
      "Ninh nhỏ lửa 90 phút.",
      "Xé gà thành sợi vừa ăn.",
      "Chần bánh phở, xếp gà lên.",
      "Chan nước dùng nóng, rắc hành lá và tiêu.",
    ],
    tags: ["phở", "nhẹ", "truyền thống"],
    like_count: 210,
    is_community: false,
    requiredIngredients: ["chicken", "rice_noodles", "spring_onion"],
    nutrition_facts: {
      calories: 450,
      protein: 38,
      carbs: 52,
      fat: 10,
      fiber: 3,
    },
  },

  {
    title: "Phở Bò Hà Nội",
    description:
      "Phở bò truyền thống miền Bắc với nước dùng trong, ngọt tự nhiên từ xương bò.",
    image_url:
      "https://images.unsplash.com/photo-1604908177522-5c9d7f1b4f04?w=1200",
    time_minutes: 180,
    difficulty_score: 3,
    ingredients_list: [
      "Bánh phở",
      "Thịt bò",
      "Xương bò",
      "Hành lá",
      "Gừng",
      "Hành tây",
      "Tỏi",
    ],
    ingredients_list_fixed: [
      "rice_noodles 200g",
      "beef 150g",
      "beef_bone 500g",
      "spring_onion 1 bunch",
      "ginger 50g",
      "onion 2",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Muối 1 muỗng cà phê",
      "Đường phèn 1 muỗng canh",
      "Hạt tiêu",
      "Thảo quả",
      "Hồi",
    ],
    instructions: [
      "Ninh xương bò với nước lạnh 30 phút, đổ nước.",
      "Ninh lại với nước mới, hớt bọt liên tục.",
      "Cho gừng và hành nướng vào nồi.",
      "Ninh nhỏ lửa ít nhất 2-3 giờ.",
      "Luộc thịt bò riêng, thái mỏng.",
      "Chần bánh phở, xếp thịt bò lên trên.",
      "Chan nước dùng nóng và rắc hành lá.",
    ],
    tags: ["truyền thống", "phở", "bữa sáng"],
    like_count: 340,
    is_community: false,
    requiredIngredients: ["beef", "rice_noodles", "spring_onion"],
    nutrition_facts: {
      calories: 520,
      protein: 42,
      carbs: 58,
      fat: 14,
      fiber: 3,
    },
  },

  {
    title: "Bún Bò Huế",
    description:
      "Bún bò Huế với nước dùng đậm đà, cay nồng đặc trưng miền Trung.",
    image_url:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200",
    time_minutes: 150,
    difficulty_score: 3,
    ingredients_list: [
      "Bún",
      "Thịt bò",
      "Giò heo",
      "Sả",
      "Hành tây",
      "Tỏi",
      "Ớt",
      "Mắm ruốc",
    ],
    ingredients_list_fixed: [
      "rice_noodles 250g",
      "beef 200g",
      "pork 200g",
      "lemongrass 3 stalks",
      "onion 1",
      "garlic 5 cloves",
      "pepper 5",
      "shrimp_paste 2 tbsp",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Mắm ruốc 2 muỗng canh",
      "Đường 1 muỗng canh",
      "Muối",
      "Dầu màu điều",
    ],
    instructions: [
      "Ninh xương heo với sả, hành, tỏi 2 giờ.",
      "Luộc thịt bò và giò heo riêng.",
      "Phi thơm sả, tỏi, ớt với dầu màu điều.",
      "Nêm nước dùng với mắm ruốc và gia vị.",
      "Chần bún, xếp thịt và giò heo.",
      "Chan nước dùng, rắc rau thơm.",
    ],
    tags: ["bún", "miền trung", "cay", "đặc sản"],
    like_count: 295,
    is_community: false,
    requiredIngredients: ["beef", "pork", "rice_noodles", "lemongrass"],
    nutrition_facts: {
      calories: 580,
      protein: 45,
      carbs: 62,
      fat: 18,
      fiber: 4,
    },
  },

  {
    title: "Lẩu Thái",
    description: "Lẩu Thái chua cay với tôm, mực, nấm và rau củ đa dạng.",
    image_url:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200",
    time_minutes: 45,
    difficulty_score: 3,
    ingredients_list: [
      "Tôm",
      "Mực",
      "Cá",
      "Nấm",
      "Cà chua",
      "Sả",
      "Ớt",
      "Tỏi",
      "Rau các loại",
    ],
    ingredients_list_fixed: [
      "shrimp 200g",
      "seafood 150g",
      "fish 150g",
      "mushroom 150g",
      "tomato 3",
      "lemongrass 2 stalks",
      "pepper 5",
      "garlic 5 cloves",
      "cabbage 200g",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Chanh 3 trái",
      "Đường 2 muỗng canh",
      "Tương ớt",
      "Nước cốt gà",
    ],
    instructions: [
      "Đun sôi nước dùng với xương, sả, tỏi.",
      "Thêm cà chua, ớt, nêm chua cay vừa ăn.",
      "Chuẩn bị hải sản và rau củ.",
      "Nhúng từng loại vào nước lẩu sôi.",
      "Ăn kèm nước chấm chua cay.",
    ],
    tags: ["lẩu", "hải sản", "cay", "tiệc tùng"],
    like_count: 315,
    is_community: false,
    requiredIngredients: [
      "shrimp",
      "tomato",
      "mushroom",
      "lemongrass",
      "cabbage",
    ],
    nutrition_facts: {
      calories: 380,
      protein: 42,
      carbs: 35,
      fat: 10,
      fiber: 8,
    },
  },

  {
    title: "Bánh Xèo Miền Tây",
    description: "Bánh xèo giòn vàng với tôm, thịt, giá đỗ, ăn kèm rau sống.",
    image_url:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200",
    time_minutes: 60,
    difficulty_score: 3,
    ingredients_list: [
      "Bột bánh xèo",
      "Tôm",
      "Thịt heo",
      "Giá đỗ",
      "Nấm",
      "Hành lá",
      "Nước dừa",
      "Nghệ",
    ],
    ingredients_list_fixed: [
      "rice_flour 300g",
      "shrimp 200g",
      "pork 150g",
      "bean_sprouts 150g",
      "mushroom 100g",
      "spring_onion 1 bunch",
      "coconut 200ml",
      "turmeric 1 tsp",
    ],
    seasoning: ["Nước mắm 2 muỗng canh", "Muối", "Đường", "Tỏi", "Ớt"],
    instructions: [
      "Pha bột bánh xèo với nước dừa và nghệ.",
      "Ướp tôm và thịt với gia vị.",
      "Đổ bột mỏng vào chảo nóng.",
      "Cho nhân tôm, thịt, giá vào.",
      "Chiên giòn, gấp đôi.",
      "Ăn kèm rau sống và nước mắm pha.",
    ],
    tags: ["bánh", "miền tây", "giòn", "đặc sản"],
    like_count: 280,
    is_community: false,
    requiredIngredients: ["shrimp", "pork", "bean_sprouts", "coconut"],
    nutrition_facts: {
      calories: 480,
      protein: 28,
      carbs: 58,
      fat: 16,
      fiber: 5,
    },
  },

  {
    title: "Gỏi Cuốn Tôm Thịt",
    description: "Gỏi cuốn tươi mát với tôm, thịt luộc, bún và rau thơm.",
    image_url:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200",
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: [
      "Bánh tráng",
      "Tôm",
      "Thịt heo",
      "Bún",
      "Rau sống",
      "Hành lá",
      "Tỏi",
    ],
    ingredients_list_fixed: [
      "rice_paper 20",
      "shrimp 300g",
      "pork 200g",
      "rice_noodles 150g",
      "vegetables 200g",
      "spring_onion 1 bunch",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Chanh 2 trái",
      "Ớt",
      "Tỏi",
    ],
    instructions: [
      "Luộc tôm và thịt, để nguội.",
      "Luộc bún, rửa qua nước lạnh.",
      "Pha nước chấm chua ngọt.",
      "Nhúng bánh tráng, xếp nhân và cuốn chặt.",
      "Ăn kèm nước mắm pha.",
    ],
    tags: ["gỏi", "tươi mát", "healthy", "tiệc"],
    like_count: 265,
    is_community: false,
    requiredIngredients: ["rice_paper", "shrimp", "pork", "rice_noodles"],
    nutrition_facts: {
      calories: 320,
      protein: 24,
      carbs: 45,
      fat: 6,
      fiber: 4,
    },
  },

  {
    title: "Cơm Tấm Sườn Bì Chả",
    description: "Cơm tấm Sài Gòn với sườn nướng, bì và chả trứng đầy đủ.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 90,
    difficulty_score: 3,
    ingredients_list: [
      "Gạo tấm",
      "Sườn heo",
      "Thịt heo",
      "Trứng",
      "Tỏi",
      "Hành tím",
      "Sả",
    ],
    ingredients_list_fixed: [
      "rice 300g",
      "pork_rib 300g",
      "pork 150g",
      "egg 3",
      "garlic 5 cloves",
      "shallot 3",
      "lemongrass 2 stalks",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Dầu hào",
      "Tiêu",
      "Mật ong",
    ],
    instructions: [
      "Ướp sườn với gia vị qua đêm.",
      "Nướng sườn trên than hồng.",
      "Làm bì từ da heo luộc.",
      "Chiên chả trứng.",
      "Nấu cơm tấm.",
      "Xếp đĩa với đầy đủ topping, ăn kèm nước mắm pha.",
    ],
    tags: ["cơm", "nướng", "sài gòn", "đặc sản"],
    like_count: 350,
    is_community: false,
    requiredIngredients: ["rice", "pork", "egg", "garlic", "lemongrass"],
    nutrition_facts: {
      calories: 680,
      protein: 38,
      carbs: 75,
      fat: 26,
      fiber: 2,
    },
  },
];

const communityRecipes = [
  // ========== MỨC ĐỘ DỄ ==========
  {
    title: "Canh Chua Cá Lóc",
    description:
      "Canh chua cá lóc miền Nam với thơm, cà chua và me, vị chua ngọt thanh mát rất đưa cơm, đặc biệt thích hợp cho bữa trưa mùa hè.",
    image_url:
      "https://images.unsplash.com/photo-1604908177479-3b2d6f3e5b5d?w=1200",
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: [
      "Cá lóc 400g",
      "Cà chua 3 trái",
      "Thơm 150g",
      "Đậu bắp 80g",
      "Giá đỗ 50g",
      "Rau thơm (ngò gai, ngò rí)",
    ],
    ingredients_list_fixed: [
      "fish 400g",
      "tomato 3",
      "pineapple 150g",
      "okra 80g",
      "bean_sprouts 50g",
    ],
    seasoning: [
      "Me 3 muỗng canh",
      "Nước mắm 2 muỗng canh",
      "Đường 1 muỗng canh",
      "Muối 1 muỗng cà phê",
      "Ớt sừng 2 trái",
    ],
    instructions: [
      "Sơ chế cá: Cắt khúc vừa ăn, ướp với muối và nghệ 15 phút để khử mùi tanh. Cà chua thái múi cau, thơm cắt miếng vừa, đậu bắp thái xéo.",
      "Nấu nước dùng: Đun sôi 1.5 lít nước, cho me vào khuấy tan. Thêm cà chua và thơm vào nấu 5 phút cho ngọt nước.",
      "Nấu cá và rau: Cho cá vào nồi, nêm nước mắm, đường, muối vừa ăn. Đợi sôi trở lại thì cho đậu bắp vào. Tắt bếp, thêm giá đỗ và rau thơm.",
      "Hoàn thiện: Nêm nếm lại gia vị cho vừa miệng, múc ra tô, ăn nóng với cơm trắng.",
    ],
    tags: ["soup", "family", "southern"],
    like_count: 156,
    is_community: true,
    author_name: "Nguyễn Minh Châu",
    author_avatar: "https://i.pravatar.cc/150?img=1",
    requiredIngredients: ["fish", "tomato", "pineapple", "okra"],
    nutrition_facts: {
      calories: 210,
      protein: 28,
      carbs: 20,
      fat: 4,
      fiber: 5,
    },
  },

  {
    title: "Mì Xào Hải Sản Sốt Mè",
    description:
      "Mì xào giòn thơm với tôm, mực và rau củ đầy đủ, phủ sốt mè béo ngậy, nhanh gọn cho bữa tối cuối tuần.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 30,
    difficulty_score: 1,
    ingredients_list: [
      "Mì trứng 250g",
      "Tôm 150g",
      "Mực 100g",
      "Bắp cải 150g",
      "Cà rốt 1 củ",
      "Hành tây 1/2 củ",
      "Tỏi 3 tép",
    ],
    ingredients_list_fixed: [
      "noodles 250g",
      "shrimp 150g",
      "cabbage 150g",
      "carrot 1",
      "onion 0.5",
      "garlic 3 cloves",
    ],
    seasoning: [
      "Dầu mè 2 muỗng canh",
      "Nước tương 2 muỗng canh",
      "Dầu hào 1 muỗng canh",
      "Đường 1 muỗng cà phê",
      "Tiêu đen",
      "Mè rang",
    ],
    instructions: [
      "Sơ chế nguyên liệu: Luộc mì qua nước sôi 3 phút, vớt ra để ráo. Tôm bóc vỏ, mực cắt khoanh. Bắp cải thái sợi, cà rốt thái mỏng, hành tây thái múi, tỏi băm.",
      "Xào hải sản: Làm nóng chảo với dầu, phi tỏi thơm. Cho tôm và mực vào xào nhanh tay 2 phút với lửa lớn cho chín tới.",
      "Xào mì và rau: Đẩy hải sản qua một bên, cho rau củ vào xào 2 phút. Thêm mì vào, chan nước tương, dầu hào, đường, tóc đều. Rưới dầu mè lên trên.",
      "Hoàn thiện: Đảo đều tất cả nguyên liệu với lửa lớn trong 1-2 phút. Tắt bếp, rắc tiêu và mè rang, trình bày ra đĩa ăn nóng.",
    ],
    tags: ["quick", "seafood", "stir-fry"],
    like_count: 124,
    is_community: true,
    author_name: "Lê Thu Hằng",
    author_avatar: "https://i.pravatar.cc/150?img=2",
    requiredIngredients: ["noodles", "shrimp", "cabbage", "carrot"],
    nutrition_facts: {
      calories: 420,
      protein: 26,
      carbs: 56,
      fat: 11,
      fiber: 6,
    },
  },

  {
    title: "Đậu Hũ Sốt Cà Chua Nấm",
    description:
      "Đậu hũ non mềm mịn kết hợp với sốt cà chua cà chua ngọt đậm, nấm hương thơm lừng, món chay bổ dưỡng cho cả nhà.",
    image_url:
      "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=1200",
    time_minutes: 30,
    difficulty_score: 1,
    ingredients_list: [
      "Đậu hũ non 400g",
      "Cà chua 4 trái",
      "Hành tây 1 củ",
      "Nấm hương 150g",
      "Tỏi 3 tép",
      "Hành lá 2 cây",
    ],
    ingredients_list_fixed: [
      "tofu 400g",
      "tomato 4",
      "onion 1",
      "mushroom 150g",
      "garlic 3 cloves",
      "spring_onion 2",
    ],
    seasoning: [
      "Dầu ăn 3 muỗng canh",
      "Nước tương 2 muỗng canh",
      "Đường 1 muỗng cà phê",
      "Bột ngọt 1/2 muỗng cà phê",
      "Tiêu",
      "Bột năng (hoặc bột bắp) 1 muỗng cà phê",
    ],
    instructions: [
      "Sơ chế nguyên liệu: Đậu hũ cắt miếng vuông 3cm, thấm khô. Cà chua thái múi, hành tây thái múi, nấm ngâm mềm thái lát, tỏi băm, hành lá thái khúc 3cm.",
      "Chiên đậu hũ: Làm nóng dầu trong chảo, chiên đậu hũ vàng đều các mặt với lửa vừa. Vớt ra để ráo dầu.",
      "Nấu sốt cà chua: Dùng lại dầu chiên đậu, phi tỏi thơm, cho hành tây vào xào. Thêm cà chua và nấm, xào cho cà chua ra nước. Nêm nước tương, đường, bột ngọt, cho 100ml nước vào.",
      "Hoàn thiện món: Đun sôi 3-4 phút, cho đậu hũ vào đảo nhẹ cho thấm gia vị. Pha bột năng với 2 muỗng nước, từ từ đổ vào khuấy đều cho sệt sốt. Rắc tiêu và hành lá, tắt bếp.",
    ],
    tags: ["vegetarian", "easy", "healthy"],
    like_count: 98,
    is_community: true,
    author_name: "Trần Minh Anh",
    author_avatar: "https://i.pravatar.cc/150?img=3",
    requiredIngredients: ["tofu", "tomato", "onion", "mushroom"],
    nutrition_facts: {
      calories: 245,
      protein: 18,
      carbs: 22,
      fat: 12,
      fiber: 6,
    },
  },

  {
    title: "Gà Kho Gừng",
    description:
      "Gà kho với gừng tươi thơm nồng, màu nước cánh gián bóng mượt, món ngon hao cơm cho bữa cơm gia đình.",
    image_url:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200",
    time_minutes: 45,
    difficulty_score: 2,
    ingredients_list: [
      "Thịt gà (đùi, cánh) 500g",
      "Gừng tươi 50g",
      "Hành tím 5 củ",
      "Ớt hiểm 3 trái",
      "Sả 2 cây",
    ],
    ingredients_list_fixed: [
      "chicken 500g",
      "garlic 5 cloves",
      "pepper 3",
      "lemongrass 2",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 1.5 muỗng canh",
      "Nước màu (đường đun cháy) 1 muỗng canh",
      "Tiêu đen",
      "Hạt nêm",
    ],
    instructions: [
      "Sơ chế và ướp: Gà chặt miếng vừa ăn, rửa sạch. Gừng thái lát mỏng, hành tím bóc vỏ, sả đập dập. Ướp gà với nước mắm, đường, tiêu, gừng trong 20 phút.",
      "Làm màu kho: Đun 1.5 muỗng đường với 1 muỗng nước trên lửa nhỏ cho đến khi hóa màu nâu sẫm (nước màu). Thêm 50ml nước vào khuấy đều.",
      "Kho gà: Bắc chảo lên bếp, cho dầu phi hành tím thơm. Cho gà đã ướp vào, xào săn thịt. Đổ nước màu vào, thêm nước ngập gà. Cho sả và ớt vào.",
      "Hoàn thiện: Kho với lửa vừa đến nhỏ khoảng 25-30 phút cho gà mềm và nước sệt lại. Nêm nếm lại, thu lửa to để nước sánh bóng. Tắt bếp, rắc tiêu.",
    ],
    tags: ["braised", "chicken", "family"],
    like_count: 187,
    is_community: true,
    author_name: "Phạm Văn Hùng",
    author_avatar: "https://i.pravatar.cc/150?img=10",
    requiredIngredients: ["chicken", "garlic", "pepper", "lemongrass"],
    nutrition_facts: {
      calories: 320,
      protein: 32,
      carbs: 12,
      fat: 16,
      fiber: 1,
    },
  },

  {
    title: "Canh Khổ Qua Nhồi Thịt",
    description:
      "Canh khổ qua nhồi thịt thanh mát, đắng nhẹ hòa quyện với vị ngọt của nước dùng, món canh bổ dưỡng giải nhiệt mùa hè.",
    image_url:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200",
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: [
      "Khổ qua 3 trái",
      "Thịt heo xay 200g",
      "Mộc nhĩ 30g",
      "Miến 50g",
      "Hành tím 2 củ",
      "Hành lá",
    ],
    ingredients_list_fixed: [
      "pork 200g",
      "mushroom 30g",
      "onion 2",
      "spring_onion 2",
    ],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Đường 1 muỗng cà phê",
      "Hạt nêm",
      "Tiêu",
      "Muối",
    ],
    instructions: [
      "Sơ chế và làm nhân: Khổ qua cắt khúc 5cm, bỏ ruột, chần qua nước muối. Thịt xay trộn với mộc nhĩ thái nhỏ, miến ngắn, hành băm, nêm gia vị.",
      "Nhồi thịt vào khổ qua: Lấy thìa hoặc tay nhồi nhân thịt vào lòng khổ qua, ấn nhẹ cho chắc. Đặt khổ qua nhồi lên đĩa.",
      "Nấu canh: Đun sôi 1 lít nước, cho khổ qua nhồi thịt vào, nấu lửa vừa 15-20 phút. Nêm nước mắm, đường, hạt nêm vừa ăn.",
      "Hoàn thiện: Khi thịt chín, khổ qua mềm thì tắt bếp. Rắc hành lá thái nhỏ, tiêu lên trên. Múc ra tô ăn nóng.",
    ],
    tags: ["soup", "stuffed", "summer"],
    like_count: 142,
    is_community: true,
    author_name: "Mai Thị Lan",
    author_avatar: "https://i.pravatar.cc/150?img=11",
    requiredIngredients: ["pork", "mushroom", "onion", "spring_onion"],
    nutrition_facts: {
      calories: 185,
      protein: 16,
      carbs: 14,
      fat: 8,
      fiber: 4,
    },
  },

  // ========== MỨC ĐỘ VỪA ==========
  {
    title: "Thịt Kho Tàu Truyền Thống",
    description:
      "Thịt kho tàu theo công thức gia truyền với nước dừa, trứng luộc, màu nước cánh gián bóng mượt, thơm đậm đà đúng vị Tết cổ truyền.",
    image_url:
      "https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=1200",
    time_minutes: 90,
    difficulty_score: 2,
    ingredients_list: [
      "Thịt ba chỉ 600g",
      "Trứng gà 6 quả",
      "Nước dừa tươi 400ml",
      "Tỏi 6 tép",
      "Hành tím 4 củ",
    ],
    ingredients_list_fixed: [
      "pork 600g",
      "egg 6",
      "coconut 400ml",
      "garlic 6 cloves",
    ],
    seasoning: [
      "Nước mắm 4 muỗng canh",
      "Đường phên (hoặc đường trắng) 2 muỗng canh",
      "Nước màu 1.5 muỗng canh",
      "Tiêu đen xay",
      "Hạt nêm",
    ],
    instructions: [
      "Sơ chế nguyên liệu: Thịt ba chỉ rửa sạch, luộc sơ 10 phút để ra bọt, vớt ra cắt miếng vuông 3-4cm. Trứng luộc chín, bóc vỏ. Tỏi, hành tím bóc vỏ, đập dập.",
      "Ướp và làm màu: Ướp thịt với nước mắm, đường, tỏi, tiêu trong 15 phút. Đun đường với nước để làm nước màu, khi đường chuyển sang màu nâu đỏ thì tắt bếp.",
      "Kho thịt giai đoạn 1: Bắc nồi lên bếp, cho chút dầu phi hành tím thơm. Cho thịt đã ướp vào xào săn. Đổ nước màu và nước dừa vào, khuấy đều. Đun sôi rồi hạ lửa nhỏ.",
      "Kho thịt giai đoạn 2: Kho trong 60 phút với lửa liu riu, đậy vung để thịt mềm. Sau 40 phút cho trứng vào kho cùng. Khi nước còn 1/3, bật lửa vừa để thu nước sệt và bóng. Nêm nếm lại, tắt bếp.",
    ],
    tags: ["traditional", "holiday", "braised"],
    like_count: 234,
    is_community: true,
    author_name: "Phạm Thị Hải",
    author_avatar: "https://i.pravatar.cc/150?img=4",
    requiredIngredients: ["pork", "egg", "coconut", "garlic"],
    nutrition_facts: {
      calories: 485,
      protein: 35,
      carbs: 18,
      fat: 32,
      fiber: 1,
    },
  },

  {
    title: "Mì Quảng Đà Nẵng",
    description:
      "Mì Quảng đặc trưng miền Trung với nước lèo màu nghệ, nước ít nhưng đậm đà, nhiều topping thịt tôm và rau thơm, món ăn đặc sắc vùng biển.",
    image_url:
      "https://images.unsplash.com/photo-1604908177435-6b9f1a0d5f4f?w=1200",
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: [
      "Mì Quảng (bánh đa vàng) 300g",
      "Tôm 150g",
      "Thịt heo 150g",
      "Trứng cút 6 quả",
      "Rau sống (xà lách, húng, tía tô)",
      "Đậu phộng rang 50g",
      "Bánh tráng nướng 2 tờ",
    ],
    ingredients_list_fixed: [
      "noodles 300g",
      "shrimp 150g",
      "pork 150g",
      "egg 6",
      "bean_sprouts 80g",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Hành tím 4 củ",
      "Tỏi 3 tép",
      "Nghệ tươi 1 củ",
      "Ớt",
      "Hạt nêm",
    ],
    instructions: [
      "Sơ chế nguyên liệu: Thịt heo thái mỏng, ướp nghệ, nước mắm, hành tím băm. Tôm bóc vỏ. Trứng cút luộc chín. Nghệ tươi giã nát lấy nước. Rau rửa sạch.",
      "Nấu nước lèo: Phi hành tỏi thơm, cho thịt đã ướp vào xào. Đổ 500ml nước vào, nêm nước mắm, hạt nêm. Cho nước nghệ vào, đun sôi 15 phút.",
      "Trụng mì và chuẩn bị topping: Luộc mì Quảng qua nước sôi 2-3 phút, vớt ra để ráo. Cho tôm vào nước lèo chần chín. Chiên trứng cút.",
      "Trình bày và hoàn thiện: Cho mì vào tô, chan nước lèo vừa đủ (không ngập mì). Xếp thịt, tôm, trứng cút, rau sống lên trên. Rắc đậu phộng, bánh tráng vò nhỏ và ớt.",
    ],
    tags: ["regional", "noodles", "central"],
    like_count: 198,
    is_community: true,
    author_name: "Võ Mai Hương",
    author_avatar: "https://i.pravatar.cc/150?img=5",
    requiredIngredients: ["noodles", "shrimp", "pork", "egg"],
    nutrition_facts: {
      calories: 520,
      protein: 32,
      carbs: 64,
      fat: 15,
      fiber: 5,
    },
  },

  {
    title: "Bò Lúc Lắc Khoai Tây Chiên",
    description:
      "Bò lúc lắc thái hạt lựu áp chảo nhanh giữ độ mềm ngọt, ăn kèm khoai tây chiên giòn và salad rau tươi, món sang trọng cho bữa tối.",
    image_url:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200",
    time_minutes: 35,
    difficulty_score: 2,
    ingredients_list: [
      "Thịt bò thăn 400g",
      "Khoai tây 2 củ",
      "Hành tây 1 củ",
      "Tỏi 3 tép",
      "Cà chua bi 10 trái",
      "Xà lách 100g",
    ],
    ingredients_list_fixed: [
      "beef 400g",
      "potato 2",
      "onion 1",
      "garlic 3 cloves",
      "tomato 10",
    ],
    seasoning: [
      "Nước tương 2 muỗng canh",
      "Dầu hào 1 muỗng canh",
      "Đường 1 muỗng cà phê",
      "Tiêu đen xay",
      "Dầu ăn",
      "Bơ 1 muỗng canh",
    ],
    instructions: [
      "Sơ chế và ướp bò: Thịt bò thái hạt lựu (2cm), ướp với nước tương, tỏi băm, đường, tiêu trong 20 phút. Khoai tây gọt vỏ thái que, rửa sạch, lau khô.",
      "Chiên khoai tây: Đun nóng dầu sâu lòng chảo, chiên khoai tây với lửa vừa cho đến khi vàng giòn. Vớt ra để ráo dầu, rắc muối.",
      "Áp chảo bò: Làm nóng chảo gang hoặc chảo chống dính với lửa lớn. Cho bơ và dầu vào, khi bơ tan thì cho bò vào. Lắc chảo hoặc đảo nhanh trong 2-3 phút (bò chín tái).",
      "Hoàn thiện món: Cho hành tây thái múi vào xào cùng bò 1 phút. Nêm nếm lại gia vị. Tắt bếp. Trình bày bò lên đĩa với khoai chiên, xà lách và cà chua bi.",
    ],
    tags: ["beef", "dinner", "fancy"],
    like_count: 276,
    is_community: true,
    author_name: "Đỗ Hoàng Nam",
    author_avatar: "https://i.pravatar.cc/150?img=6",
    requiredIngredients: ["beef", "potato", "onion", "garlic"],
    nutrition_facts: {
      calories: 445,
      protein: 38,
      carbs: 32,
      fat: 20,
      fiber: 4,
    },
  },

  {
    title: "Cháo Gà Quay Thơm Nức",
    description:
      "Cháo gà trắng mịn màng kết hợp với gà quay giòn da thơm nức, món ăn bổ dưỡng vừa thanh nhẹ vừa đậm đà, thích hợp cho người ốm dậy hoặc bữa sáng cuối tuần.",
    image_url:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200",
    time_minutes: 75,
    difficulty_score: 2,
    ingredients_list: [
      "Gạo tẻ 200g",
      "Đùi gà 2 cái (400g)",
      "Gừng tươi 30g",
      "Hành lá 3 cây",
      "Rau thơm (ngò, mùi tàu)",
    ],
    ingredients_list_fixed: [
      "rice 200g",
      "chicken 400g",
      "garlic 3 cloves",
      "spring_onion 3",
    ],
    seasoning: [
      "Nước mắm",
      "Muối",
      "Đường 1 muỗng cà phê",
      "Tiêu",
      "Hạt nêm",
      "Dầu ăn",
      "Rượu trắng 1 muỗng canh",
    ],
    instructions: [
      "Sơ chế và luộc gà: Gà rửa sạch, chà muối và gừng để khử mùi, ướp rượu 10 phút. Đun sôi nồi nước với gừng đập dập, cho gà vào luộc 20 phút lửa vừa. Vớt gà ra, để nguội.",
      "Ninh cháo: Gạo vo sạch, ngâm 15 phút. Dùng nước luộc gà (khoảng 1.5 lít) để nấu cháo. Cho gạo vào nấu với lửa nhỏ 40-45 phút, thỉnh thoảng khuấy đều. Nêm muối, hạt nêm.",
      "Quay gà giòn da: Thoa đều dầu lên da gà. Đặt gà vào lò nướng hoặc chảo, quay/chiên ở nhiệt độ 180°C khoảng 15 phút cho da vàng giòn. Chặt miếng vừa ăn.",
      "Hoàn thiện món: Múc cháo ra tô, xếp thịt gà quay lên trên. Rắc hành lá, gừng thái sợi, rau thơm, tiêu. Ăn kèm nước mắm gừng.",
    ],
    tags: ["comfort-food", "breakfast", "chicken"],
    like_count: 212,
    is_community: true,
    author_name: "Lý Ngọc Lan",
    author_avatar: "https://i.pravatar.cc/150?img=7",
    requiredIngredients: ["rice", "chicken", "garlic", "spring_onion"],
    nutrition_facts: {
      calories: 425,
      protein: 32,
      carbs: 56,
      fat: 9,
      fiber: 2,
    },
  },

  {
    title: "Cá Diêu Hồng Chiên Sốt Cà",
    description:
      "Cá diêu hồng chiên giòn nguyên con, sốt cà chua chua ngọt đậm đà với thơm, món ngon hao cơm cho bữa cơm gia đình.",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200",
    time_minutes: 40,
    difficulty_score: 2,
    ingredients_list: [
      "Cá diêu hồng 2 con (600g)",
      "Cà chua 4 trái",
      "Thơm 150g",
      "Hành tây 1 củ",
      "Tỏi 4 tép",
      "Ớt 2 trái",
    ],
    ingredients_list_fixed: [
      "fish 600g",
      "tomato 4",
      "pineapple 150g",
      "onion 1",
      "garlic 4 cloves",
      "pepper 2",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Dấm 1 muỗng canh",
      "Tương ớt 1 muỗng canh",
      "Bột năng 1 muỗng cà phê",
      "Nghệ bột",
    ],
    instructions: [
      "Sơ chế cá: Cá rửa sạch, rạch 2-3 đường trên lưng, ướp muối, nghệ, tiêu 15 phút. Thấm khô cá trước khi chiên.",
      "Chiên cá: Làm nóng chảo dầu sâu, chiên cá với lửa vừa cho đến khi vàng giòn đều 2 mặt (khoảng 10 phút). Vớt ra đĩa lót giấy thấm dầu.",
      "Nấu sốt cà chua: Dùng lại chảo với chút dầu, phi tỏi băm và hành tây thái múi. Cho cà chua thái múi vào xào đến khi cà chua nhũn. Thêm thơm thái miếng, ớt.",
      "Hoàn thiện: Nêm nước mắm, đường, dấm, tương ớt vào sốt. Cho 100ml nước, đun sôi. Pha bột năng với nước, đổ vào khuấy đều cho sốt sệt. Chan sốt lên cá, rắc hành lá.",
    ],
    tags: ["fried", "fish", "sweet-sour"],
    like_count: 189,
    is_community: true,
    author_name: "Nguyễn Đức Anh",
    author_avatar: "https://i.pravatar.cc/150?img=13",
    requiredIngredients: ["fish", "tomato", "pineapple", "onion", "garlic"],
    nutrition_facts: {
      calories: 395,
      protein: 36,
      carbs: 32,
      fat: 14,
      fiber: 4,
    },
  },

  // ========== MỨC ĐỘ KHÓ HƠN ==========
  {
    title: "Bún Thịt Nướng Sả Nghệ",
    description:
      "Bún thịt nướng thơm lừng với sả nghệ, thịt mềm ngọt ăn kèm rau sống, đồ chua, bún trắng và nước mắm chua ngọt đậm đà, món ăn hè đặc trưng miền Nam.",
    image_url:
      "https://images.unsplash.com/photo-1589307000254-6d91a6f0d5d7?w=1200",
    time_minutes: 50,
    difficulty_score: 2,
    ingredients_list: [
      "Bún tươi 300g",
      "Thịt vai heo 400g",
      "Sả 3 cây",
      "Rau sống (xà lách, húng, tía tô)",
      "Dưa leo 1 trái",
      "Cà rốt 1 củ",
      "Đậu phộng rang 50g",
    ],
    ingredients_list_fixed: [
      "rice_noodles 300g",
      "pork 400g",
      "lemongrass 3",
      "bean_sprouts 80g",
      "carrot 1",
    ],
    seasoning: [
      "Nước mắm 3 muỗng canh",
      "Đường 2 muỗng canh",
      "Tỏi 5 tép",
      "Nghệ bột 1 muỗng cà phê",
      "Dầu ăn 2 muỗng canh",
      "Dấm 2 muỗng canh",
    ],
    instructions: [
      "Ướp và ướp thịt: Thịt thái lát mỏng 0.5cm. Sả băm nhuyễn, tỏi băm. Ướp thịt với sả, tỏi, nghệ, nước mắm, đường, dầu trong 2 giờ (hoặc qua đêm trong tủ lạnh).",
      "Chuẩn bị đồ chua và rau: Cà rốt, dưa leo thái sợi nhỏ, ngâm với đường, dấm, muối 30 phút. Rau rửa sạch, để ráo. Pha nước mắm chua ngọt.",
      "Nướng thịt: Làm nóng vỉ nướng hoặc chảo gang với lửa lớn. Nướng thịt đã ướp từng lát, khoảng 2-3 phút mỗi mặt cho thịt chín vàng thơm, có vết cháy xém nhẹ.",
      "Hoàn thiện và trình bày: Chần bún qua nước sôi. Xếp bún vào tô, rau sống, đồ chua xung quanh. Xếp thịt nướng lên trên, rắc đậu phộng rang giã nhỏ, hành phi. Chan nước mắm chua ngọt.",
    ],
    tags: ["summer", "grill", "noodles"],
    like_count: 312,
    is_community: true,
    author_name: "Trần Thuỳ Dung",
    author_avatar: "https://i.pravatar.cc/150?img=8",
    requiredIngredients: ["rice_noodles", "pork", "lemongrass", "carrot"],
    nutrition_facts: {
      calories: 485,
      protein: 30,
      carbs: 62,
      fat: 13,
      fiber: 5,
    },
  },

  {
    title: "Nem Rán (Chả Giò) Miền Nam",
    description:
      "Nem rán giòn rụm với vỏ bánh tráng vàng ươm, nhân thịt băm, nấm, mộc nhĩ, miến thơm ngon, món khai vị hoặc ăn kèm bún đều ngon.",
    image_url:
      "https://images.unsplash.com/photo-1544025163-3b2b2d3c2a7b?w=1200",
    time_minutes: 60,
    difficulty_score: 3,
    ingredients_list: [
      "Bánh tráng 20 tờ",
      "Thịt heo xay 300g",
      "Tôm 100g",
      "Nấm mèo (mộc nhĩ) 50g",
      "Miến 50g",
      "Cà rốt 1 củ",
      "Hành tím 3 củ",
      "Trứng gà 2 quả",
    ],
    ingredients_list_fixed: [
      "rice_paper 20",
      "pork 300g",
      "shrimp 100g",
      "mushroom 50g",
      "carrot 1",
    ],
    seasoning: [
      "Nước mắm 2 muỗng canh",
      "Đường 1 muỗng cà phê",
      "Tiêu",
      "Hạt nêm",
      "Dầu chiên",
    ],
    instructions: [
      "Sơ chế và làm nhân: Nấm, miến ngâm nở thái nhỏ. Tôm băm nhỏ. Cà rốt bào sợi. Trộn thịt xay với tất cả nguyên liệu trên, thêm 1 quả trứng, nêm nước mắm, đường, tiêu, hạt nêm. Trộn đều, ướp 15 phút.",
      "Chuẩn bị bánh tráng: Dùng khăn ẩm hoặc nước lọc phết nhẹ lên bánh tráng cho mềm dẻo (không quá ướt). Đợi 30 giây.",
      "Cuộn nem: Đặt 1.5 muỗng canh nhân vào 1/3 dưới bánh tráng. Gấp 2 bên vào, cuộn chặt từ dưới lên. Dùng hỗn hợp trứng để dính miệng nem.",
      "Chiên nem: Đun nóng dầu sâu lòng chảo với lửa vừa (170°C). Cho nem vào chiên từng đợt, đảo đều cho vàng giòn đều các mặt (10-12 phút). Vớt ra để ráo dầu. Ăn nóng với nước mắm chua ngọt và rau sống.",
    ],
    tags: ["appetizer", "party", "crispy"],
    like_count: 267,
    is_community: true,
    author_name: "Lê Văn Bình",
    author_avatar: "https://i.pravatar.cc/150?img=9",
    requiredIngredients: ["rice_paper", "pork", "shrimp", "mushroom", "carrot"],
    nutrition_facts: {
      calories: 385,
      protein: 20,
      carbs: 42,
      fat: 16,
      fiber: 4,
    },
  },

  {
    title: "Bún Riêu Cua Đồng",
    description:
      "Bún riêu cua đồng với nước dùng đỏ thơm từ cà chua, riêu cua, nhiều topping đậu hũ, tôm, thịt, món ăn truyền thống Hà Nội.",
    image_url:
      "https://images.unsplash.com/photo-1604908177435-6b9f1a0d5f4f?w=1200",
    time_minutes: 80,
    difficulty_score: 3,
    ingredients_list: [
      "Bún tươi 400g",
      "Riêu cua (cua đồng) 200g",
      "Cà chua 5 trái",
      "Đậu hũ 200g",
      "Tôm 150g",
      "Huyết heo 100g",
      "Rau muống 100g",
      "Bạc hà 50g",
    ],
    ingredients_list_fixed: [
      "rice_noodles 400g",
      "tomato 5",
      "tofu 200g",
      "shrimp 150g",
    ],
    seasoning: [
      "Nước mắm 4 muỗng canh",
      "Mắm tôm 1.5 muỗng canh",
      "Đường 1 muỗng canh",
      "Hành tím 5 củ",
      "Muối",
      "Hạt nêm",
    ],
    instructions: [
      "Sơ chế nguyên liệu: Cà chua thái múi to. Đậu hũ chiên vàng, cắt miếng tam giác. Huyết luộc chín, cắt miếng. Rau rửa sạch. Tôm bóc vỏ.",
      "Nấu nước dùng: Đun sôi 2 lít nước. Phi hành tím thơm, cho cà chua vào xào cho nhũn. Đổ vào nồi nước, nêm nước mắm, đường, muối. Đun sôi 10 phút.",
      "Làm riêu và nấu: Riêu cua trộn đều với 1 ít nước, từ từ cho vào nồi nước dùng đang sôi, khuấy nhẹ. Cho đậu hũ, tôm vào nấu 5 phút. Thêm mắm tôm, nêm nếm lại.",
      "Hoàn thiện món: Chần bún, rau qua nước sôi. Cho bún vào tô, múc riêu cùng topping lên. Thêm rau muống, bạc hà, huyết. Ăn kèm chanh, ớt, mắm tôm.",
    ],
    tags: ["noodles", "traditional", "hanoi"],
    like_count: 298,
    is_community: true,
    author_name: "Vũ Kim Chi",
    author_avatar: "https://i.pravatar.cc/150?img=14",
    requiredIngredients: ["rice_noodles", "tomato", "tofu", "shrimp"],
    nutrition_facts: {
      calories: 465,
      protein: 34,
      carbs: 58,
      fat: 13,
      fiber: 7,
    },
  },

  {
    title: "Hủ Tiếu Nam Vang Sài Gòn",
    description:
      "Hủ tiếu Nam Vang với nước dùng ngọt thanh từ xương heo, nhiều topping tôm, thịt, gan, lòng, món ăn đường phố đặc trưng Sài Gòn.",
    image_url:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=1200",
    time_minutes: 90,
    difficulty_score: 3,
    ingredients_list: [
      "Hủ tiếu khô 300g",
      "Tôm 200g",
      "Thịt heo xay 150g",
      "Thịt heo luộc 150g",
      "Gan heo 100g",
      "Xương heo 500g",
      "Tỏi 6 tép",
      "Giá đỗ 100g",
    ],
    ingredients_list_fixed: [
      "rice_noodles 300g",
      "shrimp 200g",
      "pork 300g",
      "garlic 6 cloves",
      "bean_sprouts 100g",
    ],
    seasoning: [
      "Nước mắm 4 muỗng canh",
      "Đường phên 1.5 muỗng canh",
      "Bột ngọt",
      "Tiêu",
      "Muối",
      "Hành tím phi",
    ],
    instructions: [
      "Ninh nước dùng: Xương heo blanch qua nước sôi, rửa sạch. Cho vào nồi với 2.5 lít nước lạnh, đun sôi rồi hạ lửa nhỏ ninh 60 phút. Vớt bỏ xương, lọc nước trong.",
      "Sơ chế topping: Thịt xay nặn thành viên nhỏ. Thịt heo luộc thái lát mỏng. Gan luộc vừa chín thái lát. Tôm bóc vỏ. Tỏi băm phi vàng.",
      "Nấu nước dùng hoàn chỉnh: Nêm nước dùng với nước mắm, đường, bột ngọt vừa ăn. Cho thịt viên và gan vào nấu chín. Cho tôm vào chần chín.",
      "Hoàn thiện món: Chần hủ tiếu và giá đỗ qua nước sôi. Cho hủ tiếu vào tô, xếp topping đầy đủ. Chan nước dùng nóng. Rắc hành tím phi, tiêu, thêm rau thơm. Ăn kèm tương ớt và chanh.",
    ],
    tags: ["noodles", "saigon", "comfort"],
    like_count: 278,
    is_community: true,
    author_name: "Lâm Minh Quân",
    author_avatar: "https://i.pravatar.cc/150?img=15",
    requiredIngredients: [
      "rice_noodles",
      "shrimp",
      "pork",
      "garlic",
      "bean_sprouts",
    ],
    nutrition_facts: {
      calories: 525,
      protein: 38,
      carbs: 64,
      fat: 13,
      fiber: 4,
    },
  },

  {
    title: "Bánh Xèo Miền Tây",
    description:
      "Bánh xèo miền Tây giòn tan, size lớn, nhân tôm thịt đầy đặn, ăn kèm rau sống và nước mắm chua ngọt, món đặc sản miền sông nước.",
    image_url:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=1200",
    time_minutes: 60,
    difficulty_score: 3,
    ingredients_list: [
      "Bột bánh xèo 300g",
      "Nước dừa 400ml",
      "Tôm 200g",
      "Thịt ba chỉ 150g",
      "Giá đỗ 200g",
      "Hành lá 3 cây",
      "Rau sống (xà lách, tía tô, húng)",
    ],
    ingredients_list_fixed: [
      "shrimp 200g",
      "pork 150g",
      "bean_sprouts 200g",
      "spring_onion 3",
      "coconut 400ml",
    ],
    seasoning: [
      "Nghệ bột 1 muỗng cà phê",
      "Muối",
      "Đường",
      "Nước mắm 3 muỗng canh",
      "Tỏi 3 tép",
      "Ớt 2 trái",
    ],
    instructions: [
      "Pha bột bánh xèo: Trộn bột bánh xèo với nước dừa, thêm nghệ, muối, khuấy đều. Để bột nghỉ 30 phút. Độ sệt vừa phải (hơi loãng một chút).",
      "Sơ chế nhân: Thịt ba chỉ thái lát mỏng, ướp muối, tiêu. Tôm bóc vỏ, rửa sạch. Giá rửa sạch, để ráo. Hành lá thái khúc 3cm.",
      "Đổ bánh: Làm nóng chảo lớn với dầu. Cho thịt vào xào sơ, thêm tôm. Múc 1 muôi lớn bột đổ vào chảo, lắc đều cho bột phủ kín đáy. Cho giá và hành lá vào giữa bánh.",
      "Hoàn thiện: Đậy nắp 2 phút, mở nắp chiên với lửa vừa cho bánh giòn đáy (5-7 phút). Gấp đôi bánh. Trình bày với rau sống và nước mắm pha chua ngọt.",
    ],
    tags: ["banh", "southern", "crispy"],
    like_count: 245,
    is_community: true,
    author_name: "Võ Lan Phương",
    author_avatar: "https://i.pravatar.cc/150?img=16",
    requiredIngredients: [
      "shrimp",
      "pork",
      "bean_sprouts",
      "spring_onion",
      "coconut",
    ],
    nutrition_facts: {
      calories: 445,
      protein: 26,
      carbs: 54,
      fat: 15,
      fiber: 5,
    },
  },
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
