import { defineStore } from 'pinia'
import { auth } from '@/services/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'

import { sanitizeInput } from '@/utils/sanitize'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    userAvatar: localStorage.getItem('finch_avatar') || null, 
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => state.user?.email || '',
    userPhoto: (state) => state.user?.photoURL || state.userAvatar
  },

  actions: {
    // --- NUEVA ACCIÓN DE REGISTRO (La que faltaba) ---
    async register(email, password) {
      this.loading = true
      this.error = null
      try {
        const sanitizedEmail = sanitizeInput(email)
        const userCredential = await createUserWithEmailAndPassword(auth, sanitizedEmail, password)
        
        this.user = userCredential.user
        return { success: true, user: userCredential.user }
      } catch (err) {
        this.error = err.message
        console.error('Error en registro:', err)
        return { success: false, error: err.message }
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const sanitizedEmail = sanitizeInput(email)
        const userCredential = await signInWithEmailAndPassword(auth, sanitizedEmail, password)
        this.user = userCredential.user
        this.userAvatar = localStorage.getItem('finch_avatar')
        return { success: true, user: userCredential.user }
      } catch (err) {
        this.error = err.message
        return { success: false, error: err.message }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await signOut(auth)
        this.user = null
      } catch (err) {
        console.error('Error al cerrar sesión:', err)
      }
    },

    async setAvatar(photoDataUrl) {
      try {
        this.userAvatar = photoDataUrl
        localStorage.setItem('finch_avatar', photoDataUrl)
        if (this.user) {
          await updateProfile(auth.currentUser, { photoURL: photoDataUrl })
        }
        return { success: true }
      } catch (err) {
        console.error("Error guardando avatar:", err)
        return { success: false, error: err.message }
      }
    },

    initAuthListener() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        if (user?.photoURL) {
          this.userAvatar = user.photoURL
          localStorage.setItem('finch_avatar', user.photoURL)
        }
        this.loading = false
      })
    },

    listenToAuthChanges() {
      this.initAuthListener()
    }
  }
})
