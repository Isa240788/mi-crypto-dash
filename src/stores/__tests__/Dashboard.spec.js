import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Dashboard from '@/views/Dashboard.vue'
import { obtenerAccionesReales } from '@/services/stockApi'

// Simulamos la API para que el test sea rápido y controlado
vi.mock('@/services/stockApi', () => ({
  obtenerAccionesReales: vi.fn(() => [
    { id: '1', nombre: 'Apple', simbolo: 'AAPL', sector: 'Tecnología', precio: 150, variacion: 2 },
    { id: '2', nombre: 'Tesla', simbolo: 'TSLA', sector: 'Automotriz', precio: 200, variacion: -1 }
  ])
}))

describe('Integración: Dashboard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe filtrar la lista de activos cuando el usuario usa el buscador', async () => {
    // 1. Montamos el Dashboard completo (Integración de componentes)
    const wrapper = mount(Dashboard, {
      global: {
        stubs: ['Banner', 'UltimasTransacciones', 'ChartVariaciones', 'router-link']
      }
    })

    // Esperamos a que la API cargue los datos en el onMounted
    await vi.dynamicImportSettled() 

    // 2. Verificamos que inicialmente hay 2 activos
    expect(wrapper.findAllComponents({ name: 'ActivoRow' })).toHaveLength(2)

    // 3. Simulamos que el usuario escribe "Tesla" en el buscador
    // Buscamos el componente MarketFilter y emitimos el cambio
    const filter = wrapper.findComponent({ name: 'MarketFilter' })
    await filter.vm.$emit('update:modelValue', 'Tesla')

    // 4. ¡LA PRUEBA DE FUEGO! 
    // ¿La integración entre el Filtro y la Lista funcionó?
    const filas = wrapper.findAllComponents({ name: 'ActivoRow' })
    expect(filas).toHaveLength(1)
    expect(filas[0].text()).toContain('Tesla')
  })
})
