// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Layout 
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

// Vistas 
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import Dashboard from '@/views/Dashboard.vue'
import Portafolio from '@/views/Portafolio.vue'
import ProfilePage from '@/views/ProfilePage.vue'  
import NotFound from '@/views/NotFound.vue'

import { useAuthStore } from '@/stores/auth'

const routes = [
  // Rutas públicas
  {
    path: '/',
    component: PublicLayout,  // Layout para páginas públicas
    meta: { layout: 'public' },
    children: [
      { path: '', 
        name: 'home', 
        component: HomePage, 
        meta: { layout: 'public' } 
      },
      { path: 'login', 
        name: 'login', 
        component: LoginPage, 
        meta: { layout: 'public' } 
      },
      { path: 'register', 
        name: 'register', 
        component: RegisterPage, 
        meta: { layout: 'public' } 
      },
    ],
  },

  // Rutas privadas (Dashboard, Portafolio, Profile)
  {
    path: '/default',
    component: DefaultLayout,  // Layout para rutas privadas
    meta: { layout: 'default', requiresAuth: true },
    redirect: { name: 'dashboard' },
    children: [
      { path: 'dashboard', 
        name: 'dashboard', 
        component: Dashboard, 
        meta: { layout: 'default' } 
      },
      { path: 'portafolio', 
        name: 'portafolio', 
        component: Portafolio, 
        meta: { layout: 'default' } 
      },
      { path: 'profile', 
        name: 'profile', 
        component: ProfilePage, 
        meta: { layout: 'default' } 
      },
    ],
  },

  // Ruta 404 opcional
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔒 Guardia de navegación (protección de rutas)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si el estado de autenticación está en carga, esperar antes de realizar la navegación
  if (authStore.loading) {
    return next() // O puedes redirigir a una página de carga
  }

  // Ruta protegida: requiere usuario autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  // Ruta solo para invitados: login / register
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  // Cualquier otra ruta
  next()
})

export default router