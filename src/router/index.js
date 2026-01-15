// src/router/index.js

import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'
import Community from '../views/Community.vue'
import Impact from '../views/Impact.vue'
import Favorites from '../views/Favorites.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe,
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/impact',
    name: 'Impact',
    component: Impact,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0, behavior: 'smooth' }
  },
})


// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Wait for auth to initialize
  if (!authStore.isInitialized) {
    await authStore.initAuth()
  }

  // Check if route requires auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to home
    next('/')
  } else {
    next()
  }
})

export default router