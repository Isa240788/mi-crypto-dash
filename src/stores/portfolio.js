import { defineStore } from 'pinia'
import { useToastStore } from './toast'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => {
    // 1. Intentamos recuperar los datos guardados al iniciar el store
    const savedData = JSON.parse(localStorage.getItem('portfolio')) || {}
    
    return {
      // Cargamos lo guardado o dejamos un array vacío
      portafolio: savedData.portafolio || [],
      transaccionesRecientes: savedData.transaccionesRecientes || [],
      loading: false,
      // 2. Agregamos esto para que el gráfico NO se vea vacío
      variacionesSemanales: {
        semanaActual: [30, 40, 35, 50, 49, 60],
        semanaAnterior: [20, 30, 45, 30, 35, 40]
      }
    }
  },

  getters: {
    // Helper para saber si ya tenemos un activo
    tieneActivoEnPortafolio: (state) => (nombre) => {
      return state.portafolio.some(i => i.nombre === nombre)
    }
  },

  actions: {
    showToast(message, type = 'success') {
      const toast = useToastStore()
      toast.showToast(message, type)
    },

    comprarActivo(nombre, cantidad, precio) {
      const existente = this.portafolio.find(i => i.nombre === nombre)
      if (existente) {
        existente.cantidad += cantidad
        existente.total = existente.cantidad * precio
      } else {
        this.portafolio.push({ nombre, cantidad, total: cantidad * precio })
      }
      this.registrarTransaccion('compra', nombre, cantidad, precio)
      this.saveToLocalStorage()
      this.showToast(`¡Compraste ${cantidad} acción(es) de ${nombre}!`, 'success')
    },

    venderActivo(nombre, cantidad, precio) {
      const activo = this.portafolio.find(i => i.nombre === nombre)
      if (!activo || activo.cantidad < cantidad) {
        this.showToast(`No tienes suficientes acciones de ${nombre}`, 'error')
        return false
      }
      activo.cantidad -= cantidad
      activo.total = activo.cantidad * precio
      
      if (activo.cantidad === 0) {
        this.portafolio = this.portafolio.filter(a => a.nombre !== nombre)
      }
      
      this.registrarTransaccion('venta', nombre, cantidad, precio)
      this.saveToLocalStorage()
      this.showToast(`¡Vendiste ${cantidad} acción(es) de ${nombre}!`, 'success')
      return true
    },

    registrarTransaccion(tipo, nombre, cantidad, precio) {
      this.transaccionesRecientes.unshift({
        tipo,
        activo: nombre,
        cantidad,
        precio,
        fecha: new Date().toLocaleString()
      })
      if (this.transaccionesRecientes.length > 10) this.transaccionesRecientes.pop()
    },

    // Función auxiliar para no repetir código de guardado
    saveToLocalStorage() {
      localStorage.setItem('portfolio', JSON.stringify({
        portafolio: this.portafolio,
        transaccionesRecientes: this.transaccionesRecientes
      }))
    }
  }
})
