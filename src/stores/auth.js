import { defineStore } from 'pinia'
import { auth } from '@/services/firebase'
import { useToastStore } from './toast'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'

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
    async register(email, password) {
      this.loading = true
      this.error = null
      const toast = useToastStore()

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        toast.showToast('¡Bienvenida a FinchTech! Tu cuenta está lista.', 'success')
        return { success: true, user: userCredential.user }
      } catch (err) {
        let msg = 'No se pudo crear la cuenta'
        if (err.code === 'auth/email-already-in-use') msg = 'Este correo ya está registrado'
        if (err.code === 'auth/weak-password') msg = 'La contraseña es muy débil'
        this.error = msg
        toast.showToast(msg, 'error')
        return { success: false, error: msg }
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      const toast = useToastStore()
      try {
        // ✅ Corregido: Usamos 'email' directamente, no 'sanitizedEmail'
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        this.userAvatar = localStorage.getItem('finch_avatar')
        
        toast.showToast('¡Bienvenida de nuevo!', 'success')
        return { success: true }
      } catch (err) {
        let mensaje = 'Error al iniciar sesión'
        if (err.code === 'auth/invalid-credential') mensaje = 'Correo o contraseña incorrectos'
        this.error = mensaje
        toast.showToast(mensaje, 'error')
        return { success: false, error: mensaje }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const toast = useToastStore()
      try {
        await signOut(auth)
        this.user = null
        this.userAvatar = null
        toast.showToast('Sesión cerrada con éxito.', 'info')
      } catch (err) {
        toast.showToast('Error al cerrar sesión', 'error')
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
    }
  }
})
