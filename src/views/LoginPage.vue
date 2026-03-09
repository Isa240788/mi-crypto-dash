<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Card con bordes redondeados 3xl para que combine con el Dashboard -->
      <div class="card shadow-2xl bg-base-100 rounded-3xl overflow-hidden border border-base-300">
        
        <!-- Header con el estilo del Dashboard -->
        <div class="bg-neutral p-8 text-center text-neutral-content">
          <h2 class="text-3xl font-black tracking-tight">Bienvenido</h2>
          <p class="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">
            Panel de Inversiones FinchTech
          </p>
        </div>

        <div class="card-body p-8">
          <!-- Alerta de Error de Firebase mejorada -->
          <div v-if="authStore.error" class="alert alert-error mb-6 shadow-sm rounded-2xl flex gap-2">
            <span class="text-[10px] font-bold">⚠️ {{ authStore.error }}</span>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div class="form-control w-full">
              <label class="label text-[10px] font-black uppercase opacity-40 tracking-wider">
                Correo Electrónico
              </label>
              <input
                id="loginEmail"
                v-model="email"
                type="email"
                placeholder="usuario@finchtech.com"
                class="input input-bordered rounded-2xl focus:input-primary h-12"
                required
              />
            </div>

            <!-- Password -->
            <div class="form-control w-full">
              <div class="flex justify-between items-center mb-1">
                <label class="label text-[10px] font-black uppercase opacity-40 tracking-wider">
                  Contraseña
                </label>
                <a href="#" class="text-[10px] font-bold text-primary uppercase opacity-60 hover:opacity-100">
                  ¿Olvidaste tu clave?
                </a>
              </div>
              <input
                id="loginPassword"
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="input input-bordered rounded-2xl focus:input-primary h-12"
                required
              />
            </div>

            <!-- Botón de Entrar -->
            <button
              type="submit"
              class="btn btn-neutral w-full rounded-2xl font-black uppercase tracking-widest mt-4 h-12 shadow-xl shadow-neutral/10"
              :disabled="authStore.loading"
            >
              <span v-if="authStore.loading" class="loading loading-spinner"></span>
              {{ authStore.loading ? 'Verificando...' : 'Acceder' }}
            </button>
          </form>

          <div class="divider my-8 text-[10px] uppercase font-bold opacity-20">¿Nuevo por aquí?</div>

          <router-link 
            :to="{ name: 'register' }" 
            class="btn btn-ghost btn-block rounded-2xl text-xs font-bold opacity-60 hover:opacity-100"
          >
            Regístrate aquí
          </router-link>
        </div>
      </div>
      
      <!-- Footer decorativo -->
      <p class="text-center mt-8 text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
        © 2024 FinchTech Security Protocol
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  // Limpiamos errores previos
  authStore.error = null

  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    // Redirección a la ruta maestra del Dashboard
    router.push('/default/dashboard')
  } else {
    // Si falla, limpiamos la clave para seguridad
    password.value = ''
  }
}
</script>
