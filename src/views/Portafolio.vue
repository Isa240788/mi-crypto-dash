<!-- src/views/Portfolio.vue -->
<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePortfolioStore } from '@/stores/portfolio'
import { obtenerAccionesReales } from '@/services/stockApi'

import PortafolioCard from '@/components/portafolio/PortafolioCard.vue'
import MarketFilter from '@/components/ui/MarketFilter.vue'
import ActivoInfo from '@/components/portafolio/ActivoInfo.vue'

const authStore = useAuthStore()
const portfolioStore = usePortfolioStore()
const toast = inject('toast')

const activos = ref([])
const filterValue = ref('')
const loading = ref(true)

const activosFiltrados = computed(() => {
  if (!filterValue.value) return activos.value
  const term = filterValue.value.toLowerCase().trim()
  return activos.value.filter(a =>
    a.nombre.toLowerCase().includes(term) || 
    a.simbolo.toLowerCase().includes(term) ||
    a.sector?.toLowerCase().includes(term)
  )
})

const cargarDatos = async () => {
  loading.value = true
  try {
    activos.value = await obtenerAccionesReales()
  } finally {
    loading.value = false
  }
}

const comprarActivo = (activo) => {
  portfolioStore.comprarActivo(activo.nombre, 1, activo.precio)
  toast.value?.showToast(`¡Compraste ${activo.simbolo}!`, 'success')
}

const venderActivo = (activo) => {
  const exito = portfolioStore.venderActivo(activo.nombre, 1, activo.precio)
  if (exito) toast.value?.showToast(`¡Vendiste ${activo.simbolo}!`, 'success')
}

onMounted(() => {
  if (authStore.isAuthenticated) cargarDatos()
})
</script>

<template>
  <div class="space-y-6 flex flex-col h-[calc(100vh-115px)] overflow-hidden" data-test="portfolio-view">
    
    <!-- Filtro y Resumen Mobile -->
    <div class="shrink-0 space-y-4">
      <div class="lg:hidden" data-test="mobile-portfolio-card">
        <PortafolioCard />
      </div>
      <MarketFilter v-model="filterValue" data-test="portfolio-search" />
    </div>

    <div class="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
      <!-- Lista de Cards con scroll independiente -->
      <div class="flex-1 overflow-y-auto pr-2 custom-scroll" data-test="assets-grid">
        <div v-if="loading" class="flex justify-center p-12">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
          <ActivoInfo
            v-for="item in activosFiltrados"
            :key="item.id"
            :activo="item"
            data-test="asset-card"
            @comprar="comprarActivo"
            @vender="venderActivo"
          />
        </div>
      </div>

      <!-- Resumen Desktop Sticky -->
      <aside class="hidden lg:block w-80 shrink-0">
        <PortafolioCard data-test="desktop-portfolio-card" />
      </aside>
    </div>
  </div>
</template>

