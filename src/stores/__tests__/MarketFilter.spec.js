import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MarketFilter from '@/components/ui/MarketFilter.vue'

describe('MarketFilter.vue', () => {
  it('debe renderizar el input correctamente', () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: '' }
    })
    // Verificamos que exista el input
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('debe emitir el evento update:modelValue cuando el usuario escribe', async () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: '' }
    })

    const input = wrapper.find('input')
    // Simulamos que el usuario escribe "Apple"
    await input.setValue('Apple')

    // Verificamos que se haya emitido el evento para actualizar el v-model
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Apple'])
  })

  it('debe mostrar el placeholder correcto', () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: '' }
    })
    expect(wrapper.find('input').attributes('placeholder')).toContain('Buscar')
  })
})
