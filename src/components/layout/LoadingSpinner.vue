<!-- src/components/layout/LoadingSpinner.vue -->
<template>
  <!-- Contenedor centrado para spinner de carga -->
  <div class="flex flex-col items-center justify-center my-12">
    
    <!-- Spinner de DaisyUI -->
    <span class="loading loading-spinner loading-lg text-primary mb-4"></span>
    
    <!-- Texto opcional -->
    <p class="text-gray-600">
      <slot>Obteniendo datos...</slot> <!-- Por defecto "Obteniendo datos...", pero se puede sobrescribir -->
    </p>
    
  </div>
</template>