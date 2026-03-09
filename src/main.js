// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ThemeSwitch from '@/components/ui/ThemeSwitch.vue'
import '/src/style.css'
import VueApexCharts from 'vue3-apexcharts'
import Toast from '@/components/layout/Toast.vue'

// 💡 INICIALIZACIÓN INSTANTÁNEA DEL TEMA (Evita el flash blanco)
const savedTheme = localStorage.getItem('theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)
if (savedTheme === 'dark') document.documentElement.classList.add('dark')

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueApexCharts)

// Componentes globales
app.component('ThemeSwitch', ThemeSwitch)
app.component('Toast', Toast)

app.mount('#app')
