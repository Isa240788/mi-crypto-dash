<template>
  <!-- Cambiamos flex-1 por h-full en el contenedor principal para que herede el espacio del Aside -->
  <div class="card bg-base-100 p-5 shadow-sm border border-base-200 flex flex-col flex-1 min-h-[300px]">
    
    <div class="flex justify-between items-center mb-4 shrink-0">
      <h2 class="font-black text-xl text-base-content/80">Rendimiento</h2>
      <div class="flex gap-2">
        <span class="flex items-center gap-1 text-[10px] font-black uppercase opacity-50">
          <span class="w-2 h-2 rounded-full bg-primary"></span> Actual
        </span>
        <span class="flex items-center gap-1 text-[10px] font-black uppercase opacity-50">
          <span class="w-2 h-2 rounded-full bg-base-300"></span> Anterior
        </span>
      </div>
    </div>

    <!-- El secreto es este min-h-0 y flex-1 bien definidos -->
    <div class="flex-1 w-full min-h-0 relative">
      <apexchart 
        v-if="hasData" 
        :options="chartOptions" 
        :series="series" 
        type="area"
        height="100%"
        width="100%"
      />
      <div v-else class="h-full flex flex-col items-center justify-center opacity-20">
        <span class="loading loading-ring loading-lg mb-2"></span>
        <p class="text-[10px] font-black uppercase tracking-widest text-center">Sincronizando...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolioStore = usePortfolioStore()

const hasData = computed(() => {
  return portfolioStore.variacionesSemanales?.semanaActual?.length > 0
})

const series = computed(() => [
  { name: 'Semana Actual', data: portfolioStore.variacionesSemanales?.semanaActual || [] },
  { name: 'Semana Anterior', data: portfolioStore.variacionesSemanales?.semanaAnterior || [] }
])

const chartOptions = ref({
  chart: {
    type: 'area',
    toolbar: { show: false },
    sparkline: { enabled: false },
    zoom: { enabled: false },
    fontFamily: 'inherit',
    // Esto es clave para que responda bien al tamaño del contenedor
    redrawOnWindowResize: true 
  },
  colors: ['#570df8', '#cbd5e1'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } }
  },
  xaxis: {
    categories: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
  },
  yaxis: { show: false },
  tooltip: {
    theme: 'light',
    x: { show: false },
    y: { formatter: (val) => `$${val.toLocaleString()}` }
  },
  legend: { show: false }
})
</script>
