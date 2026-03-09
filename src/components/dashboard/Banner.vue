<!-- src/components/dashboard/Banner.vue -->
<template>
  <div class="relative bg-neutral rounded-3xl p-6 lg:px-10 lg:py-6 overflow-hidden shadow-xl border border-white/5 shrink-0 h-[140px] flex items-center">
    
    <!-- Decoración de fondo (Círculos sutiles) -->
    <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
    <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

    <div class="relative z-10 flex justify-between items-center w-full">
      <div class="flex flex-col">
        <h2 class="text-xl lg:text-2xl font-black text-white tracking-tight leading-tight">
          Tu libertad financiera <br> 
          <span class="text-primary">empieza aquí.</span>
        </h2>
        <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mt-1">
          Panel de Control FinchTech v2.0
        </p>
      </div>

      <!-- Icono o Ilustración pequeña a la derecha -->
      <div class="hidden sm:flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-3xl shadow-inner">
        🚀
      </div>
    </div>
  </div>
</template>



<script setup>
import { useRouter } from 'vue-router'

// Props para hacerlo reutilizable
const props = defineProps({
  titulo: { type: String, default: 'Join the largest crypto exchange' },
  subtitulo: { type: String, default: 'Buy & sell Crypto in minutes' },
  textoBoton: { type: String, default: 'Buy now' },
  ruta: { type: Object, default: () => ({ name: 'portafolio' }) },
})

const router = useRouter()

const irALaRuta = () => {
  router.push(props.ruta)
}
</script>