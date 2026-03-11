<!-- src/views/NewsDetail.vue -->
<template>
  <div class="min-h-screen bg-base-200 py-12 px-4 md:px-10">
    <!-- 🍞 TOAST GLOBAL -->
    <Toast v-if="toast.show" />

    <!-- 💬 MODAL PARA ESCRIBIR COMENTARIO -->
    <CommentModal 
      :show="showModal" 
      :userEmail="authStore.user?.email"
      @close="showModal = false"
      @send="onSendComment"
    />

    <!-- 🗑️ MODAL DAISYUI PARA CONFIRMAR BORRADO -->
    <input type="checkbox" id="modal-delete" class="modal-toggle" v-model="showConfirmDelete" />
    <div class="modal modal-bottom sm:modal-middle backdrop-blur-sm">
      <div class="modal-box bg-neutral rounded-[40px] border border-white/10 p-10 shadow-2xl">
        <div class="text-center">
          <span class="text-5xl mb-4 block">⚠️</span>
          <h3 class="font-black text-2xl text-white tracking-tighter uppercase italic">¿Eliminar tu comentario?</h3>
          <p class="py-4 text-white/50 text-xs font-medium leading-relaxed">
            Esta acción es permanente en Firestore. Tu opinión técnica será removida del Journal.
          </p>
        </div>
        <div class="modal-action flex gap-4 justify-center">
          <label for="modal-delete" class="btn btn-ghost flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest text-white/40">Cancelar</label>
          <button @click="confirmarBorradoReal" class="btn btn-error flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-error/20">Eliminar ➜</button>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto" v-if="noticia">
      <!-- 🧭 BARRA DE NAVEGACIÓN PRO -->
      <div class="flex justify-between items-center mb-8 bg-base-100/50 p-4 rounded-2xl border border-base-300 shadow-sm">
        <router-link to="/news" class="btn btn-ghost btn-sm gap-2 text-primary font-black uppercase tracking-widest text-[10px]">⬅ Volver al Journal</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/default/dashboard" class="btn btn-neutral btn-sm gap-2 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-neutral/20 border-none group">
          Ir a mi Panel 📊 <span class="group-hover:translate-x-1 transition-transform">➜</span>
        </router-link>
      </div>

      <!-- Portada de la Noticia -->
      <div class="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl mb-10 border border-white/5">
        <img :src="noticia.imageUrl" class="w-full h-full object-cover" :alt="noticia.title" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div class="absolute bottom-10 left-10 right-10">
          <span class="badge badge-primary font-black uppercase text-[9px] mb-4 px-4 py-3 tracking-widest">{{ noticia.category }}</span>
          <h1 class="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">{{ noticia.title }}</h1>
        </div>
      </div>

      <!-- Info Autor y Cuerpo -->
      <div class="flex items-center justify-between mb-8 pb-8 border-b border-base-300">
        <div class="flex items-center gap-3">
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-10 border border-white/10">
              <span class="text-xs font-black uppercase">{{ noticia.author?.charAt(0) || 'I' }}</span>
            </div>
          </div>
          <div>
            <p class="text-xs font-black text-base-content">{{ noticia.author || 'Isidora S.' }}</p>
            <p class="text-[10px] font-bold opacity-40 uppercase tracking-wider">{{ formatDate(noticia.publishedAt) }}</p>
          </div>
        </div>
        <div class="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">👁️ {{ noticia.views || 0 }} Vistas</div>
      </div>

      <div class="prose prose-invert max-w-none mb-16 text-base-content/80 leading-relaxed font-medium" v-html="noticia.content"></div>

      <!-- 💬 SECCIÓN DE COMENTARIOS -->
      <section class="mt-12 bg-base-100 p-8 md:p-12 rounded-[40px] shadow-xl border border-base-300">
        <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h3 class="text-3xl font-black tracking-tighter text-base-content uppercase">Discusión <span class="text-primary">({{ comentarios.length }})</span></h3>
          <button v-if="authStore.isAuthenticated" @click="showModal = true" class="btn btn-primary rounded-2xl font-black px-8 shadow-lg shadow-primary/20 uppercase text-xs">Añadir Comentario 💬</button>
        </div>

        <!-- Bloqueo para Invitados -->
        <div v-if="!authStore.isAuthenticated" class="bg-neutral p-10 rounded-[32px] text-center border border-white/5 shadow-2xl mb-12">
          <p class="text-white font-bold mb-6 italic tracking-tight text-lg">¿Quieres participar en el debate financiero?</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link :to="{ name: 'login', query: { redirect: route.fullPath } }" class="btn btn-primary px-10 rounded-xl font-black uppercase text-[10px]">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn btn-outline px-10 rounded-xl font-black text-white uppercase text-[10px]">Crear Cuenta</router-link>
          </div>
        </div>

        <div class="space-y-8">
          <div v-if="comentarios.length === 0" class="text-center py-10 opacity-30 italic">No hay comentarios técnicos aún.</div>
          <div v-for="c in comentarios" :key="c.id" class="border-l-4 border-primary pl-6 py-1 group hover:bg-base-200/50 rounded-r-2xl transition-all relative">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xs font-black text-primary uppercase tracking-tighter">{{ c.author }}</span>
                <span class="text-[9px] font-bold opacity-30 uppercase">📅 {{ formatDate(c.createdAt) }}</span>
              </div>
              <!-- ✅ BOTÓN QUE ABRE EL MODAL DE BORRAR -->
              <button v-if="authStore.user?.uid === c.userId" @click="prepararBorrado(c.id)" class="btn btn-ghost btn-xs text-error opacity-0 group-hover:opacity-100 transition-all">🗑️</button>
            </div>
            <p class="text-sm font-medium text-base-content/70 leading-relaxed">{{ c.content }}</p>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="flex flex-col items-center py-40">
      <span class="loading loading-ring loading-lg text-primary"></span>
      <p class="text-[10px] font-black uppercase opacity-40 mt-4 tracking-widest text-base-content">Sincronizando con Firestore...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import Toast from '@/components/layout/Toast.vue'
