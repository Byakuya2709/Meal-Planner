import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Tủ lạnh nhà bạn hôm nay - Nấu gì với nguyên liệu có sẵn?',
      description: 'Chọn nguyên liệu trong tủ lạnh, nhận gợi ý món nấu ngay - Không cần mua thêm, giảm lãng phí thực phẩm',
    }
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: () => import('../views/Recipe.vue'),
    meta: {
      title: 'Công thức nấu ăn - Tủ lạnh nhà bạn hôm nay',
      description: 'Công thức nấu ăn đơn giản với nguyên liệu có sẵn trong tủ lạnh',
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue'),
    meta: {
      title: 'Cộng đồng chia sẻ công thức - Tủ lạnh nhà bạn hôm nay',
      description: 'Khám phá và chia sẻ công thức nấu ăn từ cộng đồng người dùng',
    }
  },
  {
    path: '/impact',
    name: 'Impact',
    component: () => import('../views/Impact.vue'),
    meta: {
      title: 'Giảm lãng phí thực phẩm - Tủ lạnh nhà bạn hôm nay',
      description: 'Cùng nhau giảm thiểu lãng phí thực phẩm, bảo vệ môi trường',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Không tìm thấy trang - Tủ lạnh nhà bạn hôm nay',
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// SEO Meta tags handler
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'Tủ lạnh nhà bạn hôm nay'
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || '')
  }
  
  next()
})

export default router