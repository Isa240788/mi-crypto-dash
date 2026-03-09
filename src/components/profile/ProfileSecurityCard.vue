<!-- <template>
  <div class="card bg-base-100 shadow-md p-6">
    <h3 class="text-xl font-bold mb-4">Seguridad</h3>

    <form @submit.prevent="cambiarPassword" class="flex flex-col gap-4">
      <div class="form-control">
        <label class="label"><span class="label-text">Nueva Contraseña</span></label>
        <input type="password" v-model="password" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Confirmar Contraseña</span></label>
        <input type="password" v-model="confirmPassword" class="input input-bordered" />
      </div>

      <button type="submit" class="btn btn-primary w-full">Cambiar Contraseña</button>
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = inject('toast')

const password = ref('')
const confirmPassword = ref('')

const cambiarPassword = async () => {
  if (!password.value || !confirmPassword.value) {
    toast.value.showToast('Debes completar ambos campos', 'error')
    return
  }
  if (password.value !== confirmPassword.value) {
    toast.value.showToast('Las contraseñas no coinciden', 'error')
    return
  }

  // Llamada al store de auth para cambiar contraseña
  const res = await authStore.updatePassword(password.value)
  if (res.success) {
    toast.value.showToast('Contraseña actualizada correctamente', 'success')
    password.value = ''
    confirmPassword.value = ''
  } else {
    toast.value.showToast(res.message || 'Error al actualizar la contraseña', 'error')
  }
}
</script> -->