import { fetchNewsById, fetchComments, addComment, deleteComment } from '@/services/newsApi'
import CommentModal from '@/components/news/CommentModal.vue'

const route = useRoute()
const authStore = useAuthStore()
const toast = useToastStore()

const noticia = ref(null)
const comentarios = ref([])
const showModal = ref(false)
const showConfirmDelete = ref(false) // 👈 Controla el modal de DaisyUI
const idParaBorrar = ref(null)

// 🕵️‍♀️ Paso 1: Muestra el Modal de DaisyUI
const prepararBorrado = (commentId) => {
  idParaBorrar.value = commentId
  showConfirmDelete.value = true
}

// 🕵️‍♀️ Paso 2: Borrado Real tras confirmar en el Modal
const confirmarBorradoReal = async () => {
  const res = await deleteComment(route.params.id, idParaBorrar.value)
  if (res.success) {
    showConfirmDelete.value = false
    toast.showToast('¡Comentario eliminado con éxito! 🗑️', 'success')
    comentarios.value = await fetchComments(route.params.id)
  }
}

const loadData = async () => {
  const id = route.params.id
  noticia.value = await fetchNewsById(id)
  comentarios.value = await fetchComments(id)
}

const onSendComment = async (text) => {
  if (!text.trim()) return
  const res = await addComment(route.params.id, {
    author: authStore.user?.email || 'Inversionista',
    content: text,
    userId: authStore.user?.uid
  })
  if (res.success) {
    showModal.value = false
    toast.showToast('¡Comentario publicado! 💬', 'success')
    comentarios.value = await fetchComments(route.params.id)
  }
}

const formatDate = (d) => {
  if (!d) return 'Reciente'
  return new Date(d).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
}

onMounted(loadData)
</script>
