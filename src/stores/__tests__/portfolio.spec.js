import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePortfolioStore } from '../portfolio'

// Mock de localStorage para que no falle en el entorno de test
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString() },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('Portfolio Store', () => {
  beforeEach(() => {
    // Inicializamos Pinia en cada test
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('debe inicializarse con un portafolio vacío', () => {
    const store = usePortfolioStore()
    expect(store.portafolio).toEqual([])
  })

  it('debe agregar un activo nuevo al comprar', () => {
    const store = usePortfolioStore()
    
    store.comprarActivo('Apple', 2, 150)

    expect(store.portafolio).toHaveLength(1)
    expect(store.portafolio[0].nombre).toBe('Apple')
    expect(store.portafolio[0].cantidad).toBe(2)
    expect(store.portafolio[0].total).toBe(300)
  })

  it('debe registrar la transacción correctamente', () => {
    const store = usePortfolioStore()
    
    store.comprarActivo('Tesla', 1, 200)

    expect(store.transaccionesRecientes).toHaveLength(1)
    expect(store.transaccionesRecientes[0].tipo).toBe('compra')
    expect(store.transaccionesRecientes[0].activo).toBe('Tesla')
  })

  it('no debe permitir vender si no hay saldo suficiente', () => {
    const store = usePortfolioStore()
    
    // Intentamos vender sin haber comprado nada
    const resultado = store.venderActivo('Google', 1, 100)

    expect(resultado).toBe(false)
    expect(store.portafolio).toHaveLength(0)
  })
})
