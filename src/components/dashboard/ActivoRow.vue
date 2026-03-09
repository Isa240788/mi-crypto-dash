<!-- src/components/dashboard/ActivoRow.vue -->
<template>
  <!-- La "pastilla" flotante -->
  <div class="flex items-center justify-between p-4 mb-4 bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-all border border-base-200 group">
    
    <!-- Lado Izquierdo: Icono y Nombre -->
    <div class="flex items-center gap-4 w-1/3">
      <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        {{ getIcon(activo.sector) }}
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-lg text-base-content">{{ activo.nombre }}</span>
        <span class="text-xs opacity-40 font-mono uppercase tracking-wider">{{ activo.simbolo }}</span>
      </div>
    </div>

    <!-- Centro: Precio y Variación (Estilo Estadísticas) -->
    <div class="flex items-center gap-10 w-1/3 justify-center">
      <div class="text-center">
        <span class="text-[10px] uppercase font-black opacity-20 block">Precio</span>
        <span class="font-bold text-base-content">${{ activo.precio }}</span>
      </div>
      <div class="text-center">
        <span class="text-[10px] uppercase font-black opacity-20 block">Tendencia</span>
        <span :class="activo.variacion >= 0 ? 'text-success' : 'text-error'" class="font-bold text-sm">
          {{ activo.variacion >= 0 ? '▲' : '▼' }} {{ Math.abs(activo.variacion) }}%
        </span>
      </div>
    </div>

    <!-- Lado Derecho: Botón de Acción Directa -->
    <div class="w-1/3 flex justify-end">
      <router-link 
        :to="{ name: 'portafolio' }" 
        class="btn btn-md bg-neutral text-neutral-content hover:bg-primary border-none rounded-xl px-10 capitalize shadow-lg shadow-neutral/10"
      >
        Invertir
      </router-link>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  activo: { type: Object, required: true }
})

const getIcon = (sector) => {
  const icons = {
    'Tecnología': '💻',
    'Finanzas': '🏦',
    'Salud': '🏥',
    'Energía': '⚡',
    'Automotriz': '🚗'
  }
  return icons[sector] || '📈'
}
</script>

