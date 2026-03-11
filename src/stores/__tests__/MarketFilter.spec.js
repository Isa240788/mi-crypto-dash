import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MarketFilter from '@/components/ui/MarketFilter.vue'

describe('MarketFilter.vue - Unit Test de UI', () => {
  
  it('debe renderizar el input con el placeholder correcto', () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Buscar activo...')
  })

  it('debe emitir el evento update:modelValue cuando el usuario escribe', async () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: '' }
    })

    const input = wrapper.find('input')
    // Simulamos que el usuario escribe "Nvidia"
    await input.setValue('Nvidia')

    // Verificamos la emisión del v-model (Módulo 7/8 Core)
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Nvidia'])
  })

  it('debe mostrar el botón de limpiar solo cuando hay texto', async () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: '' }
    })
    
    // 1. Inicialmente no debe haber botón X
    expect(wrapper.find('button').exists()).toBe(false)

    // 2. Al escribir, debe aparecer
    await wrapper.setProps({ modelValue: 'Apple' })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('debe limpiar el contenido al hacer clic en el botón X', async () => {
    const wrapper = mount(MarketFilter, {
      props: { modelValue: 'Tesla' }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    // Verificamos que emita una cadena vacía para limpiar el filtro
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([''])
  })
})
