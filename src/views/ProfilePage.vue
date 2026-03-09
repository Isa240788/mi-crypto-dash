<!-- src/views/ProfilePage.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-8" data-test="profile-view">
    
    <header class="text-left">
      <h2 class="text-3xl font-black text-base-content/80 tracking-tight">👤 Configuración</h2>
      <p class="text-base-content/50 font-medium">Actualiza tu información y preferencias</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Card principal con data-test para probar el upload -->
      <ProfileInfoCard data-test="profile-info-card" />
      
      <!-- Placeholder para futuras secciones (Seguridad, etc) -->
      <div class="card bg-base-100/50 border-2 border-dashed border-base-300 rounded-3xl flex items-center justify-center p-10 opacity-40">
        <p class="text-xs font-black uppercase tracking-widest text-center">
          Próximamente:<br>Seguridad y Notificaciones
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import ProfileInfoCard from '@/components/profile/ProfileInfoCard.vue'
</script>
