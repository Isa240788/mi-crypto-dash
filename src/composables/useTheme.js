// src/composables/useTheme.js
import { ref, watch } from 'vue'

// 1. Definimos isDark FUERA de la función para que sea una única instancia (Singleton)
// Leemos el valor inicial de una vez para evitar parpadeos
const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = ref(savedTheme ? savedTheme === 'dark' : prefersDark)

// 2. Función para aplicar el tema al documento
const applyTheme = (dark) => {
  const theme = dark ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

// 3. Aplicamos el tema inmediatamente (esto corre al cargar el JS)
applyTheme(isDark.value)

export function useTheme() {
  // 4. Vigilamos el cambio global
  watch(isDark, (newValue) => {
    applyTheme(newValue)
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
