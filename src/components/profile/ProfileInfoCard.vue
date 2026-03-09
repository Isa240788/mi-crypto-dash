<!-- src/components/profile/ProfileInfoCard.vue -->
<template>
  <div class="card bg-base-100 shadow-sm border border-base-200 rounded-3xl p-8 h-full">
    
    <!-- Encabezado del Perfil -->
    <div class="flex flex-col items-center mb-8">
      <div class="relative group">
        <!-- Avatar Circular con Borde Blanco (Igual que el Header) -->
        <div class="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-xl bg-base-200 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
          <img
            v-if="avatarPreview || authStore.userAvatar"
            :src="avatarPreview || authStore.userAvatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-5xl lg:text-6xl">👋🏽</span>
        </div>

        <!-- Botón Flotante para Editar -->
        <label class="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm shadow-lg cursor-pointer border-2 border-white">
          <span class="text-xs">📸</span>
          <input type="file" class="hidden" @change="previewAvatar" accept="image/*" />
        </label>
      </div>

      <h3 class="mt-4 text-2xl font-black text-base-content">{{ userName }}</h3>
      <p class="text-sm font-bold opacity-30 uppercase tracking-widest">Inversor FinchTech</p>
    </div>

    <!-- Campos de Información Estilo "Pastilla" -->
    <div class="space-y-4">
      <div class="bg-base-200/50 p-4 rounded-2xl flex flex-col">
        <span class="text-[10px] font-black uppercase opacity-30 tracking-wider">Correo Electrónico</span>
        <span class="font-bold text-base-content/80">{{ authStore.userEmail || 'Invitado' }}</span>
      </div>

      <div class="bg-base-200/50 p-4 rounded-2xl flex flex-col">
        <span class="text-[10px] font-black uppercase opacity-30 tracking-wider">Nombre de Usuario</span>
        <span class="font-bold text-base-content/80">{{ authStore.userName || 'No definido' }}</span>
      </div>
    </div>

    <!-- Footer decorativo -->
    <div class="mt-8 pt-6 border-t border-dashed border-base-300 text-center">
      <p class="text-[10px] font-bold opacity-40 uppercase">Miembro desde Marzo 2024</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = inject('toast') // Inyectamos el toast global del layout

const avatarPreview = ref(null)

const userName = computed(() => {
  return authStore.userName || authStore.userEmail?.split('@')[0] || 'Inversor'
})

const previewAvatar = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    toast.value?.showToast('Por favor, sube una imagen válida', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target.result
    authStore.setAvatar(e.target.result) // Guardamos en Pinia/LocalStorage
    
    // Usamos nuestro Toast Global
    toast.value?.showToast('¡Avatar actualizado!', 'success')
  }
  reader.readAsDataURL(file)
}
</script>
