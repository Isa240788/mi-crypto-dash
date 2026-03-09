<!-- src/views/HomePage.vue -->
<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center py-12 px-4">
    <div class="max-w-5xl w-full text-center">
      <h1 class="text-5xl font-extrabold text-base-content mb-4">📈 Simulador Bursátil</h1>
      <p class="text-lg text-base-content/70 mb-8">
        Bienvenido al simulador de inversiones. Practica tus estrategias de trading sin riesgo,
        con datos en tiempo real.
      </p>

      <!-- Cards informativas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card bg-base-100 shadow-lg p-6 border-l-4 border-primary hover:shadow-xl transition">
          <h5 class="text-xl font-semibold mb-2 text-base-content">📊 Datos Reales</h5>
          <p>Accede a información de activos financieros actualizada en tiempo real.</p>
        </div>

        <div class="card bg-base-100 shadow-lg p-6 border-l-4 border-secondary hover:shadow-xl transition">
          <h5 class="text-xl font-semibold mb-2 text-base-content">🔐 Seguro</h5>
          <p>Tu información está protegida con autenticación de Firebase y prácticas seguras.</p>
        </div>

        <div class="card bg-base-100 shadow-lg p-6 border-l-4 border-accent hover:shadow-xl transition">
          <h5 class="text-xl font-semibold mb-2 text-base-content">🎯 Sin Riesgo</h5>
          <p>Practica con dinero virtual antes de invertir dinero real.</p>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link
          :to="{ name: 'login' }"
          class="btn btn-primary btn-lg w-full sm:w-auto"
        >
          Iniciar Sesión
        </router-link>

        <router-link
          :to="{ name: 'register' }"
          class="btn btn-accent btn-lg w-full sm:w-auto"
        >
          Registrarse
        </router-link>
      </div>
    </div>
  </div>
</template>
