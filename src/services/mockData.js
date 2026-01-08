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

// Mock data cho recipes
export const recipes = [
  {
    id: 1,
    name: 'Gà xào nấm',
    description: 'Món gà xào nấm đơn giản, nhanh gọn cho bữa cơm gia đình',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
    cookTime: 25,
    difficulty: 'Dễ',
    servings: 2,
    requiredIngredients: ['chicken', 'mushroom', 'onion', 'garlic'],
    optionalIngredients: ['pepper'],
    whyChosen: [
      'Sử dụng 4/5 nguyên liệu bạn đã chọn',
      'Không cần mua thêm gì',
      'Nấu trong 25 phút'
    ],
    ingredients: [
      { name: 'Thịt gà', amount: '300g' },
      { name: 'Nấm', amount: '200g' },
      { name: 'Hành tây', amount: '1 củ' },
      { name: 'Tỏi', amount: '3 tép' },
      { name: 'Nước tương', amount: '2 muống canh' },
      { name: 'Dầu ăn', amount: '2 muống canh' },
      { name: 'Tiêu, muối', amount: 'vừa đủ' },
    ],
    steps: [
      'Thái thịt gà thành miếng vừa ăn, ướp với 1 muống nước tương, tiêu, tỏi băm',
      'Nấm rửa sạch, bổ múi. Hành tây thái lát',
      'Đun nóng chảo với dầu, phi thom tỏi',
      'Cho gà vào xào chín vàng',
      'Thêm nấm và hành tây, xào đều 5 phút',
      'Nêm nếm gia vị cho vừa khẩu vị',
      'Tắt bếp, múc ra đĩa và thưởng thức'
    ],
    nutrition: {
      calories: 320,
      protein: 35,
      carbs: 12,
      fat: 14
    },
    tags: ['Healthy', 'Quick', 'Family-friendly']
  },
  {
    id: 2,
    name: 'Trứng chiên cà chua',
    description: 'Món ăn đơn giản nhưng đầy đủ dinh dưỡng',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
    cookTime: 15,
    difficulty: 'Rất dễ',
    servings: 2,
    requiredIngredients: ['egg', 'tomato', 'onion'],
    optionalIngredients: ['garlic'],
    whyChosen: [
      'Cực kỳ đơn giản, ai cũng làm được',
      'Chỉ mất 15 phút',
      'Nguyên liệu có sẵn 100%'
    ],
    ingredients: [
      { name: 'Trứng', amount: '4 quả' },
      { name: 'Cà chua', amount: '2 quả' },
      { name: 'Hành tây', amount: '1/2 củ' },
      { name: 'Hành lá', amount: '2 cây' },
      { name: 'Muối, tiêu', amount: 'vừa đủ' },
      { name: 'Dầu ăn', amount: '2 muống' },
    ],
    steps: [
      'Đánh tan trứng với chút muối, tiêu',
      'Cà chua rửa sạch, thái múi cau',
      'Hành tây thái lát mỏng',
      'Đun nóng chảo, cho dầu vào',
      'Đổ trứng vào chiên vàng 2 mặt, gắp ra',
      'Xào thơm hành tây, cho cà chua vào đảo đều',
      'Cho trứng đã chiên vào đảo cùng, nêm nếm',
      'Rắc hành lá và tắt bếp'
    ],
    nutrition: {
      calories: 240,
      protein: 16,
      carbs: 8,
      fat: 16
    },
    tags: ['Quick', 'Easy', 'Vegetarian-friendly']
  },
  {
    id: 3,
    name: 'Thịt bò xào khoai tây',
    description: 'Món bò xào khoai tây bổ dưỡng cho cả nhà',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    cookTime: 30,
    difficulty: 'Trung bình',
    servings: 3,
    requiredIngredients: ['beef', 'potato', 'onion', 'carrot'],
    optionalIngredients: ['garlic', 'pepper'],
    whyChosen: [
      'Bữa ăn no lâu, đủ chất',
      'Tận dụng được nhiều nguyên liệu',
      'Phù hợp cho cả gia đình'
    ],
    ingredients: [
      { name: 'Thịt bò', amount: '400g' },
      { name: 'Khoai tây', amount: '3 củ' },
      { name: 'Cà rốt', amount: '1 củ' },
      { name: 'Hành tây', amount: '1 củ' },
      { name: 'Tỏi', amount: '4 tép' },
      { name: 'Nước tương', amount: '3 muống canh' },
      { name: 'Dầu ăn', amount: '3 muống canh' },
    ],
    steps: [
      'Thịt bò thái lát mỏng, ướp nước tương và tiêu 15 phút',
      'Khoai tây gọt vỏ, thái miếng vừa. Cà rốt thái lát',
      'Hành tây thái múi cau, tỏi băm nhỏ',
      'Chiên khoai tây và cà rốt đến vàng, vớt ra',
      'Xào thơm tỏi, cho thịt bò vào xào chín',
      'Cho hành tây, khoai và cà rốt vào đảo đều',
      'Nêm nếm gia vị, thêm chút nước để mềm',
      'Đun nhỏ lửa 10 phút cho thấm gia vị'
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 35,
      fat: 18
    },
    tags: ['Hearty', 'Family-meal', 'Filling']
  },
]

// Mock data cho community recipes
export const communityRecipes = [
  {
    id: 101,
    name: 'Canh chua cá',
    author: 'Nguyễn Minh',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    votes: 124,
    ingredients: ['fish', 'tomato', 'pineapple', 'okra'],
    image: 'https://images.unsplash.com/photo-1594756202090-0b0489e8096b?w=800',
    cookTime: 30,
    createdAt: '2026-01-05'
  },
  {
    id: 102,
    name: 'Mì xào hải sản',
    author: 'Lê Thu',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    votes: 98,
    ingredients: ['noodles', 'shrimp', 'cabbage', 'carrot'],
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800',
    cookTime: 20,
    createdAt: '2026-01-04'
  },
  {
    id: 103,
    name: 'Đậu hũ sốt cà chua',
    author: 'Trần Anh',
    authorAvatar: 'https://i.pravatar.cc/150?img=3',
    votes: 87,
    ingredients: ['tofu', 'tomato', 'onion', 'mushroom'],
    image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800',
    cookTime: 25,
    createdAt: '2026-01-03'
  },
  {
    id: 104,
    name: 'Thịt kho tàu',
    author: 'Phạm Hải',
    authorAvatar: 'https://i.pravatar.cc/150?img=4',
    votes: 156,
    ingredients: ['pork', 'egg', 'onion', 'garlic'],
    image: 'https://images.unsplash.com/photo-1603073163308-9ab1de79b02d?w=800',
    cookTime: 60,
    createdAt: '2026-01-02'
  },
]

// Mock data cho impact stats
export const impactStats = {
  totalUsers: 12458,
  mealsCreated: 45678,
  foodSaved: 23456, // kg
  co2Reduced: 15678, // kg
  moneySaved: 234567000, // VND
}