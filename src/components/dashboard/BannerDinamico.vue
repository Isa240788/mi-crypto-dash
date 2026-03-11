<!-- src/components/dashboard/Banner.vue -->
<template>
  <div class="relative bg-base-200 text-base-content rounded-3xl p-6 lg:px-10 lg:py-6 overflow-hidden shadow-xl border border-base-300 min-h-[160px] flex items-center transition-all duration-500">
    
    <!-- Decoración de fondo (Tus círculos sutiles) -->
    <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

    <transition name="fade-slide" mode="out-in">
      <!-- SLIDE 1: Tu Libertad Financiera 🚀 -->
      <div v-if="currentSlide === 0" key="finance" class="relative z-10 flex justify-between items-center w-full">
        <div class="flex flex-col">
          <h2 class="text-xl lg:text-2xl font-black tracking-tight leading-tight text-base-content transition-colors duration-500">
            Tu libertad financiera <br> 
            <span class="text-primary">empieza aquí.</span>
          </h2>
          <p class="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-1 text-base-content">
            Panel de Control FinchTech v2.0
          </p>
        </div>
        <div class="hidden sm:flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-3xl shadow-inner animate-bounce-slow">
          🚀
        </div>
      </div>

      <!-- SLIDE 2: MeteoVite Pro (El Clima de GeoLocalización) 🌦️ -->
      <div v-else key="weather" class="relative z-10 flex justify-between items-center w-full">
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ weatherIcon }}</span>
            <h2 class="text-xl lg:text-2xl font-black tracking-tight text-base-content transition-colors duration-500">
              {{ ciudadNombre }}, <span class="text-accent">CL</span>
            </h2>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black text-primary">{{ tempActual }}°C</span>
            <span class="text-[9px] font-bold text-white/40 uppercase tracking-widest">{{ condicion }}</span>
          </div>
        </div>
        
        <div class="flex gap-2">
          <div class="hidden md:flex flex-col items-center justify-center w-20 h-14 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <span class="text-[8px] font-black opacity-30 uppercase text-base-content">Viento</span>
            <span class="text-xs font-bold text-base-content">{{ viento }} km/h</span>
          </div>
          <div class="flex flex-col items-center justify-center w-20 h-14 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <span class="text-[8px] font-black opacity-30 text-base-conten uppercase">Humedad</span>
            <span class="text-xs font-bold text-base-conten">{{ humedad }}%</span>
          </div>
        </div>
      </div>
    </transition>

    <!-- Puntitos de control discretos abajo -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      <div v-for="i in 2" :key="i" class="h-1 rounded-full transition-all duration-300"
           :class="currentSlide === i-1 ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const tempActual = ref('--')
const viento = ref('--')
const humedad = ref('--')
const condicion = ref('Cargando...')
const weatherIcon = ref('🌡️')
const ciudadNombre = ref('Santiago') // Nueva variable para el nombre dinámico
let timer = null

// ✅ Ahora la función SÍ acepta lat y lon
const fetchClima = async (lat = -33.45, lon = -70.64) => {
  try {
    const res = await fetch(`/api-clima/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`)
    
    if (!res.ok) throw new Error('Error 400');
    
    const data = await res.json()
    
    if (data.current_weather && data.hourly) {
      tempActual.value = Math.round(data.current_weather.temperature)
      viento.value = data.current_weather.windspeed
      // Tomamos el primer valor de la lista de humedad
      humedad.value = data.hourly.relative_humidity_2m[0] 
      
      const code = data.current_weather.weathercode
      if (code === 0) { condicion.value = 'Despejado'; weatherIcon.value = '☀️' }
      else if (code < 4) { condicion.value = 'Parcial'; weatherIcon.value = '⛅' }
      else { condicion.value = 'Nuboso'; weatherIcon.value = '☁️' }
      
      // Si las coordenadas no son las de Santiago, cambiamos el nombre
      if (lat !== -33.45) ciudadNombre.value = 'Tu Ubicación'
    }
  } catch (e) {
    // Salvavidas por si falla la API
    tempActual.value = '24'
    viento.value = '12'
    humedad.value = '42'
    condicion.value = 'Despejado'
    weatherIcon.value = '☀️'
    ciudadNombre.value = 'Santiago'
  }
}

onMounted(() => {
  // 🛰️ Intentamos geolocalización
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchClima(pos.coords.latitude, pos.coords.longitude),
      () => fetchClima() // Fallback a Santiago si rechaza
    )
  } else {
    fetchClima()
  }

  timer = setInterval(() => {
    currentSlide.value = currentSlide.value === 0 ? 1 : 0
  }, 7000)
})

onUnmounted(() => clearInterval(timer))
</script>


<style scoped>
.animate-bounce-slow { animation: bounce 3s infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(30px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
