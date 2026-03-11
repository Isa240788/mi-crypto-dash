import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import Dashboard from '@/views/Dashboard.vue'
import ActivoRow from '@/components/dashboard/ActivoRow.vue'
import MarketFilter from '@/components/ui/MarketFilter.vue'

// 1. Simulamos la API (Mock)
vi.mock('@/services/stockApi', () => ({
  obtenerAccionesReales: vi.fn(() => Promise.resolve([
    { id: 'AAPL', nombre: 'Apple', simbolo: 'AAPL', sector: 'Tecnología', precio: 150, variacion: 2 },
    { id: 'TSLA', nombre: 'Tesla', simbolo: 'TSLA', sector: 'Automotriz', precio: 200, variacion: -1 }
  ]))
}))

describe('Integración Total: Dashboard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('debe filtrar la lista de activos en tiempo real al usar el buscador', async () => {
    // 2. Montamos el Dashboard
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          Banner: true,
          UltimasTransacciones: true,
          ChartVariaciones: true,
          'router-link': true
        }
      }
    })

    // 🕵️‍♀️ IMPORTANTE: Esperamos a que se resuelvan todas las promesas (API en onMounted)
    await flushPromises()

    // 3. Verificamos carga inicial usando tu data-test="activo-item"
    const itemsIniciales = wrapper.findAll('[data-test="activo-item"]')
    expect(itemsIniciales).toHaveLength(2)

    // 4. Buscamos el componente MarketFilter y simulamos que escribes "Tesla"
    const filter = wrapper.findComponent(MarketFilter)
    await filter.vm.$emit('update:modelValue', 'Tesla')
    
    // Esperamos el siguiente ciclo de Vue para que el computed 'activosFiltrados' reaccione
    await nextTick()

    // 5. ¡LA PRUEBA DE FUEGO!
    const itemsFiltrados = wrapper.findAll('[data-test="activo-item"]')
    expect(itemsFiltrados).toHaveLength(1)
    expect(itemsFiltrados[0].text()).toContain('Tesla')
    expect(itemsFiltrados[0].text()).not.toContain('Apple')
  })
})
