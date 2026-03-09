<!-- src/components/portafolio/PortafolioCard.vue -->
<template>
  <!-- 1. Agregamos flex-col y una altura máxima para que aparezca el scroll -->
  <div class="card bg-base-100 rounded-3xl shadow-sm border border-base-200 p-6 flex flex-col h-full max-h\[600px]">
    
    <!-- Título con Icono (Le ponemos shrink-0 para que no se aplaste) -->
    <div class="flex items-center gap-3 mb-6 shrink-0">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
        💰
      </div>
      <h3 class="text-xl font-black text-base-content/80 tracking-tight">Mi Cartera</h3>
    </div>

    <!-- 2. Contenedor de la lista con flex-1 y overflow-y-auto -->
    <div class="flex-1 overflow-y-auto pr-2 custom-scroll">
      <!-- Estado Vacío -->
      <div v-if="portafolioFiltrado.length === 0" class="flex flex-col items-center py-10 opacity-30">
        <span class="text-4xl mb-2">🏜️</span>
        <p class="text-xs font-bold uppercase text-center">Tu cartera está vacía.<br>¡Es hora de invertir!</p>
      </div>

      <!-- Lista de Activos -->
      <ul v-else class="space-y-4">
        <li
          v-for="item in portafolioFiltrado"
          :key="item.nombre"
          class="flex justify-between items-center group"
        >
          <div class="flex flex-col">
            <span class="font-bold text-base-content group-hover:text-primary transition-colors">
              {{ item.nombre }}
            </span>
            <span class="text-[10px] font-black uppercase opacity-40 tracking-widest">
              {{ item.cantidad }} Acciones
            </span>
          </div>

          <div class="text-right">
            <span class="font-mono font-bold text-base-content">${{ formatPrice(item.total) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 3. Sección del Total (Fija abajo con shrink-0) -->
    <div class="shrink-0 mt-4">
      <div class="my-4 border-t border-dashed border-base-300"></div>
      <div class="bg-neutral text-neutral-content rounded-2xl p-4 flex justify-between items-center shadow-lg shadow-neutral/20">
        <div class="flex flex-col">
          <span class="text-[10px] font-black uppercase opacity-40">Valor Total</span>
          <span class="text-[9px] font-bold text-success uppercase">Balance Activo</span>
        </div>
        <span class="text-xl font-black">
          ${{ formatPrice(totalPortafolio) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scroll finito para que se vea elegante */
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
</style>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolioStore = usePortfolioStore()

const portafolioFiltrado = computed(() =>
  portfolioStore.portafolio.filter(item => item.cantidad > 0)
)

const totalPortafolio = computed(() =>
  portafolioFiltrado.value.reduce((acc, item) => acc + (item.total || 0), 0)
)

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(price)
</script>
