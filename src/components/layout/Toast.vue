<!-- src/components/layout/Toast.vue  -->
<template>
  <!-- Quitamos las barras invertidas \ que rompen el estilo -->
  <div class="toast toast-top toast-end z-50 p-4">
    <transition name="toast-fade">
      <div 
        v-if="toastStore.show" 
        :class="['alert shadow-2xl border-none rounded-2xl min-w-[280px] flex-row', alertClass]"
      >
        <div class="flex items-center gap-3 w-full">
          <span class="text-2xl">{{ iconType }}</span>
          
          <div class="flex flex-col text-left">
            <span class="text-[10px] font-black uppercase opacity-50 tracking-widest leading-none mb-1">
              {{ toastStore.type }}
            </span>
            <span class="text-sm font-bold leading-tight">{{ toastStore.message }}</span>
          </div>

          <button @click="toastStore.show = false" class="btn btn-ghost btn-xs btn-circle ml-auto opacity-40 hover:opacity-100">
            ✕
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const alertClass = computed(() => {
  switch (toastStore.type) {
    case 'success': return 'bg-success text-success-content'
    case 'error':   return 'bg-error text-error-content'
    case 'warning': return 'bg-warning text-warning-content'
    default:        return 'bg-neutral text-neutral-content font-white'
  }
})

const iconType = computed(() => {
  switch (toastStore.type) {
    case 'success': return '✅'
    case 'error':   return '🚫'
    case 'warning': return '⚠️'
    default:        return '🔔'
  }
})
</script>

<style scoped>
.toast-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-fade-leave-active {
  transition: all 0.3s ease-in;
}
.toast-fade-enter-from {
  transform: translateX(100%) scale(0.5);
  opacity: 0;
}
.toast-fade-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
