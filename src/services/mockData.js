// Mock data cho ingredients
export const ingredients = [
  // Protein
  { id: 'chicken', name: 'Thịt gà', category: 'protein', icon: '🍗' },
  { id: 'pork', name: 'Thịt heo', category: 'protein', icon: '🥓' },
  { id: 'beef', name: 'Thịt bò', category: 'protein', icon: '🥩' },
  { id: 'fish', name: 'Cá', category: 'protein', icon: '🐟' },
  { id: 'shrimp', name: 'Tôm', category: 'protein', icon: '🦐' },
  { id: 'egg', name: 'Trứng', category: 'protein', icon: '🥚' },
  { id: 'tofu', name: 'Đậu hũ', category: 'protein', icon: '🧈' },
  
  // Vegetables
  { id: 'tomato', name: 'Cà chua', category: 'vegetable', icon: '🍅' },
  { id: 'cabbage', name: 'Bắp cải', category: 'vegetable', icon: '🥬' },
  { id: 'carrot', name: 'Cà rót', category: 'vegetable', icon: '🥕' },
  { id: 'potato', name: 'Khoai tây', category: 'vegetable', icon: '🥔' },
  { id: 'onion', name: 'Hành tây', category: 'vegetable', icon: '🧅' },
  { id: 'garlic', name: 'Tỏi', category: 'vegetable', icon: '🧄' },
  { id: 'pepper', name: 'Ớt', category: 'vegetable', icon: '🌶️' },
  { id: 'mushroom', name: 'Nấm', category: 'vegetable', icon: '🍄' },
  
  // Carbs
  { id: 'rice', name: 'Gạo', category: 'carb', icon: '🍚' },
  { id: 'noodles', name: 'Mì/Miến', category: 'carb', icon: '🍜' },
  { id: 'pasta', name: 'Pasta', category: 'carb', icon: '🍝' },
  
  // Others
  { id: 'cheese', name: 'Phô mai', category: 'dairy', icon: '🧀' },
  { id: 'milk', name: 'Sữa', category: 'dairy', icon: '🥛' },
]

