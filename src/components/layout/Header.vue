<template>
  <header class="w-full flex justify-between items-center px-6 py-6 lg:px-10 lg:py-8 
                 bg-base-100 shadow-sm border-b border-base-300 z-20 rounded-b-3xl">
    
    <!-- Lado Izquierdo: Saludo Dinámico -->
    <div class="flex flex-col gap-1">
      <h1 class="text-xl lg:text-3xl font-black text-base-content tracking-tight">
        Hola, <span class="text-primary capitalize">{{ userName }}</span>
        <span class="text-2xl">👋🏽</span> 
      </h1>

      <div class="flex items-center gap-2 text-[10px] lg:text-xs font-bold uppercase opacity-40">
        <span class="w-2 h-2 rounded-full bg-success" :class="{'animate-pulse': refrescando}"></span>
        <span>Última actualización: {{ ultimaActualizacion }}</span>
      </div>
    </div>

    <!-- Lado Derecho: Acciones -->
    <div class="flex items-center gap-4 lg:gap-6">
      
      <!-- Loader de actualización -->
      <div v-if="refrescando" class="hidden md:flex items-center gap-2 text-xs font-bold text-warning uppercase">
        <span class="loading loading-ring loading-xs"></span>
        Actualizando...
      </div>

      <!-- BOTÓN DE PERFIL -->
      <router-link 
        :to="{ name: 'profile' }" 
        class="btn btn-ghost btn-circle avatar border-4 border-white shadow-md hover:shadow-lg transition-all bg-base-100 hover:scale-105 overflow-hidden"
      >
        <div class="flex items-center justify-center w-full h-full">
          <img 
            v-if="authStore.userAvatar" 
            :src="authStore.userAvatar" 
            alt="Avatar" 
            class="w-full h-full object-cover" 
          />
          <span v-else class="text-xl">👋🏽</span> 
        </div>
      </router-link>

      <!-- BOTÓN SALIR (Ahora sí va a funcionar) -->
      <button 
        @click="handleLogout" 
        class="btn btn-sm lg:btn-md btn-ghost hover:bg-error/10 hover:text-error rounded-2xl gap-2 font-bold transition-all group px-4"
        title="Cerrar Sesión"
      >
        <span class="hidden lg:inline capitalize opacity-40 group-hover:opacity-100">
          Salir
        </span>
        <ArrowRightOnRectangleIcon class="w-5 h-5 opacity-40 group-hover:opacity-100" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

// 1. Primero definimos los props y los stores
const props = defineProps({
  ultimaActualizacion: { type: String, default: 'Recién' },
  refrescando: { type: Boolean, default: false },
})

const authStore = useAuthStore()
const router = useRouter()

// 2. Ahora sí podemos usar authStore en los computeds
const userAvatar = computed(() => authStore.userAvatar)
const userEmail = computed(() => authStore.userEmail || 'usuario@correo.com')

const userName = computed(() => {
  if (authStore.userName) return authStore.userName
  return userEmail.value.split('@')[0]
})

// 3. Función de Logout
const handleLogout = async () => {
  try {
    await authStore.logout()
    // Asegúrate de que el nombre de la ruta sea 'login' en tu router/index.js
    router.push({ name: 'login' }) 
  } catch (error) {
    console.error("Error al salir:", error)
  }
}
</script>

<style scoped>
.last-update {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
