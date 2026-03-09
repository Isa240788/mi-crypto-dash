<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
    <div class="w-full max-w-md">
      <div class="card shadow-2xl bg-base-100 rounded-3xl overflow-hidden border border-base-300">
        
        <!-- HEADER NEGRO (Igual al Login) -->
        <div class="bg-neutral p-8 text-center text-neutral-content">
          <h2 class="text-3xl font-black tracking-tight text-white">Únete a FinchTech</h2>
          <p class="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60 text-white/70">
            Crea tu cuenta de inversión
          </p>
        </div>

        <div class="card-body p-8">
          <!-- Alertas -->
          <div v-if="authStore.error" class="alert alert-error mb-6 shadow-sm rounded-2xl">
            <span class="text-[10px] font-bold">⚠️ {{ authStore.error }}</span>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-5">
            <!-- Email -->
            <div class="form-control">
              <label class="label text-[10px] font-black uppercase opacity-40 tracking-wider">Correo Electrónico</label>
              <input v-model="email" type="email" placeholder="tu@ejemplo.com" class="input input-bordered rounded-2xl focus:input-neutral h-12" required />
            </div>

            <!-- Password -->
            <div class="form-control">
              <label class="label text-[10px] font-black uppercase opacity-40 tracking-wider">Contraseña</label>
              <input v-model="password" type="password" placeholder="Mínimo 6 caracteres" class="input input-bordered rounded-2xl focus:input-neutral h-12" required />
            </div>

            <!-- Confirmar Password -->
            <div class="form-control">
              <label class="label text-[10px] font-black uppercase opacity-40 tracking-wider">Confirmar Contraseña</label>
              <input v-model="confirmPassword" type="password" placeholder="Repite tu contraseña" class="input input-bordered rounded-2xl focus:input-neutral h-12" required />
              <p v-if="password !== confirmPassword && confirmPassword" class="text-error text-[10px] mt-1 font-bold">⚠️ No coinciden</p>
            </div>

            <!-- Botón Registrar (NEGRO) -->
            <button type="submit" class="btn btn-neutral w-full rounded-2xl font-black uppercase tracking-widest mt-4 h-12 shadow-xl shadow-neutral/10" :disabled="authStore.loading || !passwordsMatch">
              <span v-if="authStore.loading" class="loading loading-spinner"></span>
              {{ authStore.loading ? 'Registrando...' : 'Comenzar ahora' }}
            </button>
          </form>

          <div class="divider my-8 text-[10px] uppercase font-bold opacity-20">¿Ya tienes cuenta?</div>
          <router-link :to="{ name: 'login' }" class="btn btn-ghost btn-block rounded-2xl text-xs font-bold opacity-60">Inicia Sesión</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const successMessage = ref('')

// Validar contraseñas de forma reactiva
const passwordsMatch = computed(() => {
  return password.value.length >= 6 && password.value === confirmPassword.value
})

const handleRegister = async () => {
  // Limpiamos errores previos antes de intentar
  authStore.error = null
  
  if (!passwordsMatch.value) {
    authStore.error = 'Revisa tus contraseñas'
    return
  }

  const result = await authStore.register(email.value, password.value)

  if (result?.success) {
    successMessage.value = '¡Bienvenida, mami! Redirigiendo...'
    // Redirigimos a la ruta protegida que definimos antes
    setTimeout(() => router.push('/default/dashboard'), 1500)
  }
}
</script>
