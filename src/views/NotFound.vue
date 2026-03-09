<!-- src/views/NotFound.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="max-w-md w-full">
      <div class="card bg-base-100 shadow-2xl rounded-[40px] overflow-hidden border border-base-300">
        
        <!-- Ilustración / Icono con Estilo -->
        <div class="bg-neutral p-12 text-center relative overflow-hidden">
          <!-- Círculos de fondo decorativos -->
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
          <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-error/20 rounded-full blur-2xl"></div>
          
          <div class="relative z-10">
            <span class="text-8xl block mb-2 animate-bounce">📈</span>
            <h1 class="text-6xl font-black text-white tracking-tighter">404</h1>
          </div>
        </div>

        <div class="card-body p-10 text-center">
          <h2 class="text-2xl font-black text-base-content tracking-tight">
            ¿Te perdiste en el mercado?
          </h2>
          <p class="text-sm font-medium text-base-content/50 mt-2 mb-8">
            Parece que este activo no existe o la ruta está bloqueada por el protocolo de seguridad.
          </p>

          <div class="flex flex-col gap-3">
            <!-- Botón Principal: Volver al Dashboard -->
            <router-link 
              :to="{ name: 'dashboard' }" 
              class="btn btn-neutral btn-lg rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-neutral/20"
            >
              Volver al Terminal
            </router-link>

            <!-- Botón Secundario: Soporte o Login -->
            <router-link 
              :to="{ name: 'login' }" 
              class="btn btn-ghost btn-sm font-bold opacity-40 hover:opacity-100"
            >
              Ir al Inicio de Sesión
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Footer sutil -->
      <p class="text-center mt-8 text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
        FinchTech Security Layer v2.0
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Animación suave de entrada */
.card {
  animation: slideUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