// Mock data cho recipes - Theo schema mới
export const recipes = [
  {
    _id: 'recipe_001',
    created_at: new Date('2025-11-17T02:42:09+07:00'),
    title: 'Gà xào nấm',
    description: 'Món gà xào nấm đơn giản, nhanh gọn cho bữa cơm gia đình với hương vị thơm ngon',
    image_url: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: [
      'chicken breast 300g',
      'mushroom 200g',
      'onion 1 piece',
      'garlic 3 cloves'
    ],
    ingredients_list_fixed: [
      'chicken breast 300g',
      'mushroom 200g',
      'onion 1 piece',
      'garlic 3 cloves'
    ],
    seasoning: [
      '2 tbsp soy sauce',
      '2 tbsp cooking oil',
      'salt & pepper to taste'
    ],
    instructions: [
      'Thái thịt gà thành miếng vừa ăn, ướp với 1 muống nước tương, tiêu, tỏi băm trong 10 phút.',
      'Nấm rửa sạch, bổ múi. Hành tây thái lát mỏng.',
      'Đun nóng chảo với dầu, phi thơm tỏi đến vàng.',
      'Cho gà vào xào chín vàng đều các mặt.',
      'Thêm nấm và hành tây, xào đều trong 5 phút.',
      'Nêm nếm gia vị cho vừa khẩu vị.',
      'Tắt bếp, múc ra đĩa và thưởng thức nóng.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 320,
      protein_g: 35,
      carbohydrates_g: 12,
      fat_total_g: 14,
      fiber_g: 3,
      sugar_g: 4
    },
    tags: ['healthy', 'quick', 'family-friendly', 'dinner'],
    likeCount: 45,
    // Legacy fields for backward compatibility
    requiredIngredients: ['chicken', 'mushroom', 'onion', 'garlic']
  },
  {
    _id: 'recipe_002',
    created_at: new Date('2025-11-18T10:15:00+07:00'),
    title: 'Trứng chiên cà chua',
    description: 'Món ăn đơn giản nhưng đầy đủ dinh dưỡng, phù hợp cho bữa sáng hoặc bữa trưa nhanh',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
    time_minutes: 15,
    difficulty_score: 1,
    ingredients_list: [
      'egg 4 pieces',
      'tomato 2 pieces',
      'onion 1/2 piece',
      'spring onion 2 stalks'
    ],
    ingredients_list_fixed: [
      'egg 4 pieces',
      'tomato 2 pieces',
      'onion 1/2 piece',
      'spring onion 2 stalks'
    ],
    seasoning: [
      '2 tbsp cooking oil',
      'salt & pepper to taste'
    ],
    instructions: [
      'Đánh tan trứng với chút muối, tiêu trong bát.',
      'Cà chua rửa sạch, thái múi cau.',
      'Hành tây thái lát mỏng, hành lá thái khúc.',
      'Đun nóng chảo, cho dầu vào.',
      'Đổ trứng vào chiên vàng 2 mặt, gắp ra đĩa.',
      'Xào thơm hành tây, cho cà chua vào đảo đều đến mềm.',
      'Cho trứng đã chiên vào đảo cùng, nêm nếm vừa khẩu vị.',
      'Rắc hành lá lên trên và tắt bếp.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 240,
      protein_g: 16,
      carbohydrates_g: 8,
      fat_total_g: 16,
      fiber_g: 2,
      sugar_g: 3
    },
    tags: ['quick', 'easy', 'vegetarian-friendly', 'breakfast'],
    likeCount: 67,
    requiredIngredients: ['egg', 'tomato', 'onion']
  },
  {
    _id: 'recipe_003',
    created_at: new Date('2025-11-19T14:30:00+07:00'),
    title: 'Thịt bò xào khoai tây',
    description: 'Món bò xào khoai tây bổ dưỡng cho cả nhà, thơm ngon và no lâu',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    time_minutes: 30,
    difficulty_score: 2,
    ingredients_list: [
      'beef 400g',
      'potato 3 pieces',
      'carrot 1 piece',
      'onion 1 piece',
      'garlic 4 cloves'
    ],
    ingredients_list_fixed: [
      'beef 400g',
      'potato 3 pieces',
      'carrot 1 piece',
      'onion 1 piece',
      'garlic 4 cloves'
    ],
    seasoning: [
      '3 tbsp soy sauce',
      '3 tbsp cooking oil',
      '1 tsp sugar',
      'salt & pepper to taste'
    ],
    instructions: [
      'Thịt bò thái lát mỏng, ướp nước tương và tiêu trong 15 phút.',
      'Khoai tây gọt vỏ, thái miếng vừa. Cà rốt thái lát dày.',
      'Hành tây thái múi cau, tỏi băm nhỏ.',
      'Chiên khoai tây và cà rốt đến vàng đều, vớt ra để ráo dầu.',
      'Xào thơm tỏi, cho thịt bò vào xào chín tới.',
      'Cho hành tây, khoai và cà rốt vào đảo đều.',
      'Nêm nếm gia vị, thêm chút nước để mềm khoai.',
      'Đun nhỏ lửa trong 10 phút cho thấm gia vị và mềm khoai.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 420,
      protein_g: 32,
      carbohydrates_g: 35,
      fat_total_g: 18,
      fiber_g: 5,
      sugar_g: 4
    },
    tags: ['hearty', 'family-meal', 'dinner', 'filling'],
    likeCount: 89,
    requiredIngredients: ['beef', 'potato', 'onion', 'carrot']
  },
  {
    _id: 'recipe_004',
    created_at: new Date('2025-11-17T02:42:09+07:00'),
    title: 'Baked Salmon with Asparagus',
    description: 'Oven-baked salmon fillet alongside roasted asparagus and lemon.',
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    time_minutes: 20,
    difficulty_score: 2,
    ingredients_list: [
      'salmon fillet 180g',
      'asparagus 100g',
      'lemon juice 15ml'
    ],
    ingredients_list_fixed: [
      'salmon fillet 180g',
      'asparagus 100g',
      'lemon juice 15ml'
    ],
    seasoning: [
      '1 tbsp olive oil',
      '1 tsp lemon juice',
      'salt & pepper to taste'
    ],
    instructions: [
      'Preheat oven to 200°C.',
      'Place salmon and asparagus on baking tray, drizzle oil and lemon, season.',
      'Bake for ~15 minutes.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 360,
      protein_g: 30,
      carbohydrates_g: 4,
      fat_total_g: 18,
      fiber_g: 2,
      sugar_g: 1
    },
    tags: ['pescatarian', 'dinner', 'healthy'],
    likeCount: 0,
    requiredIngredients: ['fish']
  }
]

