<template>
  <div class="min-h-screen bg-base-200 py-12 px-6">
    <div class="max-w-7xl mx-auto">

      <!-- 🧭 NAVEGACIÓN DE ALTO NIVEL (Solo Dashboard) -->
      <div v-if="authStore.isAuthenticated" class="flex justify-end mb-6">
        <router-link 
          to="/default/dashboard" 
          class="btn btn-neutral btn-sm gap-2 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-neutral/20 border-none group"
        >
          Ir a mi Panel 📊
          <span class="group-hover:translate-x-1 transition-transform">➜</span>
        </router-link>
      </div>

      <header class="mb-12 border-b border-base-300 pb-8">
        <h2 class="text-5xl font-black text-base-content tracking-tighter italic">
          FinchTech <span class="text-primary">Journal</span>
        </h2>
        <p class="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-2">Noticias del Mercado en tiempo real</p>
      </header>

      <!-- Aquí se verán tus noticias del Cobre y NVIDIA -->
      <div v-if="newsStore.loading" class="flex justify-center py-20">
        <span class="loading loading-infinity loading-lg text-primary"></span>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="item in newsStore.articulos" :key="item.id">
          <NewsCard :news="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import { useAuthStore } from '@/stores/auth'
import NewsCard from '@/components/news/NewsCard.vue'

const newsStore = useNewsStore()
const authStore = useAuthStore() 

onMounted(() => newsStore.cargarNoticias())
</script>
