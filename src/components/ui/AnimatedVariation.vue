<!-- src/components/ui/AnimatedVariation.vue -->
<template>
  <span 
    :class="[
      valor >= 0 ? 'text-success bg-success/10' : 'text-error bg-error/10',
      'px-2 py-0.5 rounded-lg font-black text-[10px] transition-all duration-500 ease-in-out inline-flex items-center gap-0.5'
    ]"
  >
    <!-- Icono de tendencia sutil -->
    <span>{{ valor >= 0 ? '▲' : '▼' }}</span>
    
    <!-- Valor formateado -->
    {{ Math.abs(valor).toFixed(1) }}%
  </span>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String], // Aceptamos ambos por si la API manda texto
    default: 0
  }
})

// Convertimos a número de forma segura
const parseValue = (v) => parseFloat(v) || 0
const valor = ref(parseValue(props.value))

watch(() => props.value, (newVal) => {
  valor.value = parseValue(newVal)
})
</script>
