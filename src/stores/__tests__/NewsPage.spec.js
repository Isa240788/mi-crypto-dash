import { mount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import NewsPage from '@/views/NewsPage.vue'
import { useNewsStore } from '@/stores/news'
import { useAuthStore } from '@/stores/auth'

// 1. Mockeamos los stores para controlar el comportamiento del test
vi.mock('@/stores/news')
vi.mock('@/stores/auth')

describe('Integración: NewsPage.vue (FinchTech Journal)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('debe mostrar el loader infinito mientras newsStore.loading es true', () => {
    useNewsStore.mockReturnValue({
      loading: true,
      articulos: [],
      cargarNoticias: vi.fn()
    })
    useAuthStore.mockReturnValue({ isAuthenticated: false })

    const wrapper = mount(NewsPage, {
      global: { 
        stubs: { 
          'router-link': RouterLinkStub,
          'NewsCard': true 
        } 
      }
    })

    expect(wrapper.find('.loading-infinity').exists()).toBe(true)
  })

  it('debe renderizar la lista de noticias cuando termina de cargar', () => {
    const mockArticulos = [
      { id: '1', title: 'Noticia 1' },
      { id: '2', title: 'Noticia 2' }
    ]
    useNewsStore.mockReturnValue({
      loading: false,
      articulos: mockArticulos,
      cargarNoticias: vi.fn()
    })
    useAuthStore.mockReturnValue({ isAuthenticated: false })

    const wrapper = mount(NewsPage, {
      global: { 
        stubs: { 
          'router-link': RouterLinkStub,
          'NewsCard': true 
        } 
      }
    })

    expect(wrapper.find('.loading-infinity').exists()).toBe(false)
    // Verificamos que se creen las NewsCards (en este caso usamos el stub)
    const cards = wrapper.findAllComponents({ name: 'NewsCard' })
    expect(cards).toHaveLength(2)
  })

  it('debe mostrar el botón al Dashboard solo si el usuario está autenticado', () => {
    // Escenario A: Usuario Autenticado
    useNewsStore.mockReturnValue({ loading: false, articulos: [], cargarNoticias: vi.fn() })
    useAuthStore.mockReturnValue({ isAuthenticated: true })

    const wrapperAuth = mount(NewsPage, {
      global: { 
        stubs: { 
          'router-link': RouterLinkStub,
          'NewsCard': true 
        } 
      }
    })
    // Con RouterLinkStub, el texto "Ir a mi Panel" sí es visible para el test
    expect(wrapperAuth.text()).toContain('Ir a mi Panel')

    // Escenario B: Usuario Invitado (No Autenticado)
    useAuthStore.mockReturnValue({ isAuthenticated: false })
    const wrapperGuest = mount(NewsPage, {
      global: { 
        stubs: { 
          'router-link': RouterLinkStub,
          'NewsCard': true 
        } 
      }
    })
    expect(wrapperGuest.text()).not.toContain('Ir a mi Panel')
  })
})
