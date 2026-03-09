<!-- src/components/portafolio/ActivoInfo.vue -->
<template>
  <div :class="wrapperClass" class="hover:shadow-md transition-shadow duration-300">
    <div v-if="activo?.nombre">
      <!-- Cabecera -->
      <div class="flex justify-between items-start mb-2">
        <div class="flex flex-col">
          <h5 class="font-black text-lg leading-tight text-base-content">{{ activo.nombre }}</h5>
          <span :class="sectorBadgeClass(activo.sector)" class="badge badge-xs mt-1 uppercase font-bold tracking-tighter">
            {{ activo.sector }}
          </span>
        </div>
        <span v-if="activo.simbolo" class="badge badge-outline font-mono text-xs opacity-50">{{ activo.simbolo }}</span>
      </div>

      <!-- Cuerpo: Solo el Precio Centrado -->
      <div class="my-4 py-4 bg-base-200/50 rounded-2xl text-center">
        <small class="text-[10px] uppercase font-black opacity-30 block mb-1">Precio Actual</small>
        <strong class="text-2xl font-black text-base-content">${{ formatPrice(activo.precio) }}</strong>
      </div>

      <!-- Acciones -->
      <div class="flex gap-2 mt-4">
        <button @click="handleComprar" class="btn btn-success btn-sm flex-1 rounded-xl font-bold capitalize">
          Comprar
        </button>
        <button @click="handleVender" class="btn btn-outline btn-warning btn-sm flex-1 rounded-xl font-bold capitalize">
          Vender
        </button>
      </div>
    </div>

    <!-- Fallback de carga -->
    <div v-else class="animate-pulse space-y-4">
      <div class="h-4 bg-base-300 rounded w-3/4"></div>
      <div class="h-16 bg-base-200 rounded-2xl"></div>
      <div class="flex gap-2">
        <div class="h-8 bg-base-300 rounded-xl flex-1"></div>
        <div class="h-8 bg-base-300 rounded-xl flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sectorBadgeClass } from '@/services/stockApi'

const props = defineProps({
  activo: { type: Object, default: () => ({}) },
  wrapperClass: { type: String, default: 'card bg-base-100 shadow-sm border border-base-200 p-5' }
})

const emit = defineEmits(['comprar', 'vender'])

const handleComprar = () => emit('comprar', props.activo)
const handleVender = () => emit('vender', props.activo)

const formatPrice = (val) => {
  const price = Number(val) || 0
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
