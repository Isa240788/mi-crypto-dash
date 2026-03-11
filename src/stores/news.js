// src/stores/news.js 🥷
import { defineStore } from 'pinia'
import { fetchNews } from '@/services/newsApi'
import { db } from '@/services/firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export const useNewsStore = defineStore('news', {
  state: () => ({
    articulos: [],
    loading: false
  }),
  actions: {
    async cargarNoticias() {
      this.loading = true
      try {
        // 🕵️‍♀️ Simplemente llamamos a la función del servicio
        this.articulos = await fetchNews(10) 
      } catch (e) {
        console.error("Error al cargar noticias en el store:", e)
      } finally {
        this.loading = false
      }
    }
  }
})