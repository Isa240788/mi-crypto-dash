<!-- src/components/ui/MarketFilter.vue -->

<template>
  <div class="mt-6 flex items-center w-full relative">

    <!-- icono -->
    <span class="absolute left-3 text-base-content/50">
      🔍
    </span>

    <!-- input -->
    <input
      type="text"
      placeholder="Buscar activo..."
      class="input input-bordered w-full pl-10 pr-10"
      v-model="filter"
      aria-label="Filtrar activos"
    />

    <!-- botón limpiar -->
    <button
      v-if="showClear"
      @click="clearFilter"
      class="absolute right-2 btn btn-ghost btn-sm p-1 rounded-full"
      aria-label="Limpiar filtro"
    >
      ✕
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const filter = computed({
  get: () => props.modelValue || '',
  set: (val) => emit('update:modelValue', val)
})

const showClear = computed(() => filter.value.length > 0)

const clearFilter = () => {
  filter.value = ''
}
</script>