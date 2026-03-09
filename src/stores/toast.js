// src/stores/toast.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useToastStore = defineStore('toast', {
  state: () => ({
    show: false,
    message: '',
    type: 'success', // 'success' | 'error' | 'info'
  }),
  actions: {
    showToast(message, type = 'success', duration = 3000) {
      this.message = message
      this.type = type
      this.show = true

      setTimeout(() => {
        this.show = false
      }, duration)
    },
  },
})