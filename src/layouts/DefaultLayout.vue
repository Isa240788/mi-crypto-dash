<!-- src/layout/DefaultLayout.vue -->
<template>
  <div class="flex min-h-screen bg-base-100 dark:bg-base-200 transition-colors">
    <!-- Sidebar -->
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header :ultimaActualizacion="ultimaActualizacion" :refrescando="refrescando" />

      <!-- Contenido de cada página -->
      <main class="p-6 flex-1 overflow-auto">
        <router-view />
      </main>

      <!-- Toast global -->
      <Toast ref="toastRef" />
    </div>

    <!-- ThemeSwitch flotante -->
    <div class="fixed bottom-4 left-4 z-50">
      <ThemeSwitch />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'  
import Toast from '@/components/layout/Toast.vue'
import ThemeSwitch from '@/components/ui/ThemeSwitch.vue'

const authStore = useAuthStore()

// Propiedades globales
const userEmail = computed(() => authStore.userEmail)
const ultimaActualizacion = new Date().toLocaleTimeString()
const refrescando = ref(false)

const toastRef = ref(null)

// Proveer el Toast globalmente
provide('toast', toastRef)
</script>