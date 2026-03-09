<template>
  <div class="card bg-base-100 shadow-md p-6">
    <h3 class="text-xl font-bold mb-4">Preferencias</h3>

    <div class="flex flex-col gap-4">
      
      <div class="form-control">
        <label class="cursor-pointer label flex items-center justify-between">
          <span class="label-text">Notificaciones</span>
          <input type="checkbox" v-model="notificaciones" class="toggle toggle-success" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue'

const toast = inject('toast')

const notificaciones = ref(true)


watch(notificaciones, (val) => {
  toast.value.showToast(`Notificaciones ${val ? 'activadas' : 'desactivadas'}`, 'success')
})
</script>