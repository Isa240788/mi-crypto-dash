import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ActivoRow from '@/components/dashboard/ActivoRow.vue'

describe('ActivoRow.vue', () => {
  // 1. Preparamos un activo de prueba
  const activoMock = {
    id: 'AAPL',
    nombre: 'Apple Inc.',
    simbolo: 'AAPL',
    precio: 175.50,
    variacion: 2.5,
    sector: 'Tecnología'
  }

  it('debe mostrar el nombre y el precio correctamente', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: {
        stubs: { 'router-link': RouterLinkStub } // Simula el router-link
      }
    })

    expect(wrapper.text()).toContain('Apple Inc.')
    expect(wrapper.text()).toContain('175.5')
  })

  it('debe aplicar la clase text-success si la variación es positiva', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: { stubs: { 'router-link': RouterLinkStub } }
    })

    const tendencia = wrapper.find('.text-success')
    expect(tendencia.exists()).toBe(true)
    expect(tendencia.text()).toContain('▲')
  })

  it('el botón Invertir debe apuntar a la ruta de portafolio', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: { stubs: { 'router-link': RouterLinkStub } }
    })

    const link = wrapper.findComponent(RouterLinkStub)
    // Verificamos que el "to" del router-link sea el correcto
    expect(link.props().to).toEqual({ name: 'portafolio' })
  })
})
