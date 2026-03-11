// src/stores/toast.js 🍞
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    type: 'info', 
    show: false // 👈 Cambiamos 'visible' por 'show' para que el componente lo entienda
  }),
  actions: {
    showToast(msg, type = 'info') {
      this.message = msg
      this.type = type
      this.show = true // 👈 ¡Activamos el show!
      
      // Limpiamos después de 3 segundos
      setTimeout(() => { 
        this.show = false 
      }, 3000)
    }
  }
})
