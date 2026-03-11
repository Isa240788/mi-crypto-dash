import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ActivoRow from '@/components/dashboard/ActivoRow.vue'

describe('ActivoRow.vue - Test de Integración FinchTech Pro', () => {
  const activoMock = {
    id: 'AAPL',
    nombre: 'Apple Inc.',
    simbolo: 'AAPL',
    precio: 175.50,
    variacion: 2.5,
    sector: 'Tecnología'
  }

  it('debe renderizar el icono correcto según el sector', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
    // 💻 es el icono de Tecnología en tu ActivoRow.vue
    expect(wrapper.text()).toContain('💻')
  })

  it('debe mostrar las etiquetas de Precio y Tendencia con el casing correcto', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
    // ✅ CORRECCIÓN: Buscamos "Precio" y "Tendencia" tal cual aparecen en el código
    expect(wrapper.text()).toContain('Precio')
    expect(wrapper.text()).toContain('Tendencia')
    expect(wrapper.text()).toContain('175.5')
  })

  it('debe aplicar la clase text-success cuando la variación es positiva', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
    const tendencia = wrapper.find('.text-success')
    expect(tendencia.exists()).toBe(true)
    expect(tendencia.text()).toContain('▲')
  })

  it('el botón Invertir debe apuntar al nombre de ruta de portafolio', () => {
    const wrapper = mount(ActivoRow, {
      props: { activo: activoMock },
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props().to).toEqual({ name: 'portafolio' })
  })
})
