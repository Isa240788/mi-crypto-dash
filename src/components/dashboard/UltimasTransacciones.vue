<template>
  <!-- Cambiamos h-full por h-[300px] y quitamos la barra invertida del Dashboard -->
  <div class="card bg-base-100 shadow-sm border border-base-200 p-5 flex flex-col shrink-0 h-[380px]">
    
    <div class="flex justify-between items-center mb-4 shrink-0">
      <h2 class="font-black text-lg text-base-content/80">Actividad</h2>
      <span class="badge badge-ghost badge-xs opacity-50 uppercase font-bold">Reciente</span>
    </div>

    <!-- Skeletons -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 2" :key="i" class="h-16 bg-base-200 rounded-2xl animate-pulse"></div>
    </div>

    <!-- Lista de Transacciones: Aquí es donde vive el scroll interno -->
    <div v-else
      class="flex-1 overflow-y-auto space-y-3 scroll-smooth pr-1 custom-scroll"
    >
      <div 
        v-for="(t, index) in transacciones" 
        :key="index"
        class="p-3 rounded-2xl border border-base-200 bg-base-50/50 hover:bg-base-200 transition-colors group"
      >
        <div class="flex justify-between items-start mb-1">
          <span class="text-[10px] font-black uppercase tracking-widest" :class="t.tipo === 'compra' ? 'text-primary' : 'text-warning'">
            {{ t.tipo }}
          </span>
          <span class="font-mono font-bold text-sm text-base-content">
            ${{ Number(t.precio).toFixed(2) }}
          </span>
        </div>
        
        <div class="flex justify-between items-center text-[10px] font-bold opacity-30">
          <span class="uppercase tracking-tighter">{{ t.activo }}</span>
          <span>{{ t.cantidad }} u.</span>
        </div>
      </div>

      <!-- Mensaje Vacío -->
      <div v-if="!transacciones?.length" class="h-full flex flex-col items-center justify-center py-6 opacity-30">
        <span class="text-3xl mb-1">📜</span>
        <p class="text-[9px] font-black uppercase tracking-widest text-center">Sin movimientos</p>
      </div>
    </div>

  </div>
</template>

<script setup>
// Limpiamos el script: menos código, menos errores
const props = defineProps({
  transacciones: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
</style>

