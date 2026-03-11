<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center">
    
    <!-- 🎡 MARQUEE HÍBRIDO (Cintillo de noticias pro) -->
    <div class="w-full bg-neutral text-neutral-content py-2 overflow-hidden whitespace-nowrap border-b border-primary/20">
      <div class="inline-block animate-marquee hover:pause">
        <span class="mx-4 font-black text-[10px] uppercase tracking-widest text-primary">📈 Mercados:</span>
        <span v-for="s in marketTicker" :key="s.symbol" class="mx-4 font-bold text-xs">
          {{ s.symbol }} <span :class="s.change >= 0 ? 'text-success' : 'text-error'">${{ s.price }}</span>
        </span>
        <span class="mx-4 font-black text-[10px] uppercase tracking-widest text-accent">🌦️ Clima Chile:</span>
        <span v-for="c in weatherTicker" :key="c.name" class="mx-4 font-bold text-xs">
          {{ c.name }}: {{ c.temp }}°C
        </span>
      </div>
    </div>

    <div class="max-w-7xl w-full py-12 px-6">
      <!-- HERO SIMPLE -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-black text-base-content tracking-tighter mb-4">
          FinchTech <span class="text-primary italic">News</span>
        </h1>
        <p class="text-lg opacity-60 max-w-xl mx-auto font-medium">
          Tu portal de inteligencia financiera y noticias en tiempo real.
        </p>
      </div>

      <!-- 📰 SECCIÓN DE NOTICIAS (El Blog que pide el profe) -->
      <section class="mb-20">
        <div class="flex justify-between items-center mb-10 border-b border-base-300 pb-4">
          <h2 class="text-3xl font-black text-base-content tracking-tighter">🗞️ Última Hora</h2>
          <router-link to="/news" class="btn btn-ghost btn-sm text-primary font-black uppercase tracking-widest text-[10px]">Ver archivo ➜</router-link>
        </div>
        
        <div v-if="loadingNews" class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
           <div v-for="i in 3" :key="i" class="h-64 bg-base-300 rounded-[32px]"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="noticia in newsList" :key="noticia.id">
             <NewsCard :news="noticia" />
          </div>
        </div>
      </section>

      <!-- CTA FINAL (Botones arreglados) -->
      <div v-if="!isAuthenticated" class="bg-neutral p-12 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
        <div class="text-center md:text-left">
          <h3 class="text-3xl font-black text-white mb-2">Comienza a invertir hoy</h3>
          <p class="text-white/50 font-bold uppercase text-[10px] tracking-widest">Crea tu portafolio sin riesgos con datos reales</p>
        </div>
        <div class="flex gap-4">
          <router-link to="/login" class="btn btn-primary px-10 rounded-2xl font-black shadow-lg shadow-primary/20 border-none">Entrar</router-link>
          <router-link to="/register" class="btn bg-white/5 text-white hover:bg-white/10 px-10 rounded-2xl font-black border border-white/10">Registro</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNewsStore } from '@/stores/news'
import NewsCard from '@/components/news/NewsCard.vue'

const authStore = useAuthStore()
const newsStore = useNewsStore()
const loadingNews = ref(true)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const newsList = computed(() => newsStore.articulos.slice(0, 3))

// Tickers simulados pro
const marketTicker = [
  { symbol: 'BTC', price: '64,250', change: 2.4 },
  { symbol: 'AAPL', price: '185.3', change: 0.8 },
  { symbol: 'NVDA', price: '925.1', change: 5.2 }
]
const weatherTicker = [
  { name: 'STGO', temp: 24 },
  { name: 'VALPO', temp: 19 },
  { name: 'CONCE', temp: 17 }
]

onMounted(async () => {
  await newsStore.cargarNoticias()
  loadingNews.value = false
})
</script>

<style scoped>
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.animate-marquee { display: inline-block; animation: marquee 25s linear infinite; }
.hover\:pause:hover { animation-play-state: paused; }
</style>
