<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-neutral w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl border border-white/10 animate-scale-up">
        
        <!-- Header del Modal -->
        <div class="bg-white/5 p-8 text-center relative">
          <button @click="$emit('close')" class="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
            <span class="text-2xl">✕</span>
          </button>
          <h2 class="text-2xl font-black text-white tracking-tighter uppercase italic">
            Finch<span class="text-primary">Tech</span> Feedback
          </h2>
          <p class="text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-40 text-white">
            Análisis Técnico de la Noticia
          </p>
        </div>

        <div class="p-10 space-y-6">
          <!-- Campo de Comentario -->
          <div class="form-control">
            <label class="label text-[10px] font-black uppercase opacity-40 tracking-widest text-white">
              Escribe aquí tus comentarios
            </label>
            <textarea 
              v-model="comentario" 
              class="textarea textarea-bordered bg-white/5 border-white/10 text-white rounded-3xl min-h-[150px] focus:border-primary text-sm"
              placeholder="Para ayudar a proteger tu privacidad, no incluyas información personal..."
            ></textarea>
          </div>

          <!-- Email informativo (Igual a tu imagen) -->
          <div class="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span class="text-[10px] font-bold text-white/60">
              Identificado como: <span class="text-white">{{ userEmail }}</span>
            </span>
          </div>

          <p class="text-[9px] text-white/30 leading-relaxed italic">
            Tus comentarios se usarán para mejorar la experiencia de FinchTech Journal. Al enviar, aceptas que los datos se almacenen de forma segura en Firestore.
          </p>

          <!-- Botones Finales -->
          <div class="flex gap-4 pt-4">
            <button @click="$emit('close')" class="btn btn-ghost flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest text-white/60">
              Cerrar
            </button>
            <button 
              @click="handleSend" 
              :disabled="!comentario.trim()"
              class="btn btn-primary flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20"
            >
              Enviar ➜
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  userEmail: String
})

const emit = defineEmits(['close', 'send'])
const comentario = ref('')

const handleSend = () => {
  emit('send', comentario.value)
  comentario.value = ''
}
</script>

<style scoped>
.animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
