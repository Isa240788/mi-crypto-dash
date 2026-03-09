<!-- src/components/layout/Sidebar.vue -->
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Actualizamos los PATHS para que coincidan con tu nuevo router /default
const menu = [
  { name: 'Dashboard', path: '/default/dashboard', icon: '📊' },
  { name: 'Portafolio', path: '/default/portafolio', icon: '💼' },
  { name: 'Perfil', path: '/default/profile', icon: '👤' },
]

// Función para saber si la ruta está activa
const isActive = (path) => route.path === path
</script>

<template>
  <!-- Sidebar Único (Responsivo) -->
  <aside class="flex flex-col items-center py-6 bg-base-200 border-r border-base-300 transition-all duration-300
                w-20 md:w-24 lg:w-64 min-h-screen sticky top-0 z-50">
    
    <!-- Logo (Solo Icono en mobile/tablet, Texto en LG) -->
    <div class="mb-10 flex items-center justify-center">
      <span class="text-3xl lg:hidden">📈</span>
      <span class="hidden lg:block text-2xl font-black text-primary">📈 FinchTech</span>
    </div>

    <!-- Menú de Navegación -->
    <nav class="flex-1 w-full px-2 lg:px-4">
      <ul class="flex flex-col gap-4 items-center lg:items-stretch">
        <li v-for="item in menu" :key="item.path" class="w-full">
          <router-link
            :to="item.path"
            class="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative"
            :class="isActive(item.path) 
              ? 'bg-primary text-primary-content shadow-lg' 
              : 'hover:bg-base-300 text-base-content/70'"
          >
            <!-- Icono -->
            <span class="text-xl shrink-0">{{ item.icon }}</span>
            
            <!-- Texto (Solo visible en LG) -->
            <span class="hidden lg:block font-medium truncate">{{ item.name }}</span>

            <!-- Tooltip para cuando el sidebar es pequeño -->
            <span class="lg:hidden absolute left-16 bg-neutral text-neutral-content px-2 py-1 rounded text-xs 
                         opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {{ item.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Espacio inferior (Logout u otros) -->
    <div class="mt-auto w-full px-4">
       <!-- Aquí podrías poner el botón de salir -->
    </div>
  </aside>
</template>

<style scoped>
/* Transición suave para cuando cambia el tamaño */
aside {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
