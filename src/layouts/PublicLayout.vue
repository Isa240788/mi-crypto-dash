<!-- src/layout/PublicLayout.vue -->
<template>
  <div class="bg-base-100 dark:bg-base-200 flex flex-col items-center justify-center p-6 transition-colors">
    <!-- Contenedor para la página pública (login, registro, etc.) -->
    <main class="w-full max-w-4xl">
      <router-view />
    </main>

    <!-- Toast global opcional, para mostrar alertas desde páginas públicas -->
    <Toast ref="toastRef" />

    <!-- ThemeSwitch flotante (opcional) -->
    <div class="fixed bottom-4 left-4 z-50">
      <ThemeSwitch />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Toast from '@/components/layout/Toast.vue'
import ThemeSwitch from '@/components/ui/ThemeSwitch.vue'

// Creamos referencia para el Toast
const toastRef = ref(null)

// Proveemos el Toast para que cualquier componente pueda inyectarlo
provide('toast', {
  showToast: (msg, type = 'success') => toastRef.value?.showToast(msg, type)
})
</script>