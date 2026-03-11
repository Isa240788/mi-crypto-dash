<script setup>
import { ref, computed, onMounted } from 'vue'
import Banner from '@/components/dashboard/BannerDinamico.vue'
import MarketFilter from '@/components/ui/MarketFilter.vue'
import ActivoRow from '@/components/dashboard/ActivoRow.vue'
import UltimasTransacciones from '@/components/dashboard/UltimasTransacciones.vue'
import ChartVariaciones from '@/components/dashboard/ChartVariaciones.vue'
import { obtenerAccionesReales } from '@/services/stockApi'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolioStore = usePortfolioStore()
const filterValue = ref('')
const activos = ref([])

onMounted(async () => {
  activos.value = await obtenerAccionesReales()
})

const activosFiltrados = computed(() => {
  if (!filterValue.value) return activos.value
  const term = filterValue.value.toLowerCase().trim()
  return activos.value.filter(a =>
    a.nombre?.toLowerCase().includes(term) ||
    a.simbolo?.toLowerCase().includes(term) ||
    a.sector?.toLowerCase().includes(term)
  )
})
</script>

<template>
  <div class="p-6 space-y-6 flex flex-col h-full overflow-hidden" data-test="dashboard-view">
    <Banner />

    <div class="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
      <main class="flex-1 flex flex-col min-h-0">
        <h3 class="text-xl font-bold mb-4 px-2 text-base-content/80">Mercados Disponibles</h3>
        
        <div class="flex flex-col flex-1 min-h-0">
          <MarketFilter class="mb-4 px-2" v-model="filterValue" />
          
          <div class="flex-1 overflow-y-auto pr-2 custom-scroll" style="max-height: 680px;"> 
            <ActivoRow 
              v-for="activo in activosFiltrados" 
              :key="activo.id" 
              :activo="activo"
              data-test="activo-item"
            />
          </div>
        </div>
      </main>

      <aside class="w-full lg:w-80 flex flex-col gap-6 h-full min-h-0">
        <UltimasTransacciones 
          :transacciones="portfolioStore.transaccionesRecientes || []" 
          :loading="portfolioStore.loading"
        />
        <ChartVariaciones />
      </aside>
    </div>
  </div>
</template>