// Mock data cho community recipes - Schema mới
export const communityRecipes = [
  {
    _id: 'recipe_001',
    created_at: new Date('2026-01-05T10:00:00+07:00'),
    title: 'Canh chua cá',
    description: 'Canh chua cá truyền thống với vị chua ngọt đậm đà, thích hợp cho bữa cơm gia đình',
    image_url: 'https://images.unsplash.com/photo-1594756202090-0b0489e8096b?w=800',
    time_minutes: 30,
    difficulty_score: 2,
    ingredients_list: [
      'fish 300g',
      'tomato 2 pieces',
      'pineapple 100g',
      'okra 50g',
      'tamarind paste 2 tbsp'
    ],
    ingredients_list_fixed: [
      'fish 300g',
      'tomato 2 pieces',
      'pineapple 100g',
      'okra 50g',
      'tamarind paste 2 tbsp'
    ],
    seasoning: [
      '2 tbsp fish sauce',
      '1 tbsp sugar',
      'salt to taste'
    ],
    instructions: [
      'Rửa sạch cá, cắt khúc vừa ăn.',
      'Cà chua thái múi, thơm thái miếng.',
      'Đun sôi nước, cho me vào nấu chua.',
      'Cho cà chua, thơm vào nấu mềm.',
      'Cho cá vào nấu chín, nêm nếm.',
      'Thêm đậu bắp, nấu thêm 2 phút.',
      'Rắc hành ngò và tắt bếp.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 180,
      protein_g: 22,
      carbohydrates_g: 15,
      fat_total_g: 4,
      fiber_g: 3,
      sugar_g: 8
    },
    tags: ['traditional', 'healthy', 'soup', 'vietnamese'],
    likeCount: 124,
    author: {
      name: 'Nguyễn Minh',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    requiredIngredients: ['fish', 'tomato']
  },
  {
    _id: 'recipe_002',
    created_at: new Date('2026-01-04T15:30:00+07:00'),
    title: 'Mì xào hải sản',
    description: 'Mì xào hải sản thơm ngon với tôm tươi và rau củ giòn ngọt',
    image_url: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800',
    time_minutes: 20,
    difficulty_score: 2,
    ingredients_list: [
      'noodles 200g',
      'shrimp 150g',
      'cabbage 100g',
      'carrot 1 piece'
    ],
    ingredients_list_fixed: [
      'noodles 200g',
      'shrimp 150g',
      'cabbage 100g',
      'carrot 1 piece'
    ],
    seasoning: [
      '2 tbsp oyster sauce',
      '1 tbsp soy sauce',
      '2 tbsp cooking oil'
    ],
    instructions: [
      'Luộc mì qua nước sôi, vớt ra để ráo.',
      'Tôm bóc vỏ, rửa sạch.',
      'Bắp cải thái sợi, cà rốt thái lát.',
      'Đun nóng chảo, xào tôm chín.',
      'Cho rau củ vào xào đều.',
      'Cho mì vào đảo đều với gia vị.',
      'Đảo thêm 2 phút và tắt bếp.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 380,
      protein_g: 20,
      carbohydrates_g: 45,
      fat_total_g: 12,
      fiber_g: 4,
      sugar_g: 5
    },
    tags: ['quick', 'seafood', 'noodles', 'dinner'],
    likeCount: 98,
    author: {
      name: 'Lê Thu',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    requiredIngredients: ['noodles', 'shrimp', 'cabbage', 'carrot']
  },
  {
    _id: 'recipe_003',
    created_at: new Date('2026-01-03T09:00:00+07:00'),
    title: 'Đậu hũ sốt cà chua',
    description: 'Món chay đơn giản nhưng ngon miệng với đậu hũ mềm và sốt cà chua đậm đà',
    image_url: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800',
    time_minutes: 25,
    difficulty_score: 1,
    ingredients_list: [
      'tofu 300g',
      'tomato 3 pieces',
      'onion 1 piece',
      'mushroom 100g'
    ],
    ingredients_list_fixed: [
      'tofu 300g',
      'tomato 3 pieces',
      'onion 1 piece',
      'mushroom 100g'
    ],
    seasoning: [
      '2 tbsp soy sauce',
      '1 tbsp sugar',
      '2 tbsp cooking oil',
      'salt & pepper to taste'
    ],
    instructions: [
      'Đậu hũ cắt miếng vuông, chiên vàng.',
      'Cà chua thái múi cau nhỏ.',
      'Hành tây thái lát, nấm thái lát.',
      'Xào thơm hành, cho cà chua vào đảo.',
      'Thêm nấm, nấu đến mềm.',
      'Cho đậu hũ vào, đảo đều với sốt.',
      'Nêm nếm và tắt bếp.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 220,
      protein_g: 15,
      carbohydrates_g: 18,
      fat_total_g: 10,
      fiber_g: 4,
      sugar_g: 6
    },
    tags: ['vegetarian', 'healthy', 'easy', 'dinner'],
    likeCount: 87,
    author: {
      name: 'Trần Anh',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    requiredIngredients: ['tofu', 'tomato', 'onion', 'mushroom']
  },
  {
    _id: 'recipe_004',
    created_at: new Date('2026-01-02T14:00:00+07:00'),
    title: 'Thịt kho tàu',
    description: 'Món thịt kho kiểu miền Nam với vị ngọt đậm, thơm nức mũi',
    image_url: 'https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=800',
    time_minutes: 60,
    difficulty_score: 2,
    ingredients_list: [
      'pork belly 500g',
      'egg 4 pieces',
      'onion 1 piece',
      'garlic 5 cloves',
      'coconut water 300ml'
    ],
    ingredients_list_fixed: [
      'pork belly 500g',
      'egg 4 pieces',
      'onion 1 piece',
      'garlic 5 cloves',
      'coconut water 300ml'
    ],
    seasoning: [
      '3 tbsp fish sauce',
      '2 tbsp sugar',
      '1 tbsp caramel sauce',
      'salt & pepper to taste'
    ],
    instructions: [
      'Thịt rửa sạch, thái miếng vuông vừa.',
      'Trứng luộc chín, bóc vỏ.',
      'Tỏi băm nhỏ, hành tây thái lát.',
      'Ủ đường làm nước màu.',
      'Cho thịt vào rim với nước màu.',
      'Thêm nước dừa, gia vị, đun nhỏ lửa.',
      'Cho trứng vào, kho đến thịt mềm và nước sệt.',
      'Nêm nếm lại cho vừa khẩu vị.'
    ],
    nutrition_facts: {
      serving_size: '1 serving',
      calories: 480,
      protein_g: 28,
      carbohydrates_g: 12,
      fat_total_g: 35,
      fiber_g: 1,
      sugar_g: 8
    },
    tags: ['traditional', 'hearty', 'vietnamese', 'dinner'],
    likeCount: 156,
    author: {
      name: 'Phạm Hải',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    requiredIngredients: ['pork', 'egg', 'onion', 'garlic']
  }
]

// Mock data cho impact stats
export const impactStats = {
  totalUsers: 12458,
  mealsCreated: 45678,
  foodSaved: 23456, // kg
  co2Reduced: 15678, // kg
  moneySaved: 234567000, // VND
